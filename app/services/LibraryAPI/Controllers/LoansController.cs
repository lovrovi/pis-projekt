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
    public class LoansController : ControllerBase
    {
        private readonly ILoansService _loansService;

        public LoansController(ILoansService loansService)
        {
            _loansService = loansService;
        }

        // GET: api/loans
        [Authorize]
        [HttpGet]
        public async Task<ActionResult> GetLoans(int id)
        {
            return Ok(await _loansService.GetLoans(id));
        }

        // GET: api/loans/1
        [Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult> GetLoan(int id)
        {
            var response = await _loansService.GetLoan(id);
            if (response == null)
            {
                return NotFound();
            }
            return Ok(response);
        }

        //PUT: api/loans/1
        [Authorize]
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateLoan(int id)
        {
            await _loansService.UpdateLoan(id);
            return Ok();
        }


        [Authorize]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteLoan(int id)
        {
            await _loansService.DeleteLoan(id);
            return NoContent();
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult> CreateLoan([FromBody] LoanRequest request)
        {
            await _loansService.CreateLoan(request);
            return Ok();
        }
    }
}
