using System;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
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
        public async Task<ActionResult> UpdateWorker(Worker worker)
        {
            return await GetStatusResultAsync(Task.Run(async () =>
            {
                if (worker.WorkerId.Equals(Guid.Empty))
                    await _workerService.CreateWorkerAsync(worker);
                else
                    await _workerService.UpdateWorkerAsync(worker);
            }));
        }

        [HttpPost]
        public async Task<ActionResult> DeleteWorker(string workerId)
        {
            return await GetStatusResultAsync(Task.Run(async () =>
            {
                Guid workerIdGuid;
                if (Guid.TryParse(workerId, out workerIdGuid))
                    await _workerService.DeleteWorkerAsync(workerIdGuid);
            }));
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
        public async Task<ActionResult> UpdateWorkerObject(WorkerObject workerObject)
        {
            return await GetStatusResultAsync(Task.Run(async () =>
            {
                if (workerObject.WorkerObjectId.Equals(Guid.Empty))
                    await _workerService.CreateWorkerObjectAsync(workerObject);
                else
                    await _workerService.UpdateWorkerObjectAsync(workerObject);
            }));
        }
        [HttpPost]
        public async Task<ActionResult> DeleteWorkerObject(string workerObjectId)
        {
            return await GetStatusResultAsync(Task.Run(async () =>
            {
                Guid workerObjectIdGuid;
                if (Guid.TryParse(workerObjectId, out workerObjectIdGuid))
                    await _workerService.DeleteWorkerObjectAsync(workerObjectIdGuid);
            }));
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

        public async Task<ActionResult> UpdateShift(string shiftId, string workerObjectId, Guid[] workers, string shiftDate)
        {
            return await GetStatusResultAsync(Task.Run(async () =>
            {
                DateTime shiftDateTime;
                DateTime.TryParse(shiftDate, out shiftDateTime);
                Guid workerObjectGuid;
                Guid.TryParse(workerObjectId, out workerObjectGuid);
                var requestWorkerObject = await _workerService.GetWorkerObjectAsync(workerObjectGuid);

                if (workers == null)
                    workers = new Guid[] {};
                var requestWorkers = (await _workerService.GetWorkersAsync()).Where(w => workers.Contains(w.WorkerId)).ToList();

                Guid shiftIdGuid;
                Guid.TryParse(shiftId, out shiftIdGuid);

                var shift = new ShiftDto() { ShiftDate = shiftDateTime, ShiftWorkers = requestWorkers, WorkerObject = requestWorkerObject, ShiftId = shiftIdGuid };
                if (shiftIdGuid.Equals(Guid.Empty))
                    await _workerService.CreateShiftAsync(shift);
                else
                    await _workerService.UpdateShiftAsync(shift);
            }));

        }

        public async Task<ActionResult> DeleteShift(string shiftId)
        {
            return await GetStatusResultAsync(Task.Run(async () =>
            {
                Guid shiftIdGuid;
                if (Guid.TryParse(shiftId, out shiftIdGuid))
                    await _workerService.DeleteShiftAsync(shiftIdGuid);
            }));
        }

        private async Task<ActionResult> GetStatusResultAsync(Task process)
        {
            try
            {
                await process;
            }
            catch (Exception exception)
            {
                return Json(new { Status = "Error", Message = exception.Message });
            }

            return Json(new { Status = "OK" });
        }
    }
}