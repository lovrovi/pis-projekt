using NUnit.Framework;
using LibraryAPI.Services;
using LibraryAPI.Data;
using Microsoft.EntityFrameworkCore;
using Moq;
using LibraryAPI.Models;
using LibraryAPI.Request;
using LibraryAPI.Dto;
using System.Threading.Tasks;
using System;

namespace LibraryApi.Tests
{
    [TestFixture]
    public class PublisherServiceTest
    {
        private AppDbContext context;
        PublishersService service;
        [OneTimeSetUp]
        public async Task SetUp()
        {
            var options = new DbContextOptionsBuilder<AppDbContext>().UseInMemoryDatabase(databaseName: "libraryTest").Options;
            context = new AppDbContext(options);
            service = new PublishersService(context);

            context.Publishers.Add(
                new Publisher
                {
                    Id = 1,
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

            context.Publishers.Add(
                new Publisher
                {
                    Id = 2,
                    Name = "FilipGinTonic",
                    Address = new Address
                    {
                        City = "Mostar",
                        Country = "BiH",
                        Road = "ulicaaaaaaaa",
                        ZipCode = "88000"
                    }
                }
            );

            await context.SaveChangesAsync();
        }

        [Test]
        public async Task GetPublishers_ReturnNotNull_NotNull()
        {
            var result = await service.GetPublishers("");
            Assert.IsNotNull(result);
        }

        [Test]
        public async Task GetPublisher_ReturnNotNull_NotNull()
        {
            var expectedPublisher = new Publisher
            {
                Id = 1,
                Name = "Filip",
                Address = new Address
                {
                    City = "Mostar",
                    Country = "BiH",
                    Road = "ulicaaaaaaaa",
                    ZipCode = "88000"
                }
            };

            var result = await service.GetPublisher(1);
            
            Assert.IsNotNull(result);
            Assert.AreEqual(result.Name, expectedPublisher.Name);
            Assert.AreEqual(result.Id, expectedPublisher.Id);
        }

        [Test]
        public async Task  CreatePublisher_ReturnNotNull_NotNull()
        {
            var newPublisher = new PublisherRequest
            {
                Name = "Filip",
                Address = new AddressDto
                {
                    City = "Mostar",
                    Country = "BiH",
                    Road = "ulicaaaaaaaa",
                    ZipCode = "88000"
                }
            };

            Assert.DoesNotThrowAsync(async () => await service.CreatePublisher(newPublisher));
        }

        [Test]
        public async Task UpdatePublisher_ReturnNotNull_NotNull()
        {
            var newPublisher = new PublisherRequest
            {
                Name = "Filipp",
                Address = new AddressDto
                {
                    City = "Mostar",
                    Country = "BiH",
                    Road = "ulicaaaaaaaa",
                    ZipCode = "88000"
                }
            };

            Assert.DoesNotThrowAsync(async () => await service.PutPublishers(1, newPublisher));
        }

        [Test]
        public async Task DeletePublisher_ReturnNotNull_NotNull()
        {
            Assert.DoesNotThrowAsync(async () => await service.DeletePublisher(2));
        }
    }
}