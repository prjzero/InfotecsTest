using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using InfoTecsTestApp.DAL.Configuration;
using InfoTecsTestApp.Model;

namespace InfoTecsTestApp.DAL
{
    public class InfoTecsTestAppEntities : DbContext
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

            modelBuilder.Entity<WorkerObject>()
            .HasMany(p => p.Shifts)
            .WithRequired(p => p.WorkerObject);

            modelBuilder.Entity<Worker>()
                .HasMany(s => s.WorkerShifts)
                .WithMany(c => c.ShiftWorkers);
        }
    }
}
