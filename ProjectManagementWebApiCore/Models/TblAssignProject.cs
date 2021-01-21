using System;
using System.Collections.Generic;

namespace ProjectManagementWebApiCore.Models
{
    public partial class TblAssignProject
    {
        public int? Id { get; set; }
        public int? EmployeeId { get; set; }
        public int? ProjectId { get; set; }

        public virtual TblEmployee Employee { get; set; }
        public virtual TblProject Project { get; set; }
    }
}
