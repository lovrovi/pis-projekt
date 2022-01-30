using System;

namespace LibraryAPI.Models
{
    public class Registration : BaseEntity
    {
        public DateTime SubmissionDate { get; set; }

        public string Email { get; set; }
    }
}
