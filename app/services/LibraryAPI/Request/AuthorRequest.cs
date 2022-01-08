using Microsoft.AspNetCore.Http;
using System;

namespace LibraryAPI.Request
{
    public class AuthorRequest
    {
        public string Name { get; set; }
        public IFormFile Image { get; set; }
        public string Biography { get; set; }
        public DateTime BirthdayDate { get; set; }
        public string Email { get; set; }
    }
}
