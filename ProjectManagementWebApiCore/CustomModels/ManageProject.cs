using System;
using System.Collections.Generic;

namespace ProjectManagementWebApiCore.Models
{
    public class ManageProject
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Code { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string[] skills { get; set; }
        public IEnumerable<string> SelectedSkillList { get; set; }
        public IEnumerable<TblSkillsMaster> SkillsCollection { get; set; }
    }
}
