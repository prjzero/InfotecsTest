using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

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
