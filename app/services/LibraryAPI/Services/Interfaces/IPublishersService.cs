using LibraryAPI.Models;
using LibraryAPI.Request;
using LibraryAPI.Response;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LibraryAPI.Services
{
    public interface IPublishersService
    {
        Task<IEnumerable<PublishersResponse>> GetPublishers(string search);
        Task<Publisher> GetPublisher(int id);
        Task PutPublishers(int id, PublisherRequest request);
        Task DeletePublisher(int id);
        Task CreatePublisher(PublisherRequest request);
    }
}
