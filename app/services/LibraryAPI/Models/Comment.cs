namespace LibraryAPI.Models
{
    public class Comment : BaseEntity
    {
        public string Text { get; set; }

        public int UserId { get; set; }

        public User User { get; set; }

        public int BookId { get; set; }

        public Book Book { get; set; }
    }
}
