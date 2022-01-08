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
    public class AuthorsService : IAuthorsService
    {
        private readonly AppDbContext _context;
        private readonly IFileService _fileService;

        public AuthorsService(AppDbContext context, IFileService fileService)
        {
            _context = context;
            _fileService = fileService;
        }

        public async Task<IEnumerable<AuthorsResponse>> GetAuthors(string search)
        {
            search = HttpUtility.UrlDecode(search);
            var authors = _context.Authors.Where(Filter(search));

            var mappedAuthors = authors.Select(a => new AuthorsResponse
            {
                Id = a.Id,
                Biography = a.Biography,
                BirthdayDate = a.BirthdayDate,
                Email = a.Email,
                Image = a.Image,
                Name = a.Name
            });
            return mappedAuthors;
        }

        public async Task<AuthorDetailsResponse> GetAuthor(int id)
        {
            var author = await _context.Authors.Include(ab => ab.AuthorBook).ThenInclude(ab => ab.Book).FirstOrDefaultAsync(ab => ab.Id == id);

            if (author == null) return null;

            var mappedBooks = author.AuthorBook.Select(ab => new BooksResponse
            {
                Id = ab.Book.Id,
                Description = ab.Book.Description,
                Image = ab.Book.Image,
                Pages = ab.Book.Pages,
                Price = ab.Book.Price,
                Title = ab.Book.Title
            });

            var mappedAuthor = new AuthorDetailsResponse
            {
                Id = author.Id,
                Biography = author.Biography,
                BirthdayDate = author.BirthdayDate,
                Email = author.Email,
                Image = author.Image,
                Name = author.Name,
                Books = mappedBooks.ToList()
            };

            return mappedAuthor;
        }

        public async Task UpdateAuthor(int id, AuthorUpdateRequest request)
        {
            var author = await _context.Authors.FirstOrDefaultAsync(a => a.Id == id);
            if (request.Image != null)
            {
                await _fileService.CreateImage(request.Image);

                _fileService.DeleteImage(author.Image);

                author.Image = request.Image.FileName;
            }

            author.Email = request.Email;
            author.Biography = request.Biography;
            author.BirthdayDate = request.BirthdayDate;
            author.Name = request.Name;

            await _context.SaveChangesAsync();

        }
        public async Task DeleteAuthor(int id)
        {
            var author = await _context.Authors.FindAsync(id);
            if (author == null) return;

            _fileService.DeleteImage(author.Image);

            _context.Authors.Remove(author);
            await _context.SaveChangesAsync();
        }

        public async Task CreateAuthor(AuthorRequest request)
        {
            var author = new Author
            {
                Email = request.Email,
                BirthdayDate = request.BirthdayDate,
                Biography = request.Biography,
                Name = request.Name,
                Image = request.Image.FileName
            };

            await _fileService.CreateImage(request.Image);

            _context.Authors.Add(author);
            await _context.SaveChangesAsync();
        }
        private static Expression<Func<Author, bool>> Filter(string search)
        {
            search = search?.Trim().ToLower();

            return x => string.IsNullOrEmpty(search) || (x.Name.ToLower().Contains(search) || x.Email.ToLower().Contains(search) || x.BirthdayDate.ToString().Contains(search));
        }
    }
}
