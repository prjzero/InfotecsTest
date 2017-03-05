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
        void CreateShift(ShiftDto shift);
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
        IEnumerable<ShiftDto> GetShifts();
        [OperationContract]
        IEnumerable<WorkerObjectDto> GetWorkerObjects();
        [OperationContract]
        IEnumerable<WorkerDto> GetWorkers();
        [OperationContract]
        ShiftDto GetShift(Guid shiftId);
        [OperationContract]
        WorkerObjectDto GetWorkerObject(Guid workerObjectId);
        [OperationContract]
        WorkerDto GetWorker(Guid workerId);
        [OperationContract]
        void UpdateShift(ShiftDto shift);
        [OperationContract]
        void UpdateWorker(Worker worker);
        [OperationContract]
        void UpdateWorkerObject(WorkerObject workerObject);
    }
}