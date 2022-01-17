using LibraryAPI.Models;
using LibraryAPI.Request;
using LibraryAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace LibraryAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentsController : ControllerBase
    {
        private readonly ICommentsService _commentsService;

        public CommentsController(ICommentsService commentsService)
        {
            _commentsService = commentsService;
        }

        // GET: api/comments
        [Authorize]
        [HttpGet]
        public async Task<ActionResult> GetComments()
        {
            return Ok(await _commentsService.GetComments());
        }

        // GET: api/comments/1
        [Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult> GetComment(int id)
        {
            var response = await _commentsService.GetComment(id);
            if (response == null)
            {
                return NotFound();
            }
            return Ok(response);
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteComment(int id)
        {
            await _commentsService.DeleteComment(id);
            return NoContent();
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult> CreateComment([FromForm] CommentRequest request)
        {
            await _commentsService.CreateComment(request);
            return Ok();
        }
    }
}
