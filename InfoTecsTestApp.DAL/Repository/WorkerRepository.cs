using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
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
