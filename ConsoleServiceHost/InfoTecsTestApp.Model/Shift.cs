﻿using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace InfoTecsTestApp.Model
{
    [DataContract]
    public class Shift
    {
        //public Shift()
        //{
        //    ShiftWorkers = new List<Worker>();
        //}
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
