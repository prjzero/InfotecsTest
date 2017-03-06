using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;
using AutoMapper;
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
        private readonly IMapper _mapper;
        public WorkerWcfService(IWorkerService workerService, IWorkerObjectService workerObjectService, IShiftService shiftService)
        {
            _workerService = workerService;
            _workerObjectService = workerObjectService;
            _shiftService = shiftService;
            //var config = new MapperConfiguration(cfg => {
            //    cfg.CreateMap<Shift, ShiftDto>();
            //    cfg.CreateMap<WorkerObject, WorkerObjectDto>();
            //});
            //config.AssertConfigurationIsValid();
            //_mapper = config.CreateMapper();

            Mapper.Initialize(cfg =>
            {
                cfg.CreateMap<Worker, WorkerDto>();
                cfg.CreateMap<WorkerObject, WorkerObjectDto>();
                cfg.CreateMap<Shift, ShiftDto>();
            });
        }
        
        public IEnumerable<WorkerDto> GetWorkers()
        {
            return _workerService.GetAll().Select(Mapper.Map<WorkerDto>);
        }

        public ShiftDto GetShift(Guid shiftId)
        {
            return Mapper.Map<ShiftDto>(_shiftService.Get(shiftId)); 
        }

        public WorkerObjectDto GetWorkerObject(Guid workerObjectId)
        {
            return Mapper.Map<WorkerObjectDto>(_workerObjectService.Get(workerObjectId));
        }

        public WorkerDto GetWorker(Guid workerId)
        {
            return Mapper.Map<WorkerDto>(_workerService.Get(workerId));
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

        public IEnumerable<WorkerObjectDto> GetWorkerObjects()
        {
            var aaa = _workerObjectService.GetAll();
            //var mapped = Mapper.Map<WorkerObjectDto>(aaa);
            return _workerObjectService.GetAll().Select(Mapper.Map<WorkerObjectDto>); 
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

        public IEnumerable<ShiftDto> GetShifts()
        {
            var aaa = _shiftService.GetAll().ToList();
            var bbb = _shiftService.GetAll().Select(Mapper.Map<ShiftDto>).ToList();
            return _shiftService.GetAll().Select(Mapper.Map<ShiftDto>);
        }

        public void CreateShift(ShiftDto shift)
        {
            WorkerObject wo = null;
            ICollection<Worker> ws = null;
            if (shift.WorkerObject != null)
                wo = _workerObjectService.Get(shift.WorkerObject.WorkerObjectId);
            if (shift.ShiftWorkers != null && shift.ShiftWorkers.Count > 0)
                ws = _workerService.GetAll().Where(w => shift.ShiftWorkers.Any(wst => wst.WorkerId == w.WorkerId)).ToList();
            var tShift = new Shift()
            {
                ShiftId = shift.ShiftId,
                ShiftDate = shift.ShiftDate,
                WorkerObject = wo,
                ShiftWorkers = ws
            };
            _shiftService.Create(tShift);
        }

        public void UpdateShift(ShiftDto shift)
        {
            
            WorkerObject wo = new WorkerObject();
            ICollection<Worker> ws = new List<Worker>();
            if (shift.WorkerObject != null)
                wo = _workerObjectService.Get(shift.WorkerObject.WorkerObjectId);
            if (shift.ShiftWorkers != null && shift.ShiftWorkers.Count > 0)
                ws = _workerService.GetAll().Where(w => shift.ShiftWorkers.Any(wst => wst.WorkerId == w.WorkerId)).ToList();
            var tShift = _shiftService.Get(shift.ShiftId);
            tShift.ShiftWorkers.Clear();
            tShift.ShiftWorkers = ws;
            tShift.WorkerObject = wo;
            tShift.ShiftDate = shift.ShiftDate;
            _shiftService.Update(tShift);
        }
        public void DeleteShift(Guid shiftId)
        {
            _shiftService.Delete(shiftId);
        }
    }
}
