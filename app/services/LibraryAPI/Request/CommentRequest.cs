using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LibraryAPI.Request
{
    public class CommentRequest
    {
        public string Text { get; set; }

        public int UserId { get; set; }

        public int BookId { get; set; }
    }
}
