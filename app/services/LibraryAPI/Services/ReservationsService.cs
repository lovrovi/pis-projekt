using LibraryAPI.Data;
using LibraryAPI.Models;
using LibraryAPI.Request;
using LibraryAPI.Response;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LibraryAPI.Services
{
    public class ReservationsService : IReservationsService
    {
        private readonly AppDbContext _context;

        public ReservationsService(AppDbContext context)
        {
            _context = context;
        }

        public async Task CreateReservation(ReservationRequest request)
        {
            var reservation = new Reservation
            {
                TimeStamp = request.TimeStamp,
                BookId = request.BookId,
                UserId = request.UserId
            };

            _context.Reservations.Add(reservation);
            await _context.SaveChangesAsync();
            return;
        }

        public async Task DeleteReservation(int id)
        {
            var reservation = await _context.Reservations.FindAsync(id);
            if (reservation == null) return;

            _context.Reservations.Remove(reservation);
            await _context.SaveChangesAsync();
        }

        public async Task<ReservationResponse> GetReservation(int id)
        {
            var reservation = await _context.Reservations.FirstOrDefaultAsync(x => x.Id == id);
            if (reservation == null) return null;

            var response = new ReservationResponse
            {
                BookId = reservation.BookId,
                UserId = reservation.UserId,
                TimeStamp = reservation.TimeStamp
            };
            return response;
        }

        public async Task<IEnumerable<ReservationResponse>> GetReservations()
        {
            var reservation = await _context.Reservations.ToListAsync();
            if (reservation == null) return null;

            var response = reservation.Select(x => new ReservationResponse
            {
                BookId = x.BookId,
                UserId = x.UserId,
                TimeStamp = x.TimeStamp
            });
            return response;
        }
    }
}
