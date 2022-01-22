using LibraryAPI.Models.Enums;

namespace LibraryAPI.Response
{
    public class UsersResponse
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public GroupType GroupType { get; set; }
    }
}
