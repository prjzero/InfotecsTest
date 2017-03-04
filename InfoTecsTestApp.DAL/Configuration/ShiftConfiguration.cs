using System.Data.Entity.ModelConfiguration;
using InfoTecsTestApp.Model;

namespace InfoTecsTestApp.DAL.Configuration
{
    public class ShiftConfiguration : EntityTypeConfiguration<Shift>
    {
        public ShiftConfiguration()
        {
            Property(c => c.ShiftId).IsRequired();
            Property(c => c.ShiftDate).IsRequired();
        }
    }
}