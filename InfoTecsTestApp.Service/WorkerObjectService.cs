using System;
using System.Collections.Generic;
using System.Linq;
using InfoTecsTestApp.DAL.Infrastructure;
using InfoTecsTestApp.DAL.Repository;
using InfoTecsTestApp.Model;

namespace InfoTecsTestApp.Service
{
    public class WorkerObjectService : IWorkerObjectService
    {
        private readonly IWorkerObjectRepository _workerObjectRepository;
        private readonly IUnitOfWork _unitOfWork;

        public WorkerObjectService(IWorkerObjectRepository workerObjectRepository, IUnitOfWork unitOfWork)
        {
            this._workerObjectRepository = workerObjectRepository;
            this._unitOfWork = unitOfWork;
        }

        public IEnumerable<WorkerObject> GetAll()
        {
            return _workerObjectRepository.GetAll();
        }

        public WorkerObject Get(Guid workerObjectId)
        {
            return _workerObjectRepository.GetById(workerObjectId);
        }

        public void Delete(Guid workerObjectId)
        {
            _workerObjectRepository.Delete(worker => worker.WorkerObjectId == workerObjectId);
            Save();
        }

        public void Create(WorkerObject workerObject)
        {
            ValidateWorkerObject(workerObject);
            _workerObjectRepository.Add(workerObject);
            Save();
        }

        public void Update(WorkerObject workerObject)
        {
            ValidateWorkerObject(workerObject);
            _workerObjectRepository.Update(workerObject);
            Save();
        }

        public void Save()
        {
            _unitOfWork.Commit();
        }
        private void ValidateWorkerObject(WorkerObject workerObject)
        {
            if (workerObject.WorkerCount <= 0)
                throw new Exception("Количество рабочих должно быть больше 0");
            if (_workerObjectRepository.GetAll(true).Any(w => w.Address == workerObject.Address && w.WorkerObjectId != workerObject.WorkerObjectId))
                throw new Exception("Адрес должег быть уникальным");
        }
    }
}
