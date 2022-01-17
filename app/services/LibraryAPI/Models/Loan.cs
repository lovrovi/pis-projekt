using System;

namespace LibraryAPI.Models
{
    public class Loan : BaseEntity
    {
        public DateTime LoanDate { get; set; }

        public DateTime ReturnDate { get; set; }

        public bool IsReturned { get; set; }

        public int UserId { get; set; }

        public User User { get; set; }

        public int BookId { get; set; }

        public Book Book { get; set; }
    }
}
