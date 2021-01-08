using System;
using System.Collections.Generic;

namespace ProjectManagementWebApiCore.Models
{
    public partial class TblProjectTech
    {
        public int Id { get; set; }
        public int? EmployeeId { get; set; }
        public int? SkillId { get; set; }

        public virtual TblSkillsMaster Employee { get; set; }
        public virtual TblSkillsMaster Skill { get; set; }
    }
}
