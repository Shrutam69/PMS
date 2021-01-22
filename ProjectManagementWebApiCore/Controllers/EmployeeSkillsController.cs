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
    public class EmployeeSkillsController : ControllerBase
    {
        private readonly ProjectManagementContext _context;

        public EmployeeSkillsController(ProjectManagementContext context)
        {
            _context = context;
        }

        // GET: api/EmployeeSkills
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TblEmployeeSkill>>> GetTblEmployeeSkill()
        {
            return await _context.TblEmployeeSkill.ToListAsync();
        }

        // GET: api/EmployeeSkills/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TblEmployeeSkill>> GetTblEmployeeSkill(int? id)
        {
            var tblEmployeeSkill = await _context.TblEmployeeSkill.FindAsync(id);

            if (tblEmployeeSkill == null)
            {
                return NotFound();
            }

            return tblEmployeeSkill;
        }

        // PUT: api/EmployeeSkills/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTblEmployeeSkill(int? id, TblEmployeeSkill tblEmployeeSkill)
        {
            if (id != tblEmployeeSkill.Id)
            {
                return BadRequest();
            }

            _context.Entry(tblEmployeeSkill).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TblEmployeeSkillExists(id))
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

        // POST: api/EmployeeSkills
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<TblEmployeeSkill>> PostTblEmployeeSkill(TblEmployeeSkill tblEmployeeSkill)
        {
            _context.TblEmployeeSkill.Add(tblEmployeeSkill);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTblEmployeeSkill", new { id = tblEmployeeSkill.Id }, tblEmployeeSkill);
        }

        // DELETE: api/EmployeeSkills/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<TblEmployeeSkill>> DeleteTblEmployeeSkill(int? id)
        {
            var tblEmployeeSkill = await _context.TblEmployeeSkill.FindAsync(id);
            if (tblEmployeeSkill == null)
            {
                return NotFound();
            }

            _context.TblEmployeeSkill.Remove(tblEmployeeSkill);
            await _context.SaveChangesAsync();

            return tblEmployeeSkill;
        }

        private bool TblEmployeeSkillExists(int? id)
        {
            return _context.TblEmployeeSkill.Any(e => e.Id == id);
        }
    }
}
