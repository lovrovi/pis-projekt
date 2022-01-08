using LibraryAPI.Request;
using LibraryAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace LibraryAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        private readonly IBooksService _booksService;

        public BooksController(IBooksService booksService)
        {
            _booksService = booksService;
        }

        // GET: api/Books
        [Authorize]
        [HttpGet]
        public async Task<ActionResult> GetBooks([FromQuery] string search)
        {
            return Ok(await _booksService.GetBooks(search));
        }

        [Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult> GetBook(int id)
        {
            var response = await _booksService.GetBook(id);

            if (response == null)
            {
                return NotFound();
            }

            return Ok(response);
        }

        [Authorize]
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateBook(int id, [FromForm] BookUpdateRequest request)
        {
            await _booksService.UpdateBook(id, request);
            return Ok();
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteBooks(int id)
        {
            await _booksService.DeleteBook(id);
            return NoContent();
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult> CreateBook([FromForm] BookCreateRequest book)
        {
            var response = await _booksService.CreateBook(book);
            if (!response)
            {
                return BadRequest();
            }
            return Ok();
        }
    }
}
