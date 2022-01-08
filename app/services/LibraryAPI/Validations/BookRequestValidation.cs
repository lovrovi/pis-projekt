using FluentValidation;
using LibraryAPI.Request;
using System;

namespace LibraryAPI.Validations
{
    public class BookRequestValidation : AbstractValidator<BookRequest>
    {
        public BookRequestValidation()
        {
            RuleFor(x => x.Title).NotEmpty();
            RuleFor(x => x.Description).NotEmpty().Length(5, 250);
            RuleFor(x => x.Image).NotEmpty().Must(ValidateUri);
            RuleFor(x => x.Pages).NotEmpty().Must(x => x > 0).WithMessage("Page must have greater than zero pages");
            RuleFor(x => x.Price).NotEmpty().Must(x => x > 0).WithMessage("Price must have a price");
            RuleFor(x => x.PublisherId).NotEmpty();
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
