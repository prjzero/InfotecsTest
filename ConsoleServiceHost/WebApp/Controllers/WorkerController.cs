﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceModel;
using System.Web;
using System.Web.Mvc;
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
            var result = _workerService.GetShifts();
            return View(result);
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