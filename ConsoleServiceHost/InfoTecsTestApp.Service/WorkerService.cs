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
        private readonly IWorkerRepository _workerRepository;
        private readonly IUnitOfWork _unitOfWork;

        public WorkerService(IWorkerRepository workerRepository, IUnitOfWork unitOfWork)
        {
            this._workerRepository = workerRepository;
            this._unitOfWork = unitOfWork;
        }

        public IEnumerable<Worker> GetAll()
        {
            return _workerRepository.GetAll();
        }

        public Worker Get(Guid workerId)
        {
            return _workerRepository.GetById(workerId);
        }

        public void Delete(Guid workerId)
        {
            _workerRepository.Delete(worker => worker.WorkerId == workerId);
            Save();
        }

        public void Create(Worker worker)
        {
            ValidateWorker(worker);
            worker.WorkerId = Guid.NewGuid();
            _workerRepository.Add(worker);
            Save();
        }

        public void Update(Worker worker)
        {
            ValidateWorker(worker);
            _workerRepository.Update(worker);
            Save();
        }

        public void Save()
        {
            _unitOfWork.Commit();
        }

        private void ValidateWorker(Worker worker)
        {
            if (worker.Cost <= 0)
                throw new Exception("Зарплата должна быть больше 0");
            if (_workerRepository.GetAll(true).Any(w => w.WorkerName == worker.WorkerName && w.WorkerId != worker.WorkerId))
                throw new Exception("Пользователь с таким именем уже существует");
            if (string.IsNullOrWhiteSpace(worker.Specialty))
                throw new Exception("Специальность не заполнена");
        }
    }
}
