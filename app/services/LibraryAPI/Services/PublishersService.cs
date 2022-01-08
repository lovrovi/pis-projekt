using LibraryAPI.Data;
using LibraryAPI.Dto;
using LibraryAPI.Models;
using LibraryAPI.Request;
using LibraryAPI.Response;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using System.Web;

namespace LibraryAPI.Services
{
    public class PublishersService : IPublishersService
    {
        private readonly AppDbContext _context;
        public PublishersService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<PublishersResponse>> GetPublishers(string search)
        {
            search = HttpUtility.UrlDecode(search);
            var publishers = _context.Publishers.AsNoTracking().Where(Filter(search));

            var mappedPublishers = publishers.Select(p => new PublishersResponse
            {
                Id = p.Id,
                Name = p.Name,
                Address = new AddressDto
                {
                    City = p.Address.City,
                    ZipCode = p.Address.ZipCode,
                    Country = p.Address.Country,
                    Road = p.Address.Road
                }
            });
            return mappedPublishers;
        }
        public async Task<Publisher> GetPublisher(int id)
        {
            var publisher = await _context.Publishers.AsNoTracking().FirstOrDefaultAsync(p => p.Id == id);

            if (publisher == null)
            {
                return null;
            }
            return publisher;
        }

        public async Task PutPublishers(int id, PublisherRequest request)
        {
            var publisher = await _context.Publishers.FirstOrDefaultAsync(x => x.Id == id);
            publisher.Name = request.Name;
            publisher.Address = new Address
            {
                City = request.Address.City,
                Country = request.Address.Country,
                Road = request.Address.Road,
                ZipCode = request.Address.ZipCode
            };

            _context.Publishers.Update(publisher);
            await _context.SaveChangesAsync();
        }

        public async Task DeletePublisher(int id)
        {
            var publisher = await _context.Publishers.FindAsync(id);
            if (publisher == null) return;
            
            _context.Publishers.Remove(publisher);
            await _context.SaveChangesAsync();
        }

        public async Task CreatePublisher(PublisherRequest request)
        {
            var publisher = new Publisher
            {
                Name = request.Name,
                Address = new Address
                {
                    City = request.Address.City,
                    Country = request.Address.Country,
                    Road = request.Address.Road,
                    ZipCode = request.Address.ZipCode
                }
            };
          
            _context.Publishers.Add(publisher);
            await _context.SaveChangesAsync();
  
        }
        private static Expression<Func<Publisher, bool>> Filter(string search)
        {
            search = search?.Trim().ToLower();

            return x => string.IsNullOrEmpty(search) || (x.Name.ToLower().Contains(search) || x.Address.Country.ToLower().Contains(search));
        }
    }
}
