using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Tabloid.Models;
using Microsoft.AspNetCore.Identity;

namespace Tabloid.Data;

public class TabloidDbContext : IdentityDbContext<IdentityUser>
{
    private readonly IConfiguration _configuration;

    public DbSet<UserProfile> UserProfiles { get; set; }
    public DbSet<Category> Categories { get; set; }



    public TabloidDbContext(DbContextOptions<TabloidDbContext> context, IConfiguration config) : base(context)
    {
        _configuration = config;
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<IdentityRole>().HasData(new IdentityRole
        {
            Id = "c3aaeb97-d2ba-4a53-a521-4eea61e59b35",
            Name = "Admin",
            NormalizedName = "admin"
        });

        modelBuilder.Entity<IdentityUser>().HasData(new IdentityUser[]
        {
            new IdentityUser
            {
                Id = "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
                UserName = "Administrator",
                Email = "admina@strator.comx",
                PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(null, _configuration["AdminPassword"])
            },
            new IdentityUser
            {
                Id = "d8d76512-74f1-43bb-b1fd-87d3a8aa36df",
                UserName = "JohnDoe",
                Email = "john@doe.comx",
                PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(null, _configuration["AdminPassword"])
            },
            new IdentityUser
            {
                Id = "a7d21fac-3b21-454a-a747-075f072d0cf3",
                UserName = "JaneSmith",
                Email = "jane@smith.comx",
                PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(null, _configuration["AdminPassword"])
            },
            new IdentityUser
            {
                Id = "c806cfae-bda9-47c5-8473-dd52fd056a9b",
                UserName = "AliceJohnson",
                Email = "alice@johnson.comx",
                PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(null, _configuration["AdminPassword"])
            },
            new IdentityUser
            {
                Id = "9ce89d88-75da-4a80-9b0d-3fe58582b8e2",
                UserName = "BobWilliams",
                Email = "bob@williams.comx",
                PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(null, _configuration["AdminPassword"])
            },
            new IdentityUser
            {
                Id = "d224a03d-bf0c-4a05-b728-e3521e45d74d",
                UserName = "EveDavis",
                Email = "Eve@Davis.comx",
                PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(null, _configuration["AdminPassword"])
            },

        });

        modelBuilder.Entity<IdentityUserRole<string>>().HasData(new IdentityUserRole<string>[]
        {
            new IdentityUserRole<string>
            {
                RoleId = "c3aaeb97-d2ba-4a53-a521-4eea61e59b35",
                UserId = "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f"
            },
            new IdentityUserRole<string>
            {
                RoleId = "c3aaeb97-d2ba-4a53-a521-4eea61e59b35",
                UserId = "d8d76512-74f1-43bb-b1fd-87d3a8aa36df"
            },

        });
        modelBuilder.Entity<UserProfile>().HasData(new UserProfile[]
        {
            new UserProfile
            {
                Id = 1,
                IdentityUserId = "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
                FirstName = "Admina",
                LastName = "Strator",
                ImageLocation = "https://robohash.org/numquamutut.png?size=150x150&set=set1",
                CreateDateTime = new DateTime(2022, 1, 25)
            },
             new UserProfile
            {
                Id = 2,
                FirstName = "John",
                LastName = "Doe",
                CreateDateTime = new DateTime(2023, 2, 2),
                ImageLocation = "https://robohash.org/nisiautemet.png?size=150x150&set=set1",
                IdentityUserId = "d8d76512-74f1-43bb-b1fd-87d3a8aa36df",
            },
            new UserProfile
            {
                Id = 3,
                FirstName = "Jane",
                LastName = "Smith",
                CreateDateTime = new DateTime(2022, 3, 15),
                ImageLocation = "https://robohash.org/molestiaemagnamet.png?size=150x150&set=set1",
                IdentityUserId = "a7d21fac-3b21-454a-a747-075f072d0cf3",
            },
            new UserProfile
            {
                Id = 4,
                FirstName = "Alice",
                LastName = "Johnson",
                CreateDateTime = new DateTime(2023, 6, 10),
                ImageLocation = "https://robohash.org/deseruntutipsum.png?size=150x150&set=set1",
                IdentityUserId = "c806cfae-bda9-47c5-8473-dd52fd056a9b",
            },
            new UserProfile
            {
                Id = 5,
                FirstName = "Bob",
                LastName = "Williams",
                CreateDateTime = new DateTime(2023, 5, 15),
                ImageLocation = "https://robohash.org/quiundedignissimos.png?size=150x150&set=set1",
                IdentityUserId = "9ce89d88-75da-4a80-9b0d-3fe58582b8e2",
            },
            new UserProfile
            {
                Id = 6,
                FirstName = "Eve",
                LastName = "Davis",
                CreateDateTime = new DateTime(2022, 10, 18),
                ImageLocation = "https://robohash.org/hicnihilipsa.png?size=150x150&set=set1",
                IdentityUserId = "d224a03d-bf0c-4a05-b728-e3521e45d74d",
            }
        });

        modelBuilder.Entity<Category>().HasData(new Category[]
    {
         new Category { Id = 1, Name = "Cooking" },
         new Category { Id = 2, Name = "Entertainment" },
         new Category { Id = 3, Name = "History" },
         new Category { Id = 4, Name = "Music" },
         new Category { Id = 5, Name = "Pictures" },
         new Category { Id = 6, Name = "Science" },
         new Category { Id = 7, Name = "Technology" }
        });

        modelBuilder.Entity<Post>().HasData(new Post[]

    {
        new Post
        {
            Id = 1,
            Title = "Tech and the Future of Us",
            SubTitle = "What happens next?",
            Body = "The future sure is coming fast. Let’s explore where we’re headed.",
            PublishingDate = new DateTime(2023, 12, 23),
            HeaderImage = "https://example.com/tech-future.jpg",
            CategoryId = 7,
            UserProfileId = 2
        },
    new Post
    {
        Id = 2,
        Title = "NSS Demo Day",
        SubTitle = "Showcase of projects",
        Body = "Demo Day highlights the amazing work of Nashville Software School students.",
        PublishingDate = new DateTime(2023, 12, 21),
        HeaderImage = "https://example.com/nss-demo.jpg",
        CategoryId = 6,
        UserProfileId = 3
    },
    new Post
    {
        Id = 3,
        Title = "The Crazy Time We Live",
        SubTitle = "A wild look at modern life",
        Body = "From AI to climate change, the world feels faster than ever.",
        PublishingDate = new DateTime(2023, 12, 20),
        HeaderImage = "https://example.com/crazy-times.jpg",
        CategoryId = 2,
        UserProfileId = 4
    },
    new Post
    {
        Id = 4,
        Title = "Cooking with Confidence",
        SubTitle = "Easy recipes for beginners",
        Body = "Master the basics of home cooking with these simple meals.",
        PublishingDate = new DateTime(2023, 11, 15),
        HeaderImage = "https://example.com/cooking.jpg",
        CategoryId = 1,
        UserProfileId = 5
    },
    new Post
    {
        Id = 5,
        Title = "Underrated Artists of the 2010s",
        SubTitle = "Give them a listen!",
        Body = "Some music just doesn’t get the love it deserves.",
        PublishingDate = new DateTime(2023, 10, 8),
        HeaderImage = "https://example.com/artists.jpg",
        CategoryId = 4,
        UserProfileId = 6
    },
    new Post
    {
        Id = 6,
        Title = "Exploring Ancient Rome",
        SubTitle = "A trip back in time",
        Body = "Rome wasn't built in a day, but it sure changed the world.",
        PublishingDate = new DateTime(2023, 9, 30),
        HeaderImage = "https://example.com/rome.jpg",
        CategoryId = 3,
        UserProfileId = 2
    },
    new Post
    {
        Id = 7,
        Title = "Is Time Travel Possible?",
        SubTitle = "The science says...",
        Body = "Einstein had some ideas, and so do modern physicists.",
        PublishingDate = new DateTime(2023, 9, 15),
        HeaderImage = "https://example.com/timetravel.jpg",
        CategoryId = 6,
        UserProfileId = 3
    },
    new Post
    {
        Id = 8,
        Title = "Coding Bootcamps: Are They Worth It?",
        SubTitle = "A grad’s perspective",
        Body = "Here’s what I learned (and didn’t learn) from my experience.",
        PublishingDate = new DateTime(2023, 8, 22),
        HeaderImage = "https://example.com/bootcamp.jpg",
        CategoryId = 7,
        UserProfileId = 4
    },
    new Post
    {
        Id = 9,
        Title = "Easy Weeknight Meals",
        SubTitle = "Save time, eat well",
        Body = "These 20-minute meals will make your evenings smoother.",
        PublishingDate = new DateTime(2023, 7, 5),
        HeaderImage = "https://example.com/weeknight-meals.jpg",
        CategoryId = 1,
        UserProfileId = 5
    },
    new Post
    {
        Id = 10,
        Title = "Understanding the Electoral College",
        SubTitle = "Why does it matter?",
        Body = "It’s confusing — here’s a breakdown that actually makes sense.",
        PublishingDate = new DateTime(2023, 6, 30),
        HeaderImage = "https://example.com/electoral.jpg",
        CategoryId = 2,
        UserProfileId = 6
    }
    });

    }
}