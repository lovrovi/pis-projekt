using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace LibraryAPI.Models
{
    public class Publisher : BaseEntity
    {
        public string Name { get; set; }
        public Address Address { get; set; }
        public List<Book> Books { get; set; }
    }

    [Owned]
    public class Address
    {
        public string Road { get; set; }
        public string ZipCode { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
    }
}
