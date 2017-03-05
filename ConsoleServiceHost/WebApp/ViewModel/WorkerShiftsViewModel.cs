using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebApp.WorkerServiceReference;

namespace WebApp.ViewModel
{
    public class WorkerShiftsViewModel
    {
        public Shift[] Shifts { get; set; }
        public Worker[] Workers { get; set; }
        public WorkerObject[] WorkerObjects { get; set; }
    }
}