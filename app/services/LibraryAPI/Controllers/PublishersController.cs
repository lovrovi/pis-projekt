using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using LibraryAPI.Services;
using LibraryAPI.Request;
using Microsoft.AspNetCore.Authorization;

namespace LibraryAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PublishersController : ControllerBase
    {
        private readonly IPublishersService _publishersService;

        public PublishersController(IPublishersService publishersService)
        {
            _publishersService = publishersService;
        }

        // GET: api/Publishers
        [Authorize]
        [HttpGet]
        public async Task<ActionResult> GetPublishers([FromQuery] string search)
        {
            return Ok( await _publishersService.GetPublishers(search));
        }

        // GET: api/Publishers/5
        [Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult> GetPublisher(int id)
        {
            var response = await _publishersService.GetPublisher(id);
            if(response == null)
            {
                return NotFound();
            } 
            return Ok(response);
        }

        // PUT: api/Publishers/5
        [Authorize]
        [HttpPut("{id}")]
        public async Task<ActionResult> PutPublishers(int id, [FromBody] PublisherRequest request)
        {
            await _publishersService.PutPublishers(id, request);
            return Ok();
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeletePublisher(int id)
        {
            await _publishersService.DeletePublisher(id);
            return NoContent();
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult> CreatePublisher(PublisherRequest request)
        {
            await _publishersService.CreatePublisher(request);
            return Ok();
        }
    }
}
