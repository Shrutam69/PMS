using System;
using System.Collections.Generic;

namespace ProjectManagementWebApiCore.Models
{
    public partial class TblAssign
    {
        public int Id { get; set; }
        public int? EmployeeId { get; set; }
        public int? ProjectId { get; set; }
    }
}
