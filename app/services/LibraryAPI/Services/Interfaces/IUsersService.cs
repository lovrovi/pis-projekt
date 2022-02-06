using LibraryAPI.Request;
using LibraryAPI.Response;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace LibraryAPI.Services.Interfaces
{
    public interface IUsersService
    {
        Task<IEnumerable<UsersResponse>> GetUsers();
        Task DeleteUser(int id);
        Task CreateUser(UserRequest request);
        Task RegisterUser(string email);
    }
}
