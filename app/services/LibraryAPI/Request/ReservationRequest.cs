using System;

namespace LibraryAPI.Request
{
    public class ReservationRequest
    {
        public DateTime TimeStamp { get; set; }

        public int UserId { get; set; }

        public int BookId { get; set; }
    }
}
