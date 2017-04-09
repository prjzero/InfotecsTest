using System;
using System.Collections.Generic;
using System.Runtime.Serialization;

namespace InfoTecsTestApp.Model
{
    [DataContract]
    public class Worker
    {
        [DataMember]
        public Guid WorkerId { get; set; }
        [DataMember]
        public string WorkerName { set; get; }
        [DataMember]
        public int Cost{ get; set; }
        [DataMember]
        public string Specialty { get; set; }
        public virtual ICollection<Shift> WorkerShifts { get; set; }
    }
}
