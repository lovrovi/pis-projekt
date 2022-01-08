using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LibraryAPI.Response
{
    public class AuthorDetailsResponse
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Image { get; set; }
        public string Biography { get; set; }
        public DateTime BirthdayDate { get; set; }
        public string Email { get; set; }
        public IEnumerable<BooksResponse> Books { get; set; }
    }
}
