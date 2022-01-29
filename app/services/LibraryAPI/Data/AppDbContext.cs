using LibraryAPI.Models;
using LibraryAPI.Models.Enums;
using Microsoft.EntityFrameworkCore;
using System;

namespace LibraryAPI.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<User>().HasData(
                new User
                {
                    Id = 1,
                    UserName = "Admin",
                    Password = "Admin1",
                    GroupType = GroupType.Admin
                },
                new User
                {
                    Id = 2,
                    UserName = "User",
                    Password = "User2",
                    GroupType = GroupType.User
                },
                new User
                {
                    Id = 3,
                    UserName = "Filip",
                    Password = "filip123",
                    GroupType = GroupType.User
                }
            );

            builder.Entity<Author>().HasData(
               new Author
               {
                   Id = 1,
                   Name = "Marko",
                   Image = "http://slika.jpeg",
                   Biography = "ovo je biografija",
                   BirthdayDate = new DateTime(2011, 6, 10),
                   Email = "email@gmail.com"
               },
               new Author
               {
                   Id = 2,
                   Name = "Ivan",
                   Image = "http://slika.jpeg",
                   Biography = "ovo je biografija",
                   BirthdayDate = new DateTime(2018, 6, 10),
                   Email = "example@gmail.com"
               },
               new Author
               {
                   Id = 3,
                   Name = "Filip",
                   Image = "http://slika.jpeg",
                   Biography = "ovo je biografija",
                   BirthdayDate = new DateTime(2015, 6, 10),
                   Email = "mail@gmail.com"
               },
               new Author
               {
                   Id = 4,
                   Name = "Tin",
                   Image = "http://slika.jpeg",
                   Biography = "ovo je biografija",
                   BirthdayDate = new DateTime(1990, 6, 10),
                   Email = "tin@gmail.com"
               }
           );

            builder.Entity<Publisher>().HasData(
               new Publisher
               {
                   Id = 1,
                   Name = "Marko"
               },
                new Publisher
                {
                    Id = 2,
                    Name = "Ivan"
                },
                new Publisher
                {
                    Id = 3,
                    Name = "Mate"
                },
                new Publisher
                {
                    Id = 4,
                    Name = "Igor"
                }
           );

            builder.Entity<Publisher>().OwnsOne(a => a.Address).HasData(
                new
                {
                    PublisherId = 1,
                    Road = "ulicaaaaaaaaa",
                    ZipCode = "88000",
                    City = "Mostar",
                    Country = "BiH"
                },
                new
                {
                    PublisherId = 2,
                    Road = "splitskaaaaa",
                    ZipCode = "80012",
                    City = "Split",
                    Country = "HR"
                },
                new
                {
                    PublisherId = 3,
                    Road = "sarajevssssssska",
                    ZipCode = "70005",
                    City = "Sarajevo",
                    Country = "BiH"
                },
                new
                {
                    PublisherId = 4,
                    Road = "splitsssska",
                    ZipCode = "80077",
                    City = "Split",
                    Country = "HR"
                }
            );

            builder.Entity<Book>().HasData(
               new Book
               {
                   Id = 1,
                   Title = "knjiga1",
                   Image = "http://slika.jpeg",
                   Description = "ovo je opisssssss",
                   Pages = 100,
                   Price = 55.24f,
                   PublisherId = 1
               },
               new Book
               {
                   Id = 2,
                   Title = "knjiga2",
                   Image = "http://slika.jpeg",
                   Description = "ovo je opissssssssss",
                   Pages = 180,
                   Price = 87.54f,
                   PublisherId = 3
               },
               new Book
               {
                   Id = 3,
                   Title = "knjiga3",
                   Image = "http://slika.jpeg",
                   Description = "ovo je opisddsdsdss",
                   Pages = 120,
                   Price = 65.84f,
                   PublisherId = 4
               },
               new Book
               {
                   Id = 4,
                   Title = "knjiga4",
                   Image = "http://slika.jpeg",
                   Description = "ovo je opisdsdsdsdss",
                   Pages = 150,
                   Price = 50.14f,
                   PublisherId = 2
               },
               new Book
               {
                   Id = 5,
                   Title = "knjiga5",
                   Image = "http://slika.jpeg",
                   Description = "dssdsdsdsadsadsads",
                   Pages = 110,
                   Price = 25.54f,
                   PublisherId = 2
               }
            );

            builder.Entity<Loan>().HasData(
                new Loan
                {
                    Id = 1,
                    UserId = 1,
                    BookId = 1,
                    LoanDate = new DateTime(2022, 1, 15),
                    ReturnDate = new DateTime(2022, 2, 1),
                    IsReturned = true,
                },
                new Loan
                {
                    Id = 2,
                    UserId = 3,
                    BookId = 2,
                    LoanDate = new DateTime(2022, 1, 20),
                    ReturnDate = new DateTime(2022, 2, 5),
                    IsReturned = false,
                },
                new Loan
                {
                    Id = 3,
                    UserId = 3,
                    BookId = 3,
                    LoanDate = new DateTime(2022, 1, 19),
                    ReturnDate = new DateTime(2022, 2, 8),
                    IsReturned = true,
                },
                new Loan
                {
                    Id = 4,
                    UserId = 1,
                    BookId = 2,
                    LoanDate = new DateTime(2022, 1, 15),
                    ReturnDate = new DateTime(2022, 2, 1),
                    IsReturned = true,
                }
            );

            builder.Entity<Comment>().HasData(
                new Comment
                {
                    Id = 1,
                    UserId = 1,
                    BookId = 1,
                    Text = "first comment",
                },
                new Comment
                {
                    Id = 2,
                    UserId = 1,
                    BookId = 2,
                    Text = "first comment",
                },
                new Comment
                {
                    Id = 3,
                    UserId = 3,
                    BookId = 2,
                    Text = "first comment",
                }
            );

            builder.Entity<AuthorBook>()
            .HasKey(ab => new { ab.AuthorId, ab.BookId });

            builder.Entity<AuthorBook>()
                .HasOne(ab => ab.Book)
                .WithMany(b => b.AuthorBook)
                .HasForeignKey(ab => ab.BookId);

            builder.Entity<AuthorBook>()
                .HasOne(ab => ab.Author)
                .WithMany(a => a.AuthorBook)
                .HasForeignKey(ab => ab.AuthorId);

            builder.Entity<AuthorBook>().HasData(
                new AuthorBook { BookId = 4, AuthorId = 4 },
                new AuthorBook { BookId = 5, AuthorId = 4 },
                new AuthorBook { BookId = 2, AuthorId = 3 },
                new AuthorBook { BookId = 1, AuthorId = 3 },
                new AuthorBook { BookId = 2, AuthorId = 1 },
                new AuthorBook { BookId = 3, AuthorId = 2 }
            );
        }

        public DbSet<Book> Books { get; set; }
        public DbSet<Author> Authors { get; set; }
        public DbSet<Publisher> Publishers { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<AuthorBook> AuthorsBooks { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Reservation> Reservations { get; set; }
        public DbSet<Loan> Loans { get; set; }

    }
}