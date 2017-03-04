using System.Data.Entity.ModelConfiguration;
using InfoTecsTestApp.Model;

namespace InfoTecsTestApp.DAL.Configuration
{
    public class WorkerConfiguration : EntityTypeConfiguration<Worker>
    {
        public WorkerConfiguration()
        {
            Property(c => c.WorkerId).IsRequired();
            Property(c => c.WorkerName).IsRequired().HasMaxLength(100);
            Property(c => c.Cost).IsRequired();
            Property(c => c.Specialty).IsRequired().HasMaxLength(500);
        }
    }
}