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
    public class WorkerWcfService : IWorkerWcfService  //:: IWorkerWcfService IWorkerWCFService
    {
        private readonly IWorkerService _workerService;
        private readonly IWorkerObjectService _workerObjectService;
        private readonly IShiftService _shiftService;
        public WorkerWcfService(IWorkerService workerService, IWorkerObjectService workerObjectService, IShiftService shiftService)
        {
            _workerService = workerService;
            _workerObjectService = workerObjectService;
            _shiftService = shiftService;
        }
        
        public IEnumerable<Worker> GetWorkers()
        {
            return _workerService.GetAll();
        }

        public Shift GetShift(Guid shiftId)
        {
            return _shiftService.Get(shiftId);
        }

        public WorkerObject GetWorkerObject(Guid workerObjectId)
        {
            return _workerObjectService.Get(workerObjectId);
        }

        public Worker GetWorker(Guid workerId)
        {
            return _workerService.Get(workerId);
        }

        public void CreateWorker(Worker worker)
        {
            _workerService.Create(worker);
        }

        public void UpdateWorker(Worker worker)
        {
            _workerService.Update(worker);
        }
        public void DeleteWorker(Guid workerId)
        {
            _workerService.Delete(workerId);
        }

        public IEnumerable<WorkerObject> GetWorkerObjects()
        {
            return _workerObjectService.GetAll(); ;
        }

        public void CreateWorkerObject(WorkerObject workerObject)
        {
            workerObject.WorkerObjectId = Guid.NewGuid();
            _workerObjectService.Create(workerObject);
        }

        public void UpdateWorkerObject(WorkerObject workerObject)
        {
            _workerObjectService.Update(workerObject);
        }

        public void DeleteWorkerObject(Guid workerObjectId)
        {
            _workerObjectService.Delete(workerObjectId);
        }

        public IEnumerable<Shift> GetShifts()
        {
            return _shiftService.GetAll();
        }

        public void CreateShift(Shift shift)
        {
            _shiftService.Create(shift);
        }

        public void UpdateShift(Shift shift)
        {
            _shiftService.Update(shift);
        }
        public void DeleteShift(Guid shiftId)
        {
            _shiftService.Delete(shiftId);
        }
    }
}
