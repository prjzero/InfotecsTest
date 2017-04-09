using System;
using System.Collections.Generic;
using System.Runtime.Serialization;

namespace InfoTecsTestApp.Model
{
    [DataContract]
    public class Shift
    {
        [DataMember]
        public Guid ShiftId { get; set; }
        [DataMember]
        public virtual WorkerObject WorkerObject { get; set; }
        [DataMember]
        public virtual ICollection<Worker> ShiftWorkers { get; set; }
        [DataMember]
        public DateTime ShiftDate { get; set; }
        
    }
}
