using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using InfoTecsTestApp.DAL.Infrastructure;
using InfoTecsTestApp.DAL.Repository;
using InfoTecsTestApp.Model;

namespace InfoTecsTestApp.Service
{
    public class WorkerObjectService : IWorkerObjectService
    {
        private readonly IWorkerObjectRepository workerObjectRepository;
        private readonly IUnitOfWork unitOfWork;

        public WorkerObjectService(IWorkerObjectRepository workerObjectRepository, IUnitOfWork unitOfWork)
        {
            this.workerObjectRepository = workerObjectRepository;
            this.unitOfWork = unitOfWork;
        }

        public IEnumerable<WorkerObject> GetWorkerObjects()
        {
            return workerObjectRepository.GetAll();
        }

        public WorkerObject GetWorkerObject(Guid workerObjectId)
        {
            return workerObjectRepository.GetById(workerObjectId);
        }

        public void DeleteWorkerObject(Guid workerObjectId)
        {
            workerObjectRepository.Delete(worker => worker.WorkerObjectId == workerObjectId);
            SaveWorkerObject();
        }

        public void CreateWorkerObject(WorkerObject workerObject)
        {
            workerObjectRepository.Add(workerObject);
            SaveWorkerObject();
        }

        public void UpdateWorkerObject(WorkerObject workerObject)
        {
            workerObjectRepository.Update(workerObject);
            SaveWorkerObject();
        }

        public void SaveWorkerObject()
        {
            unitOfWork.Commit();
        }
    }
}
