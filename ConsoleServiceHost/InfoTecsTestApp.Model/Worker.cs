using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InfoTecsTestApp.Model
{
    public class Worker
    {
        public Guid WorkerId { get; set; }

        public string WorkerName { set; get; }

        public int Cost{ get; set; }

        public string Specialty { get; set; }
    }
}
