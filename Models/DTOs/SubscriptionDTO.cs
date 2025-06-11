namespace Tabloid.Models.DTOs;

public class SubscriptionDTO
{
    public int Id { get; set; }
    public int SubscriberId { get; set; }
    public int AuthorId { get; set; }
    public DateTime SubscribeDate { get; set; }
    public UserProfile Author { get; set; }
    public UserProfile Subscriber { get; set; }
}