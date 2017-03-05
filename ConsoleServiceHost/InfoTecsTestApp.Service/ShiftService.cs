using System;
using System.Collections.Generic;
using InfoTecsTestApp.DAL.Infrastructure;
using InfoTecsTestApp.DAL.Repository;
using InfoTecsTestApp.Model;

namespace InfoTecsTestApp.Service
{
    public class ShiftService : IShiftService
    {
        private readonly IShiftRepository _shiftRepository;
        private readonly IUnitOfWork _unitOfWork;

        public ShiftService(IShiftRepository shiftRepository, IUnitOfWork unitOfWork)
        {
            this._shiftRepository = shiftRepository;
            this._unitOfWork = unitOfWork;
        }

        public IEnumerable<Shift> GetAll()
        {
            return _shiftRepository.GetAll();
        }

        public Shift Get(Guid shiftId)
        {
            return _shiftRepository.GetById(shiftId);
        }

        public void Delete(Guid workerId)
        {
            _shiftRepository.Delete(worker => worker.ShiftId == workerId);
            Save();
        }

        public void Create(Shift shift)
        {
            ValidateShift(shift);
            shift.ShiftId = Guid.NewGuid();
            _shiftRepository.Add(shift);
            Save();
        }

        public void Update(Shift shift)
        {
            ValidateShift(shift);
            _shiftRepository.Update(shift);
            Save();
        }

        public void Save()
        {
            _unitOfWork.Commit();
        }

        private void ValidateShift(Shift shift)
        {
            if (shift.ShiftWorkers == null || shift.ShiftWorkers.Count < 1)
                throw new Exception("В каждой смене должен быть минимум 1 рабочий");
            //if (shift.Workers <= 0)
            //    throw new Exception("Зарплата должна быть больше 0");
            //if (_shiftRepository.GetAll(true).Any(w => w.WorkerName == worker.WorkerName && w.WorkerId != worker.WorkerId))
            //    throw new Exception("Адрес должег быть уникальным");
        }
    }
}