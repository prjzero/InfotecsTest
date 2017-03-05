using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace InfoTecsTestApp.Model
{
    [DataContract]
    public class WorkerObjectDto
    {
        [DataMember]
        public Guid WorkerObjectId { get; set; }
        [DataMember]
        public string Address { set; get; }
        [DataMember]
        public int WorkerCount { get; set; }
    }
}
