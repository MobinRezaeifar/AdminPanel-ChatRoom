using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegistersController : ControllerBase
    {
        private readonly ApplicationDbContext _registersContext;
        public RegistersController(ApplicationDbContext registerContext)
        {
            _registersContext = registerContext;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Registers>>> GetRegisters()
        {

            return await _registersContext.Registers.ToListAsync();

        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Registers>> GetRegister(int id)
        {
            return (await _registersContext.Registers.FindAsync(id)) ?? throw new Exception("not found");
        }
        [HttpPost]
        public async Task<ActionResult<Registers>> PostRegisters(Registers registers)
        {
            _registersContext.Registers.Add(registers);
            await _registersContext.SaveChangesAsync();
            return CreatedAtAction(nameof(GetRegister), new { id = registers.Id }, registers);
        }
        [HttpPut("{id}")]
        public async Task<ActionResult> PutRegisters(int id, Registers registers)
        {
            if (id != registers.Id)
            {
                return BadRequest();
            }
            _registersContext.Entry(registers).State = EntityState.Modified;
            try
            {
                await _registersContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                throw;
            }
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteRegisters(int id)
        {
            if (_registersContext.Registers == null)
            {
                return NotFound();
            }
            var register = await _registersContext.Registers.FindAsync(id);
            if (register == null)
            {
                return NotFound();
            }
            _registersContext.Registers.Remove(register);
            await _registersContext.SaveChangesAsync();
            return Ok();
        }
    }
}
