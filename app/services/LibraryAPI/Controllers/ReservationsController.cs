﻿using LibraryAPI.Models;
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

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteReservation(int id)
        {
            await _reservationsService.DeleteReservation(id);
            return NoContent();
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult> CreateReservation([FromQuery] ReservationRequest request)
        {
            request.UserId = int.Parse(User.FindFirst("Id").Value);
            await _reservationsService.CreateReservation(request);
            return Ok();
        }
    }
}
