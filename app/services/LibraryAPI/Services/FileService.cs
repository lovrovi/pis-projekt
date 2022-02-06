using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using System.IO;
using System.Threading.Tasks;

namespace LibraryAPI.Services
{
    public class FileService : IFileService
    {
        private readonly IWebHostEnvironment _environment;

        public FileService(IWebHostEnvironment environment)
        {
            _environment = environment;
        }

        public async Task CreateImage(IFormFile image)
        {
            var path = Path.Join(_environment.WebRootPath, image.FileName);
            using (var stream = new FileStream(path, FileMode.Create))
            {
                await image.CopyToAsync(stream);
            }
        }

        public void DeleteImage(string image)
        {
            if (image == "placeholder.png") return;
            File.Delete(Path.Join(_environment.WebRootPath, image));
        }
    }
}
