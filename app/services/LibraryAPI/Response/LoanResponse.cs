using System;

namespace LibraryAPI.Response
{
    public class LoanResponse
    {
        public int Id { get; set; }

        public DateTime LoanDate { get; set; }

        public DateTime ReturnDate { get; set; }

        public bool IsReturned { get; set; }

        public int UserId { get; set; }

        public string UserName { get; set; }

        public int BookId { get; set; }

        public string BookTitle { get; set; }
    }
}
