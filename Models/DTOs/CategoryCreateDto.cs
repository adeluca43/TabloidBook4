using System.ComponentModel.DataAnnotations;

namespace Tabloid.Models.DTOs;

public class CategoryCreateDTO
{
    [Required]
    [MaxLength(100)]
    public string Name { get; set; }
}
