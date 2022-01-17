using System;

namespace LibraryAPI.Response
{
    public class ReservationResponse
    {
        public DateTime TimeStamp { get; set; }

        public int UserId { get; set; }

        public int BookId { get; set; }
    }
}
