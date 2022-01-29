using System.Collections.Generic;

namespace LibraryAPI.Response
{
    public class CommentGetAllResponse
    {
        public bool CanComment { get; set; }

        public IEnumerable<CommentResponse> Comments { get; set; }
    }
}
