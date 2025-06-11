using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Tabloid.Models;
using Tabloid.Models.DTOs;
using Tabloid.Data;
using Microsoft.EntityFrameworkCore;

namespace Tabloid.Controllers;


[ApiController]
[Route("api/[controller]")]
public class SubscriptionController : ControllerBase
{
    private TabloidDbContext _dbContext;

    public SubscriptionController(TabloidDbContext context)
    {
        _dbContext = context;
    }

    [HttpGet]
    [Authorize]
    public IActionResult GetAllSubscriptions()
    {
        var subs = _dbContext.Subscriptions.ToList();
        return Ok(subs);
    }

    [HttpPost]
    [Authorize]
    public IActionResult CreateSubscription(SubscriptionDTO subscription)
    {
        Subscription sub = new Subscription
        {
            SubscriberId = subscription.SubscriberId,
            AuthorId = subscription.AuthorId,
            SubscribeDate = DateTime.Now
        };
        _dbContext.Subscriptions.Add(sub);
        _dbContext.SaveChanges();
        return Ok(sub);
    }

    [HttpDelete("{id}")]
    [Authorize]

    public IActionResult DeleteSubscription(int id)
    {
        var Subscription = _dbContext.Subscriptions.FirstOrDefault(s => s.Id == id);
        if (Subscription == null) return NotFound();
        _dbContext.Subscriptions.Remove(Subscription);
        _dbContext.SaveChanges();
        return NoContent();

    }
};