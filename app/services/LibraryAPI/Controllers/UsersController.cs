using LibraryAPI.Request;
using LibraryAPI.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace LibraryAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUsersService _usersService;

        public UsersController(IUsersService usersService)
        {
            _usersService = usersService;
        }

        // GET: api/reservations
        [Authorize]
        [HttpGet]
        public async Task<ActionResult> GetUsers()
        {
            return Ok(await _usersService.GetUsers());
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteUsers(int id)
        {
            await _usersService.DeleteUser(id);
            return NoContent();
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult> CreateUser(UserRequest request)
        {
            await _usersService.CreateUser(request);
            return Ok();
        }

        [HttpPost]
        [Route("/api/registeruser")]
        public async Task<ActionResult> RegisterUser([FromQuery] string mail)
        {
            await _usersService.RegisterUser(mail);
            return Ok();
        }
    }
}
