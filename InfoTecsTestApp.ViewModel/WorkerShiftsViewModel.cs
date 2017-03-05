using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using InfoTecsTestApp.Model;

namespace InfoTecsTestApp.ViewModel
{
    public class WorkerShiftsViewModel
    {
        public Shift[] Shifts { get; set; }
        public Worker[] Workers { get; set; }
        public WorkerObject[] WorkerObjects { get; set; }
    }
}
