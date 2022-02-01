using System;

namespace LibraryAPI.Response
{
    public class ReservationResponse
    {
        public DateTime TimeStamp { get; set; }

        public string UserName { get; set; }

        public string BookTitle { get; set; }
    }
}
