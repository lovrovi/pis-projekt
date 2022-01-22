using LibraryAPI.Models.Enums;

namespace LibraryAPI.Request
{
    public class UserRequest
    {
        public string UserName { get; set; }
        public string Password { get; set; }
        public GroupType GroupType { get; set; }
    }
}
