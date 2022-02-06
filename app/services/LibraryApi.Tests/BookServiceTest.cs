using NUnit.Framework;
using LibraryAPI.Services;
using LibraryAPI.Data;
using Microsoft.EntityFrameworkCore;
using LibraryAPI.Models;
using LibraryAPI.Request;
using System.Threading.Tasks;
using System;
using Microsoft.AspNetCore.Http;
using System.IO;
using System.Reflection;
using Moq;
using LibraryAPI.Response;
using System.Collections.Generic;
using System.Linq;

namespace LibraryApi.Tests
{
    [TestFixture]
    public class BookServiceTest
    {
        private AppDbContext context;
        private Mock<IFileService> fileService;
        BooksService service;
        [OneTimeSetUp]
        public async Task SetUp()
        {
            var options = new DbContextOptionsBuilder<AppDbContext>().UseInMemoryDatabase(databaseName: "libraryTest").Options;
            context = new AppDbContext(options);
            fileService = new Mock<IFileService>();
            fileService.Setup(x => x.CreateImage(It.IsAny<IFormFile>()));
            fileService.Setup(x => x.DeleteImage(It.IsAny<string>()));
            service = new BooksService(context, fileService.Object);

            context.Publishers.Add(
                new Publisher
                {
                    Id = 10,
                    Name = "Filip",
                    Address = new Address
                    {
                        City = "Mostar",
                        Country = "BiH",
                        Road = "ulicaaaaaaaa",
                        ZipCode = "88000"
                    }
                }
            );

            context.Books.Add(
                new Book
                {
                    Id = 1,
                    Description = "aaaaaaaaaaaa",
                    Pages = 100,
                    Price = 100,
                    Title = "knjiga",
                    Image = "placeholder.png",
                    PublisherId = 10
                    
                }
            );

            context.Books.Add(
                new Book
                {
                    Id = 2,
                    Description = "aaaaaaaaaaaa",
                    Pages = 100,
                    Price = 100,
                    Title = "knjiga2",
                    Image = "placeholder.png",
                    PublisherId = 10

                }
            );

            await context.SaveChangesAsync();
        }

        [Test]
        public async Task GetBooks_ReturnNotNull_NotNull()
        {
            var result = await service.GetBooks("");
            Assert.IsNotNull(result);
        }

        [Test]
        public async Task GetBook_ReturnNotNull_NotNull()
        {
            var expectedBook = new BookDetailsResponse
            {
                Id = 1,
                Description = "aaaaaaaaaaaa",
                Pages = 100,
                Price = 100,
                Title = "knjiga",
                Image = "placeholder.png",
                PublisherId = 10,
                PublisherName = "Marko",
                Authors = new List<AuthorsResponse>().AsEnumerable()
            };

            var result = await service.GetBook(1);

            Assert.IsNotNull(result);
            Assert.AreEqual(result.Title, expectedBook.Title);
            Assert.AreEqual(result.Id, expectedBook.Id);
        }

        [Test]
        public async Task CreateBook_ReturnNotNull_NotNull()
        {
            var path = Path.GetFullPath(Path.Combine(Environment.CurrentDirectory, "../../../TestImage/placeholder2.png"));
            FileStream fileStream = new FileStream(path, FileMode.Open);
            var newBook = new BookCreateRequest
            {
                Description = "aaaaaaaaaaaa",
                Pages = 100,
                Price = 100,
                Title = "knjiga",
                Image = new FormFile(fileStream, 0, fileStream.Length, "streamFile", "slika"),
                PublisherId = 1
            };

            Assert.DoesNotThrowAsync(async () => await service.CreateBook(newBook));
        }

        [Test]
        public async Task UpdateBook_ReturnNotNull_NotNull()
        {
            var path = Path.GetFullPath(Path.Combine(Environment.CurrentDirectory, "../../../TestImage/placeholder3.png"));
            FileStream fileStream = new FileStream(path, FileMode.Open);
            var newBook = new BookUpdateRequest
            {
                Description = "aaaaaaaaaaaa",
                Pages = 100,
                Price = 100,
                Title = "knjiga",
                Image = new FormFile(fileStream, 0, fileStream.Length, "streamFile", "slika"),
                PublisherId = 1
            };

            Assert.DoesNotThrowAsync(async () => await service.UpdateBook(1, newBook));
        }

        [Test]
        public async Task DeleteBook_ReturnNotNull_NotNull()
        {
            Assert.DoesNotThrowAsync(async() => await service.DeleteBook(2)); 
        }
    }
}