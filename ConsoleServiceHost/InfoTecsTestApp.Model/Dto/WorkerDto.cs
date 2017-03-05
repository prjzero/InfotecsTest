using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace InfoTecsTestApp.Model
{
    [DataContract]
    public class WorkerDto
    {
        [DataMember]
        public Guid WorkerId { get; set; }
        [DataMember]
        public string WorkerName { set; get; }
        [DataMember]
        public int Cost { get; set; }
        [DataMember]
        public string Specialty { get; set; }
    }
}
