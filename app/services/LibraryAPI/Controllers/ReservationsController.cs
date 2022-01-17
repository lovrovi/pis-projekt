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
    public class ReservationsController : ControllerBase
    {
        private readonly IReservationsService _reservationsService;

        public ReservationsController(IReservationsService reservationsService)
        {
            _reservationsService = reservationsService;
        }

        // GET: api/reservations
        [Authorize]
        [HttpGet]
        public async Task<ActionResult> GetReservations()
        {
            return Ok(await _reservationsService.GetReservations());
        }

        // GET: api/reservations/1
        [Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult> GetReservation(int id)
        {
            var response = await _reservationsService.GetReservation(id);
            if (response == null)
            {
                return NotFound();
            }
            return Ok(response);
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteReservation(int id)
        {
            await _reservationsService.DeleteReservation(id);
            return NoContent();
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult> CreateReservation([FromForm] ReservationRequest request)
        {
            await _reservationsService.CreateReservation(request);
            return Ok();
        }
    }
}
