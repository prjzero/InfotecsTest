using InfoTecsTestApp.DAL.Infrastructure;
using InfoTecsTestApp.Model;

namespace InfoTecsTestApp.DAL.Repository
{
    public class ShiftRepository : RepositoryBase<Shift>, IShiftRepository
    {
        public ShiftRepository(IDatabaseFactory databaseFactory)
            : base(databaseFactory)
        {
        }

    }
}