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
    public interface IAuthorsService
    {
        Task<IEnumerable<AuthorsResponse>> GetAuthors(string search);
        Task<AuthorDetailsResponse> GetAuthor(int id);
        Task UpdateAuthor(int id, AuthorUpdateRequest request);
        Task DeleteAuthor(int id);
        Task CreateAuthor(AuthorRequest request);
    }
}
