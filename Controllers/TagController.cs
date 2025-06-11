using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Tabloid.Data;
using Tabloid.Models;
using Tabloid.Models.DTOs;

namespace Tabloid.Controllers;

[Route("api/[controller]")]
[ApiController]
public class TagController : ControllerBase
{
    private readonly TabloidDbContext _context;

    public TagController(TabloidDbContext context)
    {
        _context = context;
    }

    // GET: api/tag
    [HttpGet]
    public async Task<ActionResult<IEnumerable<TagDTO>>> GetTags()
    {
        var tags = await _context.Tags
            .Select(t => new TagDTO
            {
                Id = t.Id,
                Name = t.Name
            })
            .ToListAsync();

        return Ok(tags);
    }

    // GET: api/tag/5
    [HttpGet("{id}")]
    public async Task<ActionResult<TagDTO>> GetTag(int id)
    {
        var tag = await _context.Tags.FindAsync(id);
        if (tag == null)
        {
            return NotFound();
        }

        return new TagDTO
        {
            Id = tag.Id,
            Name = tag.Name
        };
    }

    // POST: api/tag
    [HttpPost]
    public async Task<ActionResult<TagDTO>> PostTag(TagDTO dto)
    {
        if (_context.Tags.Any(t => t.Name.ToLower() == dto.Name.ToLower()))
        {
            return BadRequest("A tag with that name already exists.");
        }

        var tag = new Tag { Name = dto.Name };
        _context.Tags.Add(tag);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetTag), new { id = tag.Id }, new TagDTO { Id = tag.Id, Name = tag.Name });
    }

    // PUT: api/tag/5
    [HttpPut("{id}")]
    public async Task<IActionResult> PutTag(int id, TagDTO dto)
    {
        if (id != dto.Id)
        {
            return BadRequest();
        }

        var tag = await _context.Tags.FindAsync(id);
        if (tag == null)
        {
            return NotFound();
        }

        tag.Name = dto.Name;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!_context.Tags.Any(e => e.Id == id))
            {
                return NotFound();
            }

            throw;
        }

        return NoContent();
    }

    // DELETE: api/tag/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTag(int id)
    {
        var tag = await _context.Tags
            .Include(t => t.PostTags)
            .FirstOrDefaultAsync(t => t.Id == id);

        if (tag == null)
        {
            return NotFound();
        }

        if (tag.PostTags.Any())
        {
            return BadRequest("Cannot delete tag that is associated with posts.");
        }

        _context.Tags.Remove(tag);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
