using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectManagementWebApiCore.Models
{
    public class ManageEmployee
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Code { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? ReleaseDate { get; set; }
        public string[] skills { get; set; }
        public IEnumerable<string> SelectedSkillList { get; set; }
        public IEnumerable<TblSkillsMaster> SkillsCollection { get; set; }
    }
}
