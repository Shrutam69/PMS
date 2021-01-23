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
    public class ProjectTechController : ControllerBase
    {
        private readonly ProjectManagementContext _context;

        public ProjectTechController(ProjectManagementContext context)
        {
            _context = context;
        }

        // GET: api/ProjectTech
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TblProjectTech>>> GetTblProjectTech()
        {
            return await _context.TblProjectTech.ToListAsync();
        }

        // GET: api/ProjectTech/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TblProjectTech>> GetTblProjectTech(int? id)
        {
            var tblProjectTech = await _context.TblProjectTech.FindAsync(id);

            if (tblProjectTech == null)
            {
                return NotFound();
            }

            return tblProjectTech;
        }

        // PUT: api/ProjectTech/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTblProjectTech(int? id, TblProjectTech tblProjectTech)
        {
            if (id != tblProjectTech.Id)
            {
                return BadRequest();
            }

            _context.Entry(tblProjectTech).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TblProjectTechExists(id))
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

        // POST: api/ProjectTech
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<TblProjectTech>> PostTblProjectTech(TblProjectTech tblProjectTech)
        {
            _context.TblProjectTech.Add(tblProjectTech);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTblProjectTech", new { id = tblProjectTech.Id }, tblProjectTech);
        }

        // DELETE: api/ProjectTech/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<TblProjectTech>> DeleteTblProjectTech(int? id)
        {
            var tblProjectTech = await _context.TblProjectTech.FindAsync(id);
            if (tblProjectTech == null)
            {
                return NotFound();
            }

            _context.TblProjectTech.Remove(tblProjectTech);
            await _context.SaveChangesAsync();

            return tblProjectTech;
        }

        private bool TblProjectTechExists(int? id)
        {
            return _context.TblProjectTech.Any(e => e.Id == id);
        }
    }
}
