using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis;
using Microsoft.EntityFrameworkCore;
using ProjectManagementWebApiCore.CustomModels;
using ProjectManagementWebApiCore.Models;

namespace ProjectManagementWebApiCore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AssignProjectsController : ControllerBase
    {
        private readonly ProjectManagementContext _context;

        public AssignProjectsController(ProjectManagementContext context)
        {
            _context = context;
        }

        // GET: api/AssignProjects
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TblAssignProject>>> GetTblAssignProject()
        {
            return await _context.TblAssignProject.ToListAsync();
        }

        // GET: api/AssignProjects/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TblAssignProject>> GetTblAssignProject(int? id)
        {
            var tblAssignProject = await _context.TblAssignProject.FindAsync(id);

            if (tblAssignProject == null)
            {
                return NotFound();
            }

            return tblAssignProject;
        }

        // PUT: api/AssignProjects/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTblAssignProject(int? id, TblAssignProject tblAssignProject)
        {
            if (id != tblAssignProject.Id)
            {
                return BadRequest();
            }

            _context.Entry(tblAssignProject).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TblAssignProjectExists(id))
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

        // POST: api/AssignProjects

        //[HttpPost]
        //public async Task<ActionResult<TblAssignProject>> PostTblAssignProject(TblAssignProject tblAssignProject)
        //{
        //    _context.TblAssignProject.Add(tblAssignProject);
        //    await _context.SaveChangesAsync();

        //    return CreatedAtAction("GetTblAssignProject", new { id = tblAssignProject.Id }, tblAssignProject);
        //}

        // DELETE: api/AssignProjects/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<TblAssignProject>> DeleteTblAssignProject(int? id)
        {
            var tblAssignProject = await _context.TblAssignProject.FindAsync(id);
            if (tblAssignProject == null)
            {
                return NotFound();
            }

            _context.TblAssignProject.Remove(tblAssignProject);
            await _context.SaveChangesAsync();

            return tblAssignProject;
        }

        private bool TblAssignProjectExists(int? id)
        {
            return _context.TblAssignProject.Any(e => e.Id == id);
        }

        [HttpPost]
        public async Task<ActionResult<AssignProject>> AssignProject(AssignProject assignProject)
        {
            var initialId = 0;

            if (assignProject.ProjectId == 0)
            {
                var tempId = (from p in _context.TblAssignProject
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
                _context.TblAssignProject.RemoveRange(_context.TblAssignProject.Where(x => x.EmployeeId == assignProject.EmployeeId));
                _context.SaveChanges();
               
                var assignId = initialId;
                TblAssignProject tblAssignProject = new TblAssignProject();
                var projectCount = assignProject.SelectedProjectList;
                for (int i = 0; i < projectCount.Count(); i++)
                {
                    assignId++;
                    tblAssignProject.Id = assignId;
                    tblAssignProject.EmployeeId = assignProject.EmployeeId;
                    tblAssignProject.ProjectId = Convert.ToInt32(projectCount.ElementAt(i));
                    _context.TblAssignProject.Add(tblAssignProject);
                    await _context.SaveChangesAsync();
                };
            }

            if(assignProject.EmployeeId == 0){
                var tempId = (from p in _context.TblAssignProject
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
                _context.TblAssignProject.RemoveRange(_context.TblAssignProject.Where(x => x.ProjectId == assignProject.ProjectId));
                _context.SaveChanges();

                var assignId = initialId;
                TblAssignProject tblAssignProject = new TblAssignProject();
                var projectCount = assignProject.SelectedEmployeeList;
                for (int i = 0; i < projectCount.Count(); i++)
                {
                    assignId++;
                    tblAssignProject.Id = assignId;
                    tblAssignProject.ProjectId = assignProject.ProjectId;
                    tblAssignProject.EmployeeId = Convert.ToInt32(projectCount.ElementAt(i));
                    _context.TblAssignProject.Add(tblAssignProject);
                    await _context.SaveChangesAsync();
                };
            }

            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTblAssignProject", new { id = assignProject.Id }, assignProject);
        }

    }
}
