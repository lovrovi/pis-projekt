using System.Collections.Generic;

namespace LibraryAPI.Models
{
    public class Category : BaseEntity
    {
        public string Name { get; set; }
        public IEnumerable<BookCategory> BookCategory { get; set; }
    }
}
