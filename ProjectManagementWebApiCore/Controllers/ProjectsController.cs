using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProjectManagementWebApiCore.Models;

namespace ProjectManagementWebApiCore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectsController : ControllerBase
    {
        private readonly ProjectManagementContext _context;

        public ProjectsController(ProjectManagementContext context)
        {
            _context = context;
        }

        // GET: api/Projects
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TblProject>>> GetTblProject()
        {
            return await _context.TblProject.ToListAsync();
        }

        // GET: api/Projects/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TblProject>> GetTblProject(int id)
        {
            var tblProject = await _context.TblProject.FindAsync(id);

            if (tblProject == null)
            {
                return NotFound();
            }

            return tblProject;
        }

        // PUT: api/Projects/5
        //[HttpPut("{id}")]
        //public async Task<IActionResult> PutTblProject(int id, TblProject tblProject)
        //{
        //    if (id != tblProject.Id)
        //    {
        //        return BadRequest();
        //    }

        //    _context.Entry(tblProject).State = EntityState.Modified;

        //    try
        //    {
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!TblProjectExists(id))
        //        {
        //            return NotFound();
        //        }
        //        else
        //        {
        //            throw;
        //        }
        //    }
        //    return NoContent();
        //}

        // POST: api/Projects
        //[HttpPost]
        //public async Task<ActionResult<TblProject>> PostTblProject(TblProject tblProject)
        //{
        //    _context.TblProject.Add(tblProject);
        //    await _context.SaveChangesAsync();

        //    return CreatedAtAction("GetTblProject", new { id = tblProject.Id }, tblProject);
        //}

        //// DELETE: api/Projects/5
        //[HttpDelete("{id}")]
        //public async Task<ActionResult<TblProject>> DeleteTblProject(int id)
        //{
        //    var tblProject = await _context.TblProject.FindAsync(id);
        //    if (tblProject == null)
        //    {
        //        return NotFound();
        //    }

        //    _context.TblProject.Remove(tblProject);
        //    await _context.SaveChangesAsync();

        //    return tblProject;
        //}

        private bool TblProjectExists(int id)
        {
            return _context.TblProject.Any(e => e.Id == id);
        }

        [HttpPost]
        public async Task<ActionResult<ManageProject>> PostProject(ManageProject manageProject)
        {
            var initialId = 0;
            TblProject tblProject= new TblProject()
            {
                Code = manageProject.Code,
                Name = manageProject.Name,
                StartDate = manageProject.StartDate,
                EndDate = manageProject.EndDate
            };
            _context.TblProject.Add(tblProject);
            await _context.SaveChangesAsync();
            var empId = tblProject.Id;
            var tempId = (from p in _context.TblProjectTech
                      orderby p.Id descending
                      select p.Id).Take(1).SingleOrDefault();
            if (tempId == null)
            {
                initialId = 0;
            }
            else
            {
                initialId = tempId.Value;
            }
            var projectSkillId = initialId;
            TblProjectTech projectSkill = new TblProjectTech();
            var skillcount = manageProject.SelectedSkillList;
            for (int i = 0; i < skillcount.Count(); i++)
            {
                projectSkillId++;
                projectSkill.Id = projectSkillId;
                projectSkill.ProjectId = empId;
                projectSkill.SkillId = Convert.ToInt32(skillcount.ElementAt(i));
                _context.TblProjectTech.Add(projectSkill);
                await _context.SaveChangesAsync();
            };
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetTblProject", new { id = manageProject.Id }, manageProject);
        }

        // PUT: api/Employees/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProject(int id, ManageProject manageProject, [FromForm]TblProject tblProject)
        {
            var projectId = id;
            var initialId = 0;
            if (id != projectId)
            {
                return BadRequest();
            }

            _context.Entry(tblProject).State = EntityState.Modified;
            var tempId = (from p in _context.TblProjectTech
                          orderby p.Id descending
                          select p.Id).Take(1).SingleOrDefault();
            if (tempId == null)
            {
                initialId = 0;
            }
            else
            {
                initialId = tempId.Value;
            }
            _context.TblProjectTech.RemoveRange(_context.TblProjectTech.Where(x => x.ProjectId == id));
            _context.SaveChanges();
            var projectSkillId = initialId;
            TblProjectTech projectSkill = new TblProjectTech();
            var skillcount = manageProject.SelectedSkillList;
            for (int i = 0; i < skillcount.Count(); i++)
            {
                projectSkillId++;
                projectSkill.Id = projectSkillId;
                projectSkill.ProjectId = id;
                projectSkill.SkillId = Convert.ToInt32(skillcount.ElementAt(i));
                _context.TblProjectTech.Add(projectSkill);
                await _context.SaveChangesAsync();
            };
            try
            {
                await _context.SaveChangesAsync();

            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TblProjectExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/Projects/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<TblProject>> DeleteProduct(int id)
        {
            _context.TblProjectTech.RemoveRange(_context.TblProjectTech.Where(a => a.ProjectId == id));
            _context.SaveChanges();
            _context.TblAssign.RemoveRange(_context.TblAssign.Where(a => a.ProjectId == id));
            _context.SaveChanges();
            var tblProject = await _context.TblProject.FindAsync(id);
            if (tblProject == null)
            {
                return NotFound();
            }
            _context.TblProject.Remove(tblProject);
            await _context.SaveChangesAsync();

            return tblProject;
        }


    }
}
