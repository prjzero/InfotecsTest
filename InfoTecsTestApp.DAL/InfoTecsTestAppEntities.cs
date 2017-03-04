using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using InfoTecsTestApp.DAL.Configuration;
using InfoTecsTestApp.Model;
using Microsoft.AspNet.Identity.EntityFramework;

namespace InfoTecsTestApp.DAL
{
    public class InfoTecsTestAppEntities : DbContext//IdentityDbContext //<ApplicationUser>
    {

        public InfoTecsTestAppEntities() : base("InfoTecsTestAppEntities")
        {
        }
        public DbSet<Worker> Workers { get; set; }
        public DbSet<WorkerObject> WorkerObjects { get; set; }
        public DbSet<Shift> Shifts { get; set; }
        public virtual void Commit()
        {
            base.SaveChanges();
        }
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {

            base.OnModelCreating(modelBuilder);
            modelBuilder.Conventions.Remove<IncludeMetadataConvention>();

            modelBuilder.Configurations.Add(new WorkerConfiguration());
            modelBuilder.Configurations.Add(new WorkerObjectConfiguration());
            modelBuilder.Configurations.Add(new ShiftConfiguration());
        }
    }
}
