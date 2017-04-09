using System;
using System.Runtime.Serialization;

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
