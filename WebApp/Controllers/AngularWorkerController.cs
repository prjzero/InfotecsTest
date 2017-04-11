using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using WebApp.WorkerServiceReference;

namespace WebApp.Controllers
{
    public class AngularWorkerController : Controller
    {
        private readonly IWorkerWcfService _workerService;
        public AngularWorkerController(IWorkerWcfService workerService)
        {
            _workerService = workerService;
        }
        // GET: AngularWorker
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Workers()
        {
            return View("Index");
        }

        public ActionResult WorkerObjects()
        {
            return View("Index");
        }

        public ActionResult WorkerShifts()
        {
            return View("Index");
        }

        [HttpGet]
        public ActionResult GetWorkers()
        {
            var result = _workerService.GetWorkers();
            return new ContentResult
            {
                ContentType = "application/json",
                Content = JsonConvert.SerializeObject(result, new JsonSerializerSettings { ContractResolver = new CamelCasePropertyNamesContractResolver() }),
                ContentEncoding = Encoding.UTF8
            };
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

        [HttpGet]
        public ActionResult GetWorkerObjects()
        {
            var result = _workerService.GetWorkerObjects();
            return new ContentResult
            {
                ContentType = "application/json",
                Content = JsonConvert.SerializeObject(result, new JsonSerializerSettings { ContractResolver = new CamelCasePropertyNamesContractResolver() }),
                ContentEncoding = Encoding.UTF8
            };
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


        [HttpGet]
        public ActionResult GetWorkerShifts()
        {
            var shifts = _workerService.GetShifts();
            var workers = _workerService.GetWorkers();
            var workerObjects = _workerService.GetWorkerObjects();
            var result = new {
                Shifts = shifts,
                Workers = workers,
                WorkerObjects = workerObjects
            };
            return new ContentResult
            {
                ContentType = "application/json",
                Content = JsonConvert.SerializeObject(result, new JsonSerializerSettings { ContractResolver = new CamelCasePropertyNamesContractResolver() }),
                ContentEncoding = Encoding.UTF8
            };
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
                    workers = new Guid[] { };
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