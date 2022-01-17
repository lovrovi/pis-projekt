using System;

namespace LibraryAPI.Models
{
    public class Reservation : BaseEntity
    {
        public DateTime TimeStamp { get; set; }

        public int UserId { get; set; }

        public User User { get; set; }

        public int BookId { get; set; }

        public Book Book { get; set; }
    }
}
