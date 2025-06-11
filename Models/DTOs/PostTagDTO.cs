using System.ComponentModel.DataAnnotations;
using Tabloid.Models.DTOs;

namespace Tabloid.Models.DTOs;

public class PostTagDTO
{
    public int Id { get; set; }
    public int PostId { get; set; }
    public int TagId { get; set; }
    public TagDTO Tag { get; set; }
}
