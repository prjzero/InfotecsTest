using System;
using System.Collections.Generic;
using System.ServiceModel;
using InfoTecsTestApp.Model;

namespace WCFService
{
    [ServiceContract]
    public interface IWorkerWcfService
    {
        [OperationContract]
        void CreateShift(Shift shift);
        [OperationContract]
        void CreateWorker(Worker worker);
        [OperationContract]
        void CreateWorkerObject(WorkerObject workerObject);
        [OperationContract]
        void DeleteShift(Guid shiftId);
        [OperationContract]
        void DeleteWorker(Guid workerId);
        [OperationContract]
        void DeleteWorkerObject(Guid workerObjectId);
        [OperationContract]
        IEnumerable<Shift> GetShifts();
        [OperationContract]
        IEnumerable<WorkerObject> GetWorkerObjects();
        [OperationContract]
        IEnumerable<Worker> GetWorkers();
        [OperationContract]
        void UpdateShift(Shift shift);
        [OperationContract]
        void UpdateWorker(Worker worker);
        [OperationContract]
        void UpdateWorkerObject(WorkerObject workerObject);
    }
}