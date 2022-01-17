﻿using LibraryAPI.Request;
using LibraryAPI.Response;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace LibraryAPI.Services
{
    public interface IReservationsService
    {
        Task<IEnumerable<ReservationResponse>> GetReservations();
        Task<ReservationResponse> GetReservation(int id);
        Task DeleteReservation(int id);
        Task CreateReservation(ReservationRequest request);
    }
}
