using System;
using System.Collections.Generic;

namespace ProjectManagementWebApiCore.Models
{
    public partial class TblProject
    {
        public TblProject()
        {
            TblAssignProject = new HashSet<TblAssignProject>();
            TblProjectTech = new HashSet<TblProjectTech>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Code { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }

        public virtual ICollection<TblAssignProject> TblAssignProject { get; set; }
        public virtual ICollection<TblProjectTech> TblProjectTech { get; set; }
    }
}
