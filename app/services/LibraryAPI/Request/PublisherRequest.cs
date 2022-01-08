using LibraryAPI.Dto;

namespace LibraryAPI.Request
{
    public class PublisherRequest
    {
        public string Name { get; set; }
        public AddressDto Address { get; set; }
    }
}
