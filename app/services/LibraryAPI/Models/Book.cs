using System.Collections.Generic;

namespace LibraryAPI.Models
{
    public class Book : BaseEntity
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public string Image { get; set; }
        public int Pages { get; set; }
        public float Price { get; set; }
        public int PublisherId { get; set; }
        public Publisher Publisher { get; set; }
        public IEnumerable<AuthorBook> AuthorBook { get; set; }
    }
}
