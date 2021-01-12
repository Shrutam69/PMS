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
    public class EmployeesController : ControllerBase
    {
        private readonly ProjectManagementContext _context;

        public EmployeesController(ProjectManagementContext context)
        {
            _context = context;
        }

        // GET: api/Employees
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TblEmployee>>> GetTblEmployee()
        {
            return await _context.TblEmployee.ToListAsync();
        }

        // GET: api/Employees/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TblEmployee>> GetTblEmployee(int id)
        {
            var tblEmployee = await _context.TblEmployee.FindAsync(id);

            if (tblEmployee == null)
            {
                return NotFound();
            }

            return tblEmployee;
        }

        // PUT: api/Employees/5
        //[HttpPut("{id}")]
        //public async Task<IActionResult> PutTblEmployee(int id, TblEmployee tblEmployee)
        //{
        //    if (id != tblEmployee.Id)
        //    {
        //        return BadRequest();
        //    }

        //    _context.Entry(tblEmployee).State = EntityState.Modified;

        //    try
        //    {
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!TblEmployeeExists(id))
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

        // POST: api/Employees
        //[HttpPost]
        //public async Task<ActionResult<TblEmployee>> PostTblEmployee(TblEmployee tblEmployee , [FromForm]ManageEmployee manageEmployee)
        //{
        //    //_context.TblEmployee.Add(tblEmployee);
                
        //    //var selectlist = _context.TblSkillsMaster.Select(c => new
        //    //{
        //    //    CategoryID = c.Id,
        //    //    CategoryName = c.Name
        //    //}).ToList();
        //    //var skillss = _context.TblSkillsMaster.Select(s => new { SkillId = s.Id, SkillName = s.Name }).ToList();

        //    _context.TblEmployee.Add(tblEmployee);
        //    await _context.SaveChangesAsync();
        //    //var empId = tblEmployee.Id;
        //    //var ab = (from p in _context.TblEmployee
        //    //          orderby p.Id descending
        //    //          select p.Id).Take(1).SingleOrDefault();

        //    //TblEmployeeSkill empSkill = new TblEmployeeSkill();
        //    //var skillcount = manageEmployee.SelectedSkillList;
        //    //for (int i = 0; i < skillcount.Count(); i++)
        //    //{

        //    //    empSkill.EmployeeId = ab;
        //    //    empSkill.SkillId = Convert.ToInt32(skillcount.ElementAt(i));
        //    //    _context.TblEmployeeSkill.Add(empSkill);
        //    //    await _context.SaveChangesAsync();
        //    //};

        //    //_context.TblEmployee.Add(tblEmployee);

        //    //await _context.SaveChangesAsync();

        //    return CreatedAtAction("GetTblEmployee", new { id = tblEmployee.Id }, tblEmployee);
        //}

        // DELETE: api/Employees/5
        //[HttpDelete("{id}")]
        //public async Task<ActionResult<TblEmployee>> DeleteTblEmployee(int id)
        //{
        //    var tblEmployee = await _context.TblEmployee.FindAsync(id);
        //    if (tblEmployee == null)
        //    {
        //        return NotFound();
        //    }

        //    _context.TblEmployee.Remove(tblEmployee);
        //    await _context.SaveChangesAsync();

        //    return tblEmployee;
        //}

        private bool TblEmployeeExists(int id)
        {
            return _context.TblEmployee.Any(e => e.Id == id);
        }

        [HttpPost]
        public async Task<ActionResult<ManageEmployee>> PostEmployee(ManageEmployee manageEmployee)
        {
            var initialId = 0;
            TblEmployee tblEmployee = new TblEmployee()
            {
                Code = manageEmployee.Code,
                Name = manageEmployee.Name,
                StartDate = manageEmployee.StartDate,
                ReleaseDate = manageEmployee.ReleaseDate
            };
            _context.TblEmployee.Add(tblEmployee);
            await _context.SaveChangesAsync();
            var empId = tblEmployee.Id;
            var tempId = (from p in _context.TblEmployeeSkill
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
            var empSkillId = initialId;
            TblEmployeeSkill empSkill = new TblEmployeeSkill();
            var skillcount = manageEmployee.SelectedSkillList;
            for (int i = 0; i < skillcount.Count(); i++)
            {
                empSkillId++;
                empSkill.Id = empSkillId;
                empSkill.EmployeeId = empId;
                empSkill.SkillId = Convert.ToInt32(skillcount.ElementAt(i));
                _context.TblEmployeeSkill.Add(empSkill);
                await _context.SaveChangesAsync();
            };

            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTblEmployee", new { id = manageEmployee.Id }, manageEmployee);
        }

        // PUT: api/Employees/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEmployee(int id, ManageEmployee manageEmployee)
        {
            var empId = id;
            var initialId = 0;
            var tblEmployee = await _context.TblEmployee.FindAsync(id);
            if (id != empId)
            {
                return BadRequest();
            }

            _context.Entry(tblEmployee).State = EntityState.Modified;
            var tempId = (from p in _context.TblEmployeeSkill
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
            _context.TblEmployeeSkill.RemoveRange(_context.TblEmployeeSkill.Where(x => x.EmployeeId == id));
            _context.SaveChanges();
            var empSkillId = initialId;
            TblEmployeeSkill empSkill = new TblEmployeeSkill();
            var skillcount = manageEmployee.SelectedSkillList;
            for (int i = 0; i < skillcount.Count(); i++)
            {
                empSkillId++;
                empSkill.Id = empSkillId;
                empSkill.EmployeeId = id;
                empSkill.SkillId = Convert.ToInt32(skillcount.ElementAt(i));
                _context.TblEmployeeSkill.Add(empSkill);
                await _context.SaveChangesAsync();
            };
            try
            {
                await _context.SaveChangesAsync();
               
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TblEmployeeExists(id))
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

        // DELETE: api/Employees/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<TblEmployee>> DeleteManageEmployee(int id)
        {
            var tblEmployee = await _context.TblEmployee.FindAsync(id);
            var data = _context.TblEmployeeSkill.Where(a => a.EmployeeId == id).ToList();
             _context.TblEmployeeSkill.RemoveRange(data);
             _context.SaveChanges();
             _context.TblAssign.RemoveRange(_context.TblAssign.Where(a => a.EmployeeId == id));
             _context.SaveChanges();
            if (tblEmployee == null)
            {
                return NotFound();
            }
            _context.TblEmployee.Remove(tblEmployee);
            await _context.SaveChangesAsync();

            return tblEmployee;
        }
    }
}
