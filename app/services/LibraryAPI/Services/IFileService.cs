using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;

namespace LibraryAPI.Services
{
    public interface IFileService
    {
        Task CreateImage(IFormFile image);
        void DeleteImage(string imageName);
    }
}
