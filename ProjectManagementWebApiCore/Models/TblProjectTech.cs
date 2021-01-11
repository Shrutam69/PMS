using System;
using System.Collections.Generic;

namespace ProjectManagementWebApiCore.Models
{
    public partial class TblProjectTech
    {
        public int? Id { get; set; }
        public int? ProjectId { get; set; }
        public int? SkillId { get; set; }

        public virtual TblProject Project { get; set; }
        public virtual TblSkillsMaster Skill { get; set; }
    }
}
