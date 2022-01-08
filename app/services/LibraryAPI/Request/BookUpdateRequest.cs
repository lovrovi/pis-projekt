using Microsoft.AspNetCore.Http;

namespace LibraryAPI.Request
{
    public class BookUpdateRequest
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public IFormFile Image { get; set; }
        public int Pages { get; set; }
        public float Price { get; set; }
        public int PublisherId { get; set; }
    }
}
