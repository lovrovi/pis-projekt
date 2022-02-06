using LibraryAPI.Data;
using LibraryAPI.Models;
using LibraryAPI.Request;
using LibraryAPI.Response;
using LibraryAPI.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using MimeKit;
using MailKit.Net.Smtp;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using LibraryAPI.Dto;
using MailKit.Security;
using LibraryAPI.Models.Enums;

namespace LibraryAPI.Services
{
    public class UsersService : IUsersService
    {
        private readonly AppDbContext _context;
        private readonly MailSettings _mailSettings;

        public UsersService(AppDbContext context, IOptions<MailSettings> mailSettings)
        {
            _context = context;
            _mailSettings = mailSettings.Value;
        }

        public async Task CreateUser(UserRequest request)
        {
            var user = new User {
                UserName = request.UserName,
                Password = request.Password,
                GroupType = request.GroupType
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null) return;

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<UsersResponse>> GetUsers()
        {
            var users = await _context.Users.ToListAsync();
            if (users == null) return null;

            var response = users.Select(x => new UsersResponse
            {
                Id = x.Id,
                UserName = x.UserName,
                GroupType = x.GroupType
            });

            return response;
        }

        public async Task RegisterUser(string email)
        {
            var request = new UserRequest
            {
                UserName = email,
                Password = "sifra123",
                GroupType = GroupType.User
            };

            await CreateUser(request);

            MimeMessage message = new MimeMessage();

            MailboxAddress from = new MailboxAddress("Admin", "netkicnetko908@gmail.com");
            message.From.Add(from);
            MailboxAddress to = new MailboxAddress("User", email);
            message.To.Add(to);

            message.Subject = "Complete your registration";
            BodyBuilder bodyBuilder = new BodyBuilder();
            bodyBuilder.HtmlBody = @"Username: " + request.UserName + ", password: " + request.Password;
            message.Body = bodyBuilder.ToMessageBody();

            SmtpClient client = new SmtpClient();
            client.Connect(_mailSettings.Host, _mailSettings.Port, SecureSocketOptions.StartTls);
            client.Authenticate(_mailSettings.Mail, _mailSettings.Password);

            client.Send(message);
            client.Disconnect(true);
            client.Dispose();
        }
    }
}
