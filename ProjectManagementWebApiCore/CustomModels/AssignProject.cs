using ProjectManagementWebApiCore.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectManagementWebApiCore.CustomModels
{
    public class AssignProject
    {
        public int EmployeeId { get; set; }
        public int ProjectId { get; set; }
        public IEnumerable<TblProject> ProjectCollection { get; set; }

    }
}
