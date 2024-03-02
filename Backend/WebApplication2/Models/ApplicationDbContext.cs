using Microsoft.EntityFrameworkCore;
using WebApplication2.Models;

namespace WebApplication1.Models
{
    public class ApplicationDbContext: DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }
        public DbSet<Registers> Registers { get; set; }
        public DbSet<Messages> Messages { get; set; }

    }
}
