using InfoTecsTestApp.DAL.Infrastructure;
using InfoTecsTestApp.Model;

namespace InfoTecsTestApp.DAL.Repository
{
    public class WorkerObjectRepository : RepositoryBase<WorkerObject>, IWorkerObjectRepository
    {
        public WorkerObjectRepository(IDatabaseFactory databaseFactory)
            : base(databaseFactory)
        {
        }

    }
}