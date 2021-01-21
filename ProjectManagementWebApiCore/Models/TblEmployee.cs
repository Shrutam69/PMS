using System;
using System.Collections.Generic;

namespace ProjectManagementWebApiCore.Models
{
    public partial class TblEmployee
    {
        public TblEmployee()
        {
            TblAssignProject = new HashSet<TblAssignProject>();
            TblEmployeeSkill = new HashSet<TblEmployeeSkill>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Code { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? ReleaseDate { get; set; }

        public virtual ICollection<TblAssignProject> TblAssignProject { get; set; }
        public virtual ICollection<TblEmployeeSkill> TblEmployeeSkill { get; set; }
    }
}
