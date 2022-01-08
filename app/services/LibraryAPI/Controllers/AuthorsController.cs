using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using LibraryAPI.Services;
using LibraryAPI.Request;
using Microsoft.AspNetCore.Authorization;

namespace LibraryAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthorsController : ControllerBase
    {
        private readonly IAuthorsService _authorsService;

        public AuthorsController(IAuthorsService authorsService)
        {
            _authorsService = authorsService;
        }

        // GET: api/Authors
        [Authorize]
        [HttpGet]
        public async Task<ActionResult> GetAuthors([FromQuery] string search)
        {
            return Ok(await _authorsService.GetAuthors(search));
        }

        // GET: api/Authors/5
        [Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult> GetAuthor(int id)
        {
            var response = await _authorsService.GetAuthor(id);
            if (response == null)
            {
                return NotFound();
            }
            return Ok(response);
        }

        // PUT: api/Authors/5
        [Authorize]
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateAuthor(int id, [FromForm] AuthorUpdateRequest request)
        {
            await _authorsService.UpdateAuthor(id, request);
            return Ok();
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteAuthor(int id)
        {
            await _authorsService.DeleteAuthor(id);
            return NoContent();
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult> CreateAuthor([FromForm] AuthorRequest request)
        {
            await _authorsService.CreateAuthor(request);
            return Ok();
        }
    }
}
