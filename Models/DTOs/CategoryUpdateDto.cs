using System.ComponentModel.DataAnnotations;

namespace Tabloid.Models.DTOs;

public class CategoryUpdateDTO
{
    [Required]
    public int Id { get; set; }

    [Required]
    [MaxLength(100)]
    public string Name { get; set; }
}
