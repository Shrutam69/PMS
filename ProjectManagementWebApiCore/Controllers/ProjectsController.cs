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
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTblProject(int id, TblProject tblProject)
        {
            if (id != tblProject.Id)
            {
                return BadRequest();
            }

            _context.Entry(tblProject).State = EntityState.Modified;

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

        // POST: api/Projects
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<TblProject>> PostTblProject(TblProject tblProject)
        {
            _context.TblProject.Add(tblProject);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTblProject", new { id = tblProject.Id }, tblProject);
        }

        // DELETE: api/Projects/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<TblProject>> DeleteTblProject(int id)
        {
            var tblProject = await _context.TblProject.FindAsync(id);
            if (tblProject == null)
            {
                return NotFound();
            }

            _context.TblProject.Remove(tblProject);
            await _context.SaveChangesAsync();

            return tblProject;
        }

        private bool TblProjectExists(int id)
        {
            return _context.TblProject.Any(e => e.Id == id);
        }
    }
}
