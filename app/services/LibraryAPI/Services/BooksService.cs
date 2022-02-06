using LibraryAPI.Data;
using LibraryAPI.Models;
using LibraryAPI.Request;
using LibraryAPI.Response;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using System.Web;

namespace LibraryAPI.Services
{
    public class BooksService : IBooksService
    {
        private readonly AppDbContext _context;
        private readonly IFileService _fileService;

        public BooksService(AppDbContext context, IFileService fileService)
        {
            _context = context;
            _fileService = fileService;
        }

        public async Task<IEnumerable<BooksResponse>> GetBooks(string search)
        {
            search = HttpUtility.UrlDecode(search);
            var books = _context.Books.Where(Filter(search));

            var mappedBooks = books.Select(b => new BooksResponse
            {
                Id = b.Id,
                Description = b.Description,
                Image = b.Image,
                Pages = b.Pages,
                Price = b.Price,
                Title = b.Title,
                ISBN = b.ISBN,
            });

            return mappedBooks;

        }

        public async Task<BookDetailsResponse> GetBook(int id)
        {
            var response = new BookDetailsResponse();

            var book = await _context.Books
                .Include(x => x.AuthorBook)
                .ThenInclude(ab => ab.Author)
                .Include(x => x.Publisher)
                .Include(x => x.BookCategory)
                .ThenInclude(bc => bc.Category)
                .FirstOrDefaultAsync(x => x.Id == id);

            if (book == null) return null;

            var mappedAuthors = book.AuthorBook.Select(ab => new AuthorsResponse
            {
                Id = ab.Author.Id,
                Biography = ab.Author.Biography,
                BirthdayDate = ab.Author.BirthdayDate,
                Email = ab.Author.Email,
                Image = ab.Author.Image,
                Name = ab.Author.Name
            });

            var mappedCategories = book.BookCategory.Select(c => new CategoryResponse
            {
                Id = c.Category.Id,
                Name = c.Category.Name,
            });

            response = new BookDetailsResponse
            {
                Id = book.Id,
                Description = book.Description,
                Image = book.Image,
                PublisherId = book.PublisherId,
                Pages = book.Pages,
                Price = book.Price,
                Title = book.Title,
                Authors = mappedAuthors.ToList(),
                PublisherName = book.Publisher.Name,
                ISBN = book.ISBN,
                Categories = mappedCategories.ToList(),
            };

            return response;
        }

        public async Task UpdateBook(int id, BookUpdateRequest request)
        {
            var book = await _context.Books.FirstOrDefaultAsync(b => b.Id == id);
            if (request.Image != null)
            {
                await _fileService.CreateImage(request.Image);

                _fileService.DeleteImage(book.Image);

                book.Image = request.Image.FileName;
            }

            book.Title = request.Title;
            book.Description = request.Description;
            book.Price = request.Price;
            book.Pages = request.Pages;
            book.PublisherId = request.PublisherId;

            await _context.SaveChangesAsync();
        }

        public async Task DeleteBook(int id)
        {
            var books = await _context.Books.FindAsync(id);
            if (books == null) return;

            _fileService.DeleteImage(books.Image);
            _context.Books.Remove(books);
            await _context.SaveChangesAsync();
        }

        public async Task<bool> CreateBook(BookCreateRequest book)
        {
            var validAuthors = _context.Authors.Where(a => book.Authors.Contains(a.Id));
            if (!validAuthors.Any()) return false;
            var validCategories = _context.Categories.Where(x => book.Categories.Contains(x.Id));
            if (!validCategories.Any()) return false;

            var authBooks = validAuthors.Select(x => new AuthorBook
            {
                AuthorId = x.Id
            }).ToList();

            var bookCategories = validCategories.Select(x => new BookCategory
            {
                CategoryId = x.Id
            }).ToList();

            var mappedBook = new Book
            {
                Description = book.Description,
                Image = book.Image.FileName,
                Pages = book.Pages,
                Price = book.Price,
                Title = book.Title,
                PublisherId = book.PublisherId,
                AuthorBook = authBooks,
                BookCategory = bookCategories,
                ISBN = book.ISBN,
            };

            await _fileService.CreateImage(book.Image);

            _context.Books.Add(mappedBook);
            await _context.SaveChangesAsync();
            return true;
        }
        public async Task<IEnumerable<CategoryResponse>> GetCategories()
        {
            var categories = await _context.Categories.ToListAsync();

            var response = categories.Select(x => new CategoryResponse
            {
                Id = x.Id,
                Name = x.Name,
            });

            return response;
        }

        private static Expression<Func<Book, bool>> Filter(string search)
        {
            search = search?.Trim().ToLower();
            float.TryParse(search, out float num);

            return x => string.IsNullOrEmpty(search) || 
            ((num > 0) && (x.Pages == num || x.Price == num)) || 
            (x.Title.ToLower().Contains(search)) ||
            (x.BookCategory.Any(y => y.Category.Name.ToLower().Contains(search))) ||
            (x.Publisher.Name.ToLower().Contains(search)) || 
            (x.AuthorBook.Any(z => z.Author.Name.ToLower().Contains(search))) ||
            (x.ISBN.ToLower().Contains(search));
        }
    }
}
