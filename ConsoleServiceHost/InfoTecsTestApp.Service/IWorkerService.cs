using System;
using System.Collections.Generic;
using InfoTecsTestApp.Model;

namespace InfoTecsTestApp.Service
{
    public interface IWorkerService
    {
        IEnumerable<Worker> GetWorkers();
        Worker GetWorker(Guid workerId);
        void DeleteWorker(Guid workerId);
        void CreateWorker(Worker worker);
        void UpdateWorker(Worker worker);
        void SaveWorker();
    }
}