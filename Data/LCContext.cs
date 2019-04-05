using LC.Home.Blitz.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace LC.Home.Blitz.Data
{
    public class LCContext : DbContext
    {
        public LCContext(DbContextOptions<LCContext> options) : base(options)
        {
        }

        public DbSet<HistoryItem> HistoryItems { get; set; }
        public DbSet<Project> Projects { get; set; }
        public DbSet<ProjectImage> ProjectImages { get; set; }
    }
}
