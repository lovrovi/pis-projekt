using LibraryAPI.Request;
using LibraryAPI.Response;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace LibraryAPI.Services
{
    public interface ICommentsService
    {
        Task<CommentGetAllResponse> GetComments(int bookId, int userId);
        Task<CommentResponse> GetComment(int id);
        Task DeleteComment(int id);
        Task CreateComment(CommentRequest request);
    }
}
