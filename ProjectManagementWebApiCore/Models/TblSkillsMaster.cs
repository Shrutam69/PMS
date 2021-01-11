using System;
using System.Collections.Generic;

namespace ProjectManagementWebApiCore.Models
{
    public partial class TblSkillsMaster
    {
        public TblSkillsMaster()
        {
            TblEmployeeSkill = new HashSet<TblEmployeeSkill>();
            TblProjectTech = new HashSet<TblProjectTech>();
        }

        public int Id { get; set; }
        public string Name { get; set; }

        public virtual ICollection<TblEmployeeSkill> TblEmployeeSkill { get; set; }
        public virtual ICollection<TblProjectTech> TblProjectTech { get; set; }
    }
}
