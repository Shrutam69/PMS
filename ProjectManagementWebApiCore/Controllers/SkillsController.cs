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
    public class SkillsController : ControllerBase
    {
        private readonly ProjectManagementContext _context;

        public SkillsController(ProjectManagementContext context)
        {
            _context = context;
        }

        // GET: api/Skills
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TblSkillsMaster>>> GetTblSkillsMaster()
        {
            return await _context.TblSkillsMaster.ToListAsync();
        }

        // GET: api/Skills/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TblSkillsMaster>> GetTblSkillsMaster(int id)
        {
            var tblSkillsMaster = await _context.TblSkillsMaster.FindAsync(id);

            if (tblSkillsMaster == null)
            {
                return NotFound();
            }

            return tblSkillsMaster;
        }

        // PUT: api/Skills/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTblSkillsMaster(int id, TblSkillsMaster tblSkillsMaster)
        {
            if (id != tblSkillsMaster.Id)
            {
                return BadRequest();
            }

            _context.Entry(tblSkillsMaster).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TblSkillsMasterExists(id))
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

        // POST: api/Skills
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<TblSkillsMaster>> PostTblSkillsMaster(TblSkillsMaster tblSkillsMaster)
        {
            _context.TblSkillsMaster.Add(tblSkillsMaster);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTblSkillsMaster", new { id = tblSkillsMaster.Id }, tblSkillsMaster);
        }

        // DELETE: api/Skills/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<TblSkillsMaster>> DeleteTblSkillsMaster(int id)
        {
            var tblSkillsMaster = await _context.TblSkillsMaster.FindAsync(id);
            if (tblSkillsMaster == null)
            {
                return NotFound();
            }

            _context.TblSkillsMaster.Remove(tblSkillsMaster);
            await _context.SaveChangesAsync();

            return tblSkillsMaster;
        }

        private bool TblSkillsMasterExists(int id)
        {
            return _context.TblSkillsMaster.Any(e => e.Id == id);
        }
    }
}
