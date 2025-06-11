using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Tabloid.Data;
using Tabloid.Models;
using Tabloid.Models.DTOs;

namespace Tabloid.Controllers;

[Route("api/[controller]")]
[ApiController]
public class PostTagController : ControllerBase
{
    private readonly TabloidDbContext _context;

    public PostTagController(TabloidDbContext context)
    {
        _context = context;
    }

    // GET: api/posttag/post/5
    [HttpGet("post/{postId}")]
    public async Task<ActionResult<IEnumerable<PostTagDTO>>> GetTagsForPost(int postId)
    {
        var postTags = await _context.PostTags
            .Include(pt => pt.Tag)
            .Where(pt => pt.PostId == postId)
            .Select(pt => new PostTagDTO
            {
                Id = pt.Id,
                PostId = pt.PostId,
                TagId = pt.TagId,
                Tag = new TagDTO
                {
                    Id = pt.Tag.Id,
                    Name = pt.Tag.Name
                }
            })
            .ToListAsync();

        return Ok(postTags);
    }

    // POST: api/posttag
    [HttpPost]
    public async Task<ActionResult<PostTagDTO>> AddTagToPost(PostTagDTO dto)
    {
        // Prevent duplicates
        bool exists = await _context.PostTags
            .AnyAsync(pt => pt.PostId == dto.PostId && pt.TagId == dto.TagId);

        if (exists)
        {
            return BadRequest("This tag is already associated with the post.");
        }

        var postTag = new PostTag
        {
            PostId = dto.PostId,
            TagId = dto.TagId
        };

        _context.PostTags.Add(postTag);
        await _context.SaveChangesAsync();

        dto.Id = postTag.Id;
        return CreatedAtAction(nameof(GetTagsForPost), new { postId = dto.PostId }, dto);
    }

    // DELETE: api/posttag/7
    [HttpDelete("{id}")]
    public async Task<IActionResult> RemoveTagFromPost(int id)
    {
        var postTag = await _context.PostTags.FindAsync(id);
        if (postTag == null)
        {
            return NotFound();
        }

        _context.PostTags.Remove(postTag);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
