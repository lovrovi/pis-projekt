using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace LibraryAPI.Data.Migrations
{
    public partial class seedOtherData : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Authors",
                columns: new[] { "Id", "Biography", "BirthdayDate", "Email", "Image", "Name" },
                values: new object[,]
                {
                    { 1, "ovo je biografija", new DateTime(2011, 6, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), "email@gmail.com", "slika.jpeg", "Marko" },
                    { 2, "ovo je biografija", new DateTime(2018, 6, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), "example@gmail.com", "slika2.jpeg", "Ivan" },
                    { 3, "ovo je biografija", new DateTime(2015, 6, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), "mail@gmail.com", "slika3.jpeg", "Filip" },
                    { 4, "ovo je biografija", new DateTime(1990, 6, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), "tin@gmail.com", "slika4.jpeg", "Tin" }
                });

            migrationBuilder.InsertData(
                table: "Publishers",
                columns: new[] { "Id", "Name", "Address_City", "Address_Country", "Address_Road", "Address_ZipCode" },
                values: new object[,]
                {
                    { 1, "Marko", "Mostar", "BiH", "ulica", "88000" },
                    { 2, "Ivan", "Split", "HR", "splitska", "800" },
                    { 3, "Mate", "Sarajevo", "BiH", "sarajevska", "7000" },
                    { 4, "Igor", "Split", "HR", "splitska", "800" }
                });

            migrationBuilder.InsertData(
                table: "Books",
                columns: new[] { "Id", "Description", "Image", "Pages", "Price", "PublisherId", "Title" },
                values: new object[,]
                {
                    { 1, "ovo je opis", "slika.jpeg", 100, 55.24f, 1, "knjiga1" },
                    { 4, "ovo je opis", "slika.jpeg", 150, 50.14f, 2, "knjiga4" },
                    { 5, "ovo je opis", "slika.jpeg", 110, 25.54f, 2, "knjiga5" },
                    { 2, "ovo je opis", "slika.jpeg", 180, 87.54f, 3, "knjiga2" },
                    { 3, "ovo je opis", "slika.jpeg", 120, 65.84f, 4, "knjiga3" }
                });

            migrationBuilder.InsertData(
                table: "AuthorBook",
                columns: new[] { "AuthorsId", "BooksId" },
                values: new object[,]
                {
                    { 3, 1 },
                    { 4, 4 },
                    { 4, 5 },
                    { 3, 2 },
                    { 1, 2 },
                    { 2, 3 }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AuthorBook",
                keyColumns: new[] { "AuthorsId", "BooksId" },
                keyValues: new object[] { 1, 2 });

            migrationBuilder.DeleteData(
                table: "AuthorBook",
                keyColumns: new[] { "AuthorsId", "BooksId" },
                keyValues: new object[] { 2, 3 });

            migrationBuilder.DeleteData(
                table: "AuthorBook",
                keyColumns: new[] { "AuthorsId", "BooksId" },
                keyValues: new object[] { 3, 1 });

            migrationBuilder.DeleteData(
                table: "AuthorBook",
                keyColumns: new[] { "AuthorsId", "BooksId" },
                keyValues: new object[] { 3, 2 });

            migrationBuilder.DeleteData(
                table: "AuthorBook",
                keyColumns: new[] { "AuthorsId", "BooksId" },
                keyValues: new object[] { 4, 4 });

            migrationBuilder.DeleteData(
                table: "AuthorBook",
                keyColumns: new[] { "AuthorsId", "BooksId" },
                keyValues: new object[] { 4, 5 });

            migrationBuilder.DeleteData(
                table: "Authors",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Authors",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Authors",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Authors",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Books",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Books",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Books",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Books",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Books",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Publishers",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Publishers",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Publishers",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Publishers",
                keyColumn: "Id",
                keyValue: 4);
        }
    }
}
