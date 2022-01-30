using LibraryAPI.Response;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace LibraryAPI.Services
{
    public interface ILoginService
    {
        Task<string> LoginUser(string username, string password);

        Task RegisterUser(string email);

        Task<IEnumerable<RegistrationResponse>> GetRegistrations();
    }
}
