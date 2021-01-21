using ProjectManagementWebApiCore.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectManagementWebApiCore.CustomModels
{
    public class AssignProject
    {
        public int Id { get; set; }
        public int EmployeeId { get; set; }
        public int ProjectId { get; set; }
        public string[] projects { get; set; }
        public IEnumerable<string> SelectedProjectList { get; set; }
        public IEnumerable<TblProject> ProjectCollection { get; set; }
        public IEnumerable<string> SelectedEmployeeList { get; set; }
        public IEnumerable<TblEmployee> EmployeeCollection { get; set; }
    }
}
