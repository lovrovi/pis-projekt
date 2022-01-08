using FluentValidation;
using LibraryAPI.Request;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LibraryAPI.Validations
{
    public class AuthorRequestValidation : AbstractValidator<AuthorRequest>
    {
        public AuthorRequestValidation()
        {
            RuleFor(x => x.Name).NotEmpty();
            RuleFor(x => x.Email).NotEmpty().EmailAddress();
            RuleFor(x => x.Image).NotEmpty();
            RuleFor(x => x.Biography).NotEmpty().Length(10, 250);
            RuleFor(x => x.BirthdayDate).NotEmpty();
        }
        public bool ValidateUri(string uri)
        {
            if (string.IsNullOrEmpty(uri))
            {
                return true;
            }
            return Uri.TryCreate(uri, UriKind.Absolute, out _);
        }
    }
}
