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
using Moq;
using LibraryAPI.Response;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;

namespace LibraryApi.Tests
{
    [TestFixture]
    public class AuthorServiceTest
    {
        private AppDbContext context;
        private Mock<IFileService> fileService;
        AuthorsService service;
        [OneTimeSetUp]
        public async Task SetUp()
        {
            var options = new DbContextOptionsBuilder<AppDbContext>().UseInMemoryDatabase(databaseName: "libraryTest").Options;
            context = new AppDbContext(options);
            fileService = new Mock<IFileService>();
            fileService.Setup(x => x.CreateImage(It.IsAny<IFormFile>()));
            fileService.Setup(x => x.DeleteImage(It.IsAny<string>()));
            service = new AuthorsService(context, fileService.Object);

            context.Authors.Add(
                new Author
                {
                    Id = 1,
                    Name = "Marko",
                    Image = "placeholder.png",
                    Biography = "ovo je biografija",
                    BirthdayDate = new DateTime(2011, 6, 10),
                    Email = "email@gmail.com"
                }
            );

            context.Authors.Add(
                new Author
                {
                    Id = 2,
                    Name = "Ivan",
                    Image = "placeholder.png",
                    Biography = "ovo je biografija",
                    BirthdayDate = new DateTime(2011, 6, 10),
                    Email = "email@gmail.com"
                }
            );

            await context.SaveChangesAsync();
        }

        [Test, Order(1)]
        public async Task GetAuthors_ReturnNotNull_NotNull()
        {
            var result = await service.GetAuthors("");
            Assert.IsNotNull(result);
        }

        [Test, Order(2)]
        public async Task GetAuthor_ReturnNotNull_NotNull()
        {
            var expectedAuthor = new AuthorDetailsResponse
            {
                Id = 1,
                Name = "Marko",
                Image = "placeholder.png",
                Biography = "ovo je biografija",
                BirthdayDate = new DateTime(2011, 6, 10),
                Email = "email@gmail.com",
                Books = new List<BooksResponse>().AsEnumerable()
            };

            var result = await service.GetAuthor(1);

            Assert.IsNotNull(result);
            Assert.AreEqual(result.Name, expectedAuthor.Name);
            Assert.AreEqual(result.Id, expectedAuthor.Id);
        }

        [Test, Order(3)]
        public async Task CreateAuthor_ReturnNotNull_NotNull()
        {
            var path = Path.GetFullPath(Path.Combine(Environment.CurrentDirectory, "../../../TestImage/placeholder.png"));
            FileStream fileStream = new FileStream(path, FileMode.Open);
            var newAuthor = new AuthorRequest
            {
                Name = "Markoooo",
                Image = new FormFile(fileStream, 0, fileStream.Length, "streamFile", "slika"),
                Biography = "ovo je biografija",
                BirthdayDate = new DateTime(2011, 6, 10),
                Email = "email@gmail.com"
            };

            Assert.DoesNotThrowAsync(async () => await service.CreateAuthor(newAuthor));
        }

        [Test, Order(4)]
        public async Task UpdateAuthor_ReturnNotNull_NotNull()
        {
            var path = Path.GetFullPath(Path.Combine(Environment.CurrentDirectory, "../../../TestImage/placeholder1.png"));
            FileStream fileStream = new FileStream(path, FileMode.Open);
            var newAuthor = new AuthorUpdateRequest
            {
                Name = "Markoooo",
                Image = new FormFile(fileStream, 0, fileStream.Length, "streamFile", "slika"),
                Biography = "ovo je biografija",
                BirthdayDate = new DateTime(2011, 6, 10),
                Email = "email@gmail.com"
            };

            Assert.DoesNotThrowAsync(async () => await service.UpdateAuthor(1, newAuthor));
        }

        [Test, Order(5)]
        public async Task DeleteAuthor_ReturnNotNull_NotNull()
        {
            Assert.DoesNotThrowAsync(async () => await service.DeleteAuthor(2));
        }
    }
}