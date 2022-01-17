using LibraryAPI.Data;
using LibraryAPI.Models;
using LibraryAPI.Request;
using LibraryAPI.Response;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LibraryAPI.Services
{
    public class LoansService : ILoansService
    {
        private readonly AppDbContext _context;

        public LoansService(AppDbContext context)
        {
            _context = context;
        }

        public async Task CreateLoan(LoanRequest request)
        {
            var loan = new Loan
            {
                LoanDate = request.LoanDate,
                IsReturned = false,
                ReturnDate = request.ReturnDate,
                BookId = request.BookId,
                UserId = request.UserId
            };

            _context.Loans.Add(loan);
            await _context.SaveChangesAsync();
            return;
        }

        public async Task DeleteLoan(int id)
        {
            var loan = await _context.Loans.FindAsync(id);
            if (loan == null) return;

            _context.Loans.Remove(loan);
            await _context.SaveChangesAsync();
        }

        public async Task<LoanResponse> GetLoan(int id)
        {
            var loan = await _context.Loans.FirstOrDefaultAsync(x => x.Id == id);
            if (loan == null) return null;

            var response = new LoanResponse
            {
                BookId = loan.BookId,
                UserId = loan.UserId,
                IsReturned = loan.IsReturned,
                LoanDate = loan.LoanDate,
                ReturnDate = loan.ReturnDate
            };
            return response;
        }

        public async Task<IEnumerable<LoanResponse>> GetLoans()
        {
            var loan = await _context.Loans.ToListAsync();
            if (loan == null) return null;

            var response = loan.Select(x => new LoanResponse
            {
                BookId = x.BookId,
                UserId = x.UserId,
                IsReturned = x.IsReturned,
                LoanDate = x.LoanDate,
                ReturnDate = x.ReturnDate
            });
            return response;
        }

        public async Task UpdateLoan(int id, bool request)
        {
            var loan = await _context.Loans.FirstOrDefaultAsync(x => x.Id == id);
            if (loan == null) return;

            loan.IsReturned = request;
            await _context.SaveChangesAsync();
        }
    }
}
