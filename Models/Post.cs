using System.ComponentModel.DataAnnotations;

namespace Tabloid.Models;

public class Post
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string SubTitle { get; set; }
    public string Body { get; set; }
    public DateTime PublishingDate { get; set; }
    public string HeaderImage { get; set; }

    public int? CategoryId { get; set; }
    public Category? Category { get; set; }

    public int? UserProfileId { get; set; }
    public UserProfile? UserProfile { get; set; }
    public List<PostTag> PostTags { get; set; } = new List<PostTag>();
}