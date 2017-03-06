using System;
using System.Collections.Generic;
using System.Linq;
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
            if (shift.ShiftDate.Equals(DateTime.MinValue))
                throw new Exception("Не указана дата");
            if (_shiftRepository.GetAll(true)
                .Any(
                    w =>
                        w.ShiftDate == shift.ShiftDate && w.ShiftId != shift.ShiftId &&
                        w.ShiftWorkers.Any(sw => shift.ShiftWorkers.Any(a => a.WorkerId == sw.WorkerId))))
                throw new Exception("Рабочий не можнт находиться в нескольких сменах в один день");
        }
    }
}