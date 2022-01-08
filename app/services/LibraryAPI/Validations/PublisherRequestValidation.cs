using FluentValidation;
using LibraryAPI.Request;
using System.Text.RegularExpressions;

namespace LibraryAPI.Validations
{
    public class PublisherRequestValidation : AbstractValidator<PublisherRequest>
    {
        public PublisherRequestValidation()
        {
            RuleFor(x => x.Name).NotEmpty();
            RuleFor(x => x.Address.City).NotEmpty();
            RuleFor(x => x.Address.Country).NotEmpty();
            RuleFor(x => x.Address.Road).NotEmpty().Length(10, 250);
            RuleFor(x => x.Address.ZipCode).NotEmpty().Must(BeValidZipCode);
        }

        private bool BeValidZipCode(string zipCode)
        {
            var zipCodeUS = Regex.IsMatch(zipCode, "^[0-9]{5}(?:-[0-9]{4})?$");
            var zipCodeBalkan = Regex.IsMatch(zipCode, "^\\d{​​​​​​​​5}​​​​​​​​$");

            if (zipCodeUS || zipCodeBalkan) return true;
            return false;
        }
    }
}

