using System;
using System.Linq;
using System.Web.Mvc;
using WebApp.ViewModel;
using WebApp.WorkerServiceReference;

namespace WebApp.Controllers
{
    public class WorkerController : Controller
    {
        private readonly IWorkerWcfService _workerService;
        public WorkerController(IWorkerWcfService workerService)
        {
            _workerService = workerService;
        }
        // GET: Worker
        public ActionResult Index()
        {
            return View();
        }
        [HttpGet]
        public ActionResult Workers()
        {
            var result = _workerService.GetWorkers();
            return View(result);
        }
        [HttpGet]
        public ActionResult WorkersPartial()
        {
            var result = _workerService.GetWorkers();
            return PartialView("_WorkersPartial", result);
        }

        [HttpPost]
        public ActionResult UpdateWorker(Worker worker)
        {
            return GetStatusResult(() =>
            {
                if (worker.WorkerId.Equals(Guid.Empty))
                    _workerService.CreateWorker(worker);
                else
                    _workerService.UpdateWorker(worker);
            });
        }

        [HttpPost]
        public ActionResult DeleteWorker(string workerId)
        {
            return GetStatusResult(() =>
            {
                Guid workerIdGuid;
                if (Guid.TryParse(workerId, out workerIdGuid))
                    _workerService.DeleteWorker(workerIdGuid);
            });
        }


        public ActionResult WorkerObjects()
        {
            var result = _workerService.GetWorkerObjects();
            return View(result);
        }
        [HttpGet]
        public ActionResult WorkerObjectsPartial()
        {
            var result = _workerService.GetWorkerObjects();
            return PartialView("_WorkersObjectsPartial", result);
        }

        [HttpPost]
        public ActionResult UpdateWorkerObject(WorkerObject workerObject)
        {
            return GetStatusResult(() =>
            {
                if (workerObject.WorkerObjectId.Equals(Guid.Empty))
                    _workerService.CreateWorkerObject(workerObject);
                else
                    _workerService.UpdateWorkerObject(workerObject);
            });
        }
        [HttpPost]
        public ActionResult DeleteWorkerObject(string workerObjectId)
        {
            return GetStatusResult(() =>
            {
                Guid workerObjectIdGuid;
                if (Guid.TryParse(workerObjectId, out workerObjectIdGuid))
                    _workerService.DeleteWorkerObject(workerObjectIdGuid);
            });
        }

        public ActionResult WorkerShifts()
        {
            var shifts = _workerService.GetShifts();
            var workers = _workerService.GetWorkers();
            var workerObjects = _workerService.GetWorkerObjects();
            var workerShiftsViewModel = new WorkerShiftsViewModel()
            {
                Shifts = shifts,
                Workers = workers,
                WorkerObjects = workerObjects
            };
            return View(workerShiftsViewModel);
        }

        [HttpGet]
        public ActionResult WorkerShiftsPartial()
        {
            var shifts = _workerService.GetShifts();
            var workers = _workerService.GetWorkers();
            var workerObjects = _workerService.GetWorkerObjects();
            var workerShiftsViewModel = new WorkerShiftsViewModel()
            {
                Shifts = shifts,
                Workers = workers,
                WorkerObjects = workerObjects
            };
            return PartialView("_WorkerShiftsPartial", workerShiftsViewModel);
        }

        public ActionResult UpdateShift(string shiftId, string workerObjectId, Guid[] workers, string shiftDate)
        {
            return GetStatusResult(() =>
            {
                DateTime shiftDateTime;
                DateTime.TryParse(shiftDate, out shiftDateTime);
                Guid workerObjectGuid;
                Guid.TryParse(workerObjectId, out workerObjectGuid);
                var requestWorkerObject = _workerService.GetWorkerObject(workerObjectGuid);

                if (workers == null)
                    workers = new Guid[] {};
                var requestWorkers = _workerService.GetWorkers().Where(w => workers.Contains(w.WorkerId)).ToList();

                Guid shiftIdGuid;
                Guid.TryParse(shiftId, out shiftIdGuid);

                var shift = new ShiftDto() { ShiftDate = shiftDateTime, ShiftWorkers = requestWorkers, WorkerObject = requestWorkerObject, ShiftId = shiftIdGuid };
                if (shiftIdGuid.Equals(Guid.Empty))
                    _workerService.CreateShift(shift);
                else
                    _workerService.UpdateShift(shift);
            });
            
        }

        public ActionResult DeleteShift(string shiftId)
        {
            return GetStatusResult(() =>
            {
                Guid shiftIdGuid;
                if (Guid.TryParse(shiftId, out shiftIdGuid))
                    _workerService.DeleteShift(shiftIdGuid);
            });
        }

        private ActionResult GetStatusResult(Action process)
        {
            try
            {
                process();
            }
            catch (Exception exception)
            {
                return Json(new { Status = "Error", Message = exception.Message });
            }

            return Json(new { Status = "OK" });
        }
    }
}