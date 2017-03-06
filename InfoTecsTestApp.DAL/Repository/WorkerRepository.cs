using InfoTecsTestApp.DAL.Infrastructure;
using InfoTecsTestApp.Model;

namespace InfoTecsTestApp.DAL.Repository
{
    public class WorkerRepository : RepositoryBase<Worker>, IWorkerRepository
    {
        public WorkerRepository(IDatabaseFactory databaseFactory)
            : base(databaseFactory)
        {
        }

    }
}
