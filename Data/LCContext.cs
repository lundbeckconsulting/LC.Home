using LC.Home.Blitz.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace LC.Home.Blitz.Data
{
    public class LCContext : DbContext
    {
        public LCContext(DbContextOptions<LCContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<HistoryItem>(opt => opt.ToTable("LCHome_HistoryItem"));
            builder.Entity<Project>(opt => opt.ToTable("LCHome_Projects"));
            builder.Entity<ProjectImage>(opt => opt.ToTable("LCHome_ProjectImages"));
        }

        public DbSet<HistoryItem> HistoryItems { get; set; }
        public DbSet<Project> Projects { get; set; }
        public DbSet<ProjectImage> ProjectImages { get; set; }
    }

}
