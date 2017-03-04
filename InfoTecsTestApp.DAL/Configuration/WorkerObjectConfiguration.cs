using System.Data.Entity.ModelConfiguration;
using InfoTecsTestApp.Model;

namespace InfoTecsTestApp.DAL.Configuration
{
    public class WorkerObjectConfiguration : EntityTypeConfiguration<WorkerObject>
    {
        public WorkerObjectConfiguration()
        {
            Property(c => c.WorkerObjectId).IsRequired();
            Property(c => c.WorkerCount).IsRequired();
            Property(c => c.Address).IsRequired().HasMaxLength(500);
        }
    }
}