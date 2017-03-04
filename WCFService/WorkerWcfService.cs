using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;
using InfoTecsTestApp.DAL.Infrastructure;
using InfoTecsTestApp.DAL.Repository;
using InfoTecsTestApp.Model;
using InfoTecsTestApp.Service;

namespace WCFService
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the class name "WorkerService" in both code and config file together.
    public class WorkerWcfService : IWorkerWcfService //: IWorkerWCFService
    {
        private readonly IWorkerService _workerService;
        private readonly IWorkerObjectService _workerObjectService;
        public WorkerWcfService(IWorkerService workerService, IWorkerObjectService workerObjectService)
        {
            _workerService = workerService;
            _workerObjectService = workerObjectService;
        }
        
        public IEnumerable<Worker> GetWorkers()
        {
            return _workerService.GetWorkers();
        }

        public void CreateWorker(Worker worker)
        {
            _workerService.CreateWorker(worker);
        }

        public void UpdateWorker(Worker worker)
        {
            _workerService.UpdateWorker(worker);
        }
        public void DeleteWorker(Guid workerId)
        {
            _workerService.DeleteWorker(workerId);
        }

        public IEnumerable<WorkerObject> GetWorkerObjects()
        {
            return _workerObjectService.GetWorkerObjects(); ;
        }

        public void CreateWorkerObject(WorkerObject workerObject)
        {
            workerObject.WorkerObjectId = Guid.NewGuid();
            _workerObjectService.CreateWorkerObject(workerObject);
        }

        public void UpdateWorkerObject(WorkerObject workerObject)
        {
            _workerObjectService.UpdateWorkerObject(workerObject);
        }

        public void DeleteWorkerObject(Guid workerObjectId)
        {
            _workerObjectService.DeleteWorkerObject(workerObjectId);
        }
    }
}
