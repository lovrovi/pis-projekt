using System;

namespace LibraryAPI.Response
{
    public class LoanResponse
    {
        public DateTime LoanDate { get; set; }

        public DateTime ReturnDate { get; set; }

        public bool IsReturned { get; set; }

        public int UserId { get; set; }

        public int BookId { get; set; }
    }
}
