
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Tabloid.Models;
using Tabloid.Models.DTOs;
using Tabloid.Data;
using Microsoft.EntityFrameworkCore;

namespace Tabloid.Controllers;


[ApiController]
[Route("api/[controller]")]
public class PostController : ControllerBase
{
    private TabloidDbContext _dbContext;

    public PostController(TabloidDbContext context)
    {
        _dbContext = context;
    }

    [HttpPost]
    [Authorize]
    public IActionResult CreatePost(PostDTO newPost)
    {
        Post post = new Post
        {
            Title = newPost.Title,
            SubTitle = newPost.SubTitle,
            Body = newPost.Body,
            PublishingDate = newPost.PublishingDate,
            HeaderImage = newPost.HeaderImage,
            CategoryId = newPost.CategoryId,
            UserProfileId = newPost.UserProfileId
        };

        _dbContext.Posts.Add(post);
        _dbContext.SaveChanges();

        return Ok(post);
    }

    [HttpGet("{id}")]
    [Authorize]
    public IActionResult GetPostById(int id)
    {
        Post post = _dbContext.Posts
            .Include(p => p.Category)
            .Include(p => p.UserProfile)
            .FirstOrDefault(p => p.Id == id);

        if (post == null) return NotFound();

        return Ok(post);
    }

    [HttpGet]
    [Authorize]
    public IActionResult GetAllPosts()
    {
        List<Post> posts = _dbContext.Posts
            .Include(p => p.UserProfile)
            .Include(p => p.Category)
            .Include(p => p.PostTags)
                .ThenInclude(pt => pt.Tag)
            .ToList();

        return Ok(posts);
    }

    [HttpDelete("{id}")]
    [Authorize]
    public IActionResult DeletePost(int id)
    {
        var Post = _dbContext.Posts.FirstOrDefault(p => p.Id == id);
        if (Post == null) return NotFound();
        _dbContext.Posts.Remove(Post);
        _dbContext.SaveChanges();
        return Ok(Post);
    }

    [HttpPut("{id}")]
    public IActionResult UpdateWorkOrder([FromBody] PostDTO postDTO, int id)
    {
        Post PostToUpdate = _dbContext.Posts.SingleOrDefault(w => w.Id == id);
        if (PostToUpdate == null)
        {
            return NotFound();
        }
        else if (id != PostToUpdate.Id)
        {
            return BadRequest();
        }

        PostToUpdate.Title = postDTO.Title;
        PostToUpdate.SubTitle = postDTO.SubTitle;
        PostToUpdate.Body = postDTO.Body;
        PostToUpdate.CategoryId  = postDTO.CategoryId;
        PostToUpdate.HeaderImage  = postDTO.HeaderImage;

        _dbContext.SaveChanges();

        return NoContent();
    }
}
