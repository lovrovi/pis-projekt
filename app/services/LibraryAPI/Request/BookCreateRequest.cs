using Microsoft.AspNetCore.Http;
using System.Collections.Generic;

namespace LibraryAPI.Request
{
    public class BookCreateRequest
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public IFormFile Image { get; set; }
        public int Pages { get; set; }
        public float Price { get; set; }
        public int PublisherId { get; set; }
        public ICollection<int> Authors { get; set; }
        public string ISBN { get; set; }
        public ICollection<int> Categories { get; set; }
    }
}
