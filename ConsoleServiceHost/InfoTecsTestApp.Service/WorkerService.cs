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
    public class WorkerService : IWorkerService
    {
        private readonly IWorkerRepository workerRepository;
        private readonly IUnitOfWork unitOfWork;

        public WorkerService(IWorkerRepository workerRepository, IUnitOfWork unitOfWork)
        {
            this.workerRepository = workerRepository;
            this.unitOfWork = unitOfWork;
        }

        public IEnumerable<Worker> GetWorkers()
        {
            return workerRepository.GetAll();
        }

        public Worker GetWorker(Guid workerId)
        {
            return workerRepository.GetById(workerId);
        }

        public void DeleteWorker(Guid workerId)
        {
            workerRepository.Delete(worker => worker.WorkerId == workerId);
            SaveWorker();
        }

        public void CreateWorker(Worker worker)
        {
            ValidateWorker(worker);
            worker.WorkerId = Guid.NewGuid();
            workerRepository.Add(worker);
            SaveWorker();
        }

        public void UpdateWorker(Worker worker)
        {
            ValidateWorker(worker);
            workerRepository.Update(worker);
            SaveWorker();
        }

        public void SaveWorker()
        {
            unitOfWork.Commit();
        }

        private void ValidateWorker(Worker worker)
        {
            if (worker.Cost <= 0)
                throw new Exception("Зарплата должна быть больше 0");
            if (workerRepository.GetAll().Any(w => w.WorkerName == worker.WorkerName && w.WorkerId != worker.WorkerId))
                throw new Exception("Пользователь с таким именем уже существует");
            if (string.IsNullOrWhiteSpace(worker.Specialty))
                throw new Exception("Специальность не заполнена");
        }
    }
}
