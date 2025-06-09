using System.ComponentModel.DataAnnotations;

namespace Tabloid.Models;

public class PostDTO
{
    public string Title { get; set; }
    public string SubTitle { get; set; }
    public string Body { get; set; }
    public DateTime PublishingDate { get; set; }
    public string HeaderImage { get; set; }
    public int CategoryId { get; set; }
    public int UserProfileId { get; set; }

    public List<int>? TagIds { get; set; }
}
