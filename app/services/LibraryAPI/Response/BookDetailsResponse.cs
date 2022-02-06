﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LibraryAPI.Response
{
    public class BookDetailsResponse
    {
        public int Id { get; set; }
        public string ISBN { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Image { get; set; }
        public int Pages { get; set; }
        public float Price { get; set; }
        public int PublisherId { get; set; }
        public string PublisherName { get; set; }
        public IEnumerable<AuthorsResponse> Authors { get; set; }
        public IEnumerable<CategoryResponse> Categories { get; set; }
    }
}
