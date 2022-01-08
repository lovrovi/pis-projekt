using FluentValidation;
using LibraryAPI.Request;
using System;

namespace LibraryAPI.Validations
{
    public class BookCreateRequestValidation : AbstractValidator<BookCreateRequest>
    {
        public BookCreateRequestValidation()
        {
            RuleFor(x => x.Title).NotEmpty();
            RuleFor(x => x.Description).NotEmpty().Length(5, 250);
            RuleFor(x => x.Image).NotEmpty();
            RuleFor(x => x.Pages).NotEmpty().Must(x => x > 0).WithMessage("Page must have greater than zero pages");
            RuleFor(x => x.Price).NotEmpty().Must(x => x > 0).WithMessage("Price must have greater than zero");
            RuleFor(x => x.PublisherId).NotEmpty();
            RuleFor(x => x.Authors).NotEmpty().WithMessage("A book must have at least one author");
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
