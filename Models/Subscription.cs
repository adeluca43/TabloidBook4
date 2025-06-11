namespace Tabloid.Models;


public class Subscription
{
    public int Id { get; set; }
    public int SubscriberId { get; set; }
    public int AuthorId { get; set; }
    public DateTime SubscribeDate { get; set; }
}
