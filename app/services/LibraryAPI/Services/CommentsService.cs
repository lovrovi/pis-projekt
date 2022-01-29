using LibraryAPI.Data;
using LibraryAPI.Models;
using LibraryAPI.Request;
using LibraryAPI.Response;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LibraryAPI.Services
{
    public class CommentsService : ICommentsService
    {
        private readonly AppDbContext _context;

        public CommentsService(AppDbContext context)
        {
            _context = context;
        }

        public async Task CreateComment(CommentRequest request)
        {
            var comment = new Comment
            {
                Text = request.Text,
                BookId = request.BookId,
                UserId = request.UserId
            };

            _context.Comments.Add(comment);
            await _context.SaveChangesAsync();
            return;
        }

        public async Task DeleteComment(int id)
        {
            var comment = await _context.Comments.FindAsync(id);
            if (comment == null) return;

            _context.Comments.Remove(comment);
            await _context.SaveChangesAsync();
        }

        public async Task<CommentResponse> GetComment(int id)
        {
            var comment = await _context.Comments.Include(x => x.User).FirstOrDefaultAsync(x => x.Id == id);
            if (comment == null) return null;

            var response = new CommentResponse
            {
                UserName = comment.User.UserName,
                BookId = comment.BookId,
                UserId = comment.UserId,
                Text = comment.Text
            };
            return response;
        }

        public async Task<CommentGetAllResponse> GetComments(int bookId, int userId)
        {
            var comment = await _context.Comments.Include(x => x.User).Where(x => x.BookId == bookId).ToListAsync();
            if (comment == null) return null;

            var canComment = false;

            if (_context.Loans.Any(x => x.BookId == bookId && x.UserId == userId))
            {
                canComment = true;
            }

            var commentResponse = comment.Select(x => new CommentResponse
            {
                UserName = x.User.UserName,
                BookId = x.BookId,
                UserId = x.UserId,
                Text = x.Text
            });

            var response = new CommentGetAllResponse
            {
                CanComment = canComment,
                Comments = commentResponse
            };

            return response;
        }
    }
}
