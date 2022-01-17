using LibraryAPI.Data;
using LibraryAPI.Models.Enums;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace LibraryAPI.Services
{
    public class LoginService : ILoginService
    {
        private readonly AppDbContext _context;
        private IConfiguration _config;

        public LoginService(AppDbContext context, IConfiguration config)
        {
            _context = context;
            _config = config;
        }

        private string GenerateJSONWebToken(string userName, int id, GroupType groupType)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[] {
                new Claim(JwtRegisteredClaimNames.Sub, userName),
                new Claim("Id", id.ToString()),
                new Claim("Role", groupType.ToString())
            };

            var token = new JwtSecurityToken(_config["Jwt:Issuer"],
              _config["Jwt:Issuer"],
              claims,
              expires: DateTime.Now.AddMinutes(60),
              signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public async Task<string> LoginUser(string username, string password)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.UserName == username && u.Password == password);
            if (user == null)
            {
                return null;
            }
            var tokenString = GenerateJSONWebToken(user.UserName, user.Id, user.GroupType);

            return tokenString;
        }
    }
}
