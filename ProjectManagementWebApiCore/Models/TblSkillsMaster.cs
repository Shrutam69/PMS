using System;
using System.Collections.Generic;

namespace ProjectManagementWebApiCore.Models
{
    public partial class TblSkillsMaster
    {
        public TblSkillsMaster()
        {
            TblEmployeeSkillEmployee = new HashSet<TblEmployeeSkill>();
            TblEmployeeSkillSkill = new HashSet<TblEmployeeSkill>();
            TblProjectTechEmployee = new HashSet<TblProjectTech>();
            TblProjectTechSkill = new HashSet<TblProjectTech>();
        }

        public int Id { get; set; }
        public string Name { get; set; }

        public virtual ICollection<TblEmployeeSkill> TblEmployeeSkillEmployee { get; set; }
        public virtual ICollection<TblEmployeeSkill> TblEmployeeSkillSkill { get; set; }
        public virtual ICollection<TblProjectTech> TblProjectTechEmployee { get; set; }
        public virtual ICollection<TblProjectTech> TblProjectTechSkill { get; set; }
    }
}
