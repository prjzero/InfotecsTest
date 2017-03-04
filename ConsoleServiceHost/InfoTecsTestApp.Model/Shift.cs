using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InfoTecsTestApp.Model
{
    public class Shift
    {
        public Guid ShiftId { get; set; }
        public virtual WorkerObject WorkerObject { set; get; }
        public virtual ICollection<Worker> Workers { get; set; }
        public DateTime Date { get; set; }
    }
}
