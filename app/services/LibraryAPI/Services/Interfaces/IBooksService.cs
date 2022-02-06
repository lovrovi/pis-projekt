using LibraryAPI.Models;
using LibraryAPI.Request;
using LibraryAPI.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LibraryAPI.Services
{
    public interface IBooksService
    {
        Task<IEnumerable<BooksResponse>> GetBooks(string search);
        Task<BookDetailsResponse> GetBook(int id);
        Task UpdateBook(int id, BookUpdateRequest request);
        Task DeleteBook(int id);
        Task<bool> CreateBook(BookCreateRequest book);
        Task<IEnumerable<CategoryResponse>> GetCategories();
    }
}
