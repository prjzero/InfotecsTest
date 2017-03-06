using System.Collections.Generic;
using WebApp.WorkerServiceReference;

namespace WebApp.ViewModel
{
    public class WorkerShiftsViewModel
    {
        public IEnumerable<ShiftDto> Shifts { get; set; }
        public IEnumerable<WorkerDto> Workers { get; set; }
        public IEnumerable<WorkerObjectDto> WorkerObjects { get; set; }
    }
}