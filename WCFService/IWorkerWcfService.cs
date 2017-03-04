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
        void CreateWorker(Worker worker);
        [OperationContract]
        void CreateWorkerObject(WorkerObject workerObject);
        [OperationContract]
        void DeleteWorker(Guid workerId);
        [OperationContract]
        void DeleteWorkerObject(Guid workerObjectId);
        [OperationContract]
        IEnumerable<WorkerObject> GetWorkerObjects();
        [OperationContract]
        IEnumerable<Worker> GetWorkers();
        [OperationContract]
        void UpdateWorker(Worker worker);
        [OperationContract]
        void UpdateWorkerObject(WorkerObject workerObject);
    }
}