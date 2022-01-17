using System;

namespace LibraryAPI.Request
{
    public class LoanRequest
    {
        public DateTime LoanDate { get; set; }

        public DateTime ReturnDate { get; set; }

        public int UserId { get; set; }

        public int BookId { get; set; }
    }
}
