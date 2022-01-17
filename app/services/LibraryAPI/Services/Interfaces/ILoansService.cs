﻿using LibraryAPI.Request;
using LibraryAPI.Response;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace LibraryAPI.Services
{
    public interface ILoansService
    {
        Task<IEnumerable<LoanResponse>> GetLoans();
        Task<LoanResponse> GetLoan(int id);
        Task UpdateLoan(int id, bool request);
        Task DeleteLoan(int id);
        Task CreateLoan(LoanRequest request);
    }
}
