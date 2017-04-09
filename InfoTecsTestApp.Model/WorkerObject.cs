using System;
using System.Collections.Generic;
using System.Runtime.Serialization;

namespace InfoTecsTestApp.Model
{
    [DataContract]
    public class WorkerObject
    {
        public WorkerObject()
        {
            Shifts = new List<Shift>();
        }
        [DataMember]
        public Guid WorkerObjectId { get; set; }
        [DataMember]
        public string Address { set; get; }
        [DataMember]
        public int WorkerCount { get; set; }
        public List<Shift> Shifts { get; set; }
    }
}
