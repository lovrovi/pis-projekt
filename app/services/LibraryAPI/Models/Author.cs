using System;
using System.Collections.Generic;

namespace LibraryAPI.Models
{
    public class Author : BaseEntity
    {
        public string Name { get; set; }
        public string Image { get; set; }
        public string Biography { get; set; }
        public DateTime BirthdayDate { get; set; }
        public string Email { get; set; }
        public IEnumerable<AuthorBook> AuthorBook { get; set; }
    }
}
