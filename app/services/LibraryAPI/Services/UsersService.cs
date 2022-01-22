using LibraryAPI.Data;
using LibraryAPI.Models;
using LibraryAPI.Request;
using LibraryAPI.Response;
using LibraryAPI.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LibraryAPI.Services
{
    public class UsersService : IUsersService
    {
        private readonly AppDbContext _context;
        public UsersService(AppDbContext context)
        {
            _context = context;
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
                UserName = x.UserName,
                GroupType = x.GroupType
            });

            return response;
        }
    }
}
