using System;
using System.Runtime.Serialization;

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
