using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebApp.WorkerServiceReference;

namespace WebApp.ViewModel
{
    public class WorkerShiftsViewModel
    {
        public List<ShiftDto> Shifts { get; set; }
        public List<WorkerDto> Workers { get; set; }
        public List<WorkerObjectDto> WorkerObjects { get; set; }
    }
}