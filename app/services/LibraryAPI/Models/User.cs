using LibraryAPI.Models.Enums;

namespace LibraryAPI.Models
{
    public class User : BaseEntity
    {
        public string UserName { get; set; }
        public string Password { get; set; }
        public GroupType GroupType { get; set; }
    }
}
