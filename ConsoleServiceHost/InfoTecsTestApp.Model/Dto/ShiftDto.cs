using System;
using System.Collections.Generic;
using System.Runtime.Serialization;

namespace InfoTecsTestApp.Model
{
    [DataContract]
    public class ShiftDto
    {
        [DataMember]
        public Guid ShiftId { get; set; }
        [DataMember]
        public WorkerObjectDto WorkerObject { get; set; }
        [DataMember]
        public DateTime ShiftDate { get; set; }
        [DataMember]
        public ICollection<WorkerDto> ShiftWorkers { get; set; }

    }
}
