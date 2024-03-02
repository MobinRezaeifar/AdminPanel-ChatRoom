using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Models;
using WebApplication2.Models;

namespace WebApplication2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MessagesController : ControllerBase
    {
        private readonly ApplicationDbContext _messagesContext;
        public MessagesController(ApplicationDbContext messagesContext)
        {
            _messagesContext = messagesContext;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Messages>>> GetMessages()
        {

            return await _messagesContext.Messages.ToListAsync();

        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Messages>> GetMessage(int id)
        {
            return (await _messagesContext.Messages.FindAsync(id)) ?? throw new Exception("not found");
        }
        [HttpPost]
        public async Task<ActionResult<Messages>> PostMessage(Messages messages)
        {
            _messagesContext.Messages.Add(messages);
            await _messagesContext.SaveChangesAsync();
            return CreatedAtAction(nameof(GetMessage), new { id = messages.Id }, messages);
        }
        [HttpPut("{id}")]
        public async Task<ActionResult> PutMessages(int id, Messages messages)
        {
            if (id != messages.Id)
            {
                return BadRequest();
            }
            _messagesContext.Entry(messages).State = EntityState.Modified;
            try
            {
                await _messagesContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                throw;
            }
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteMessage(int id)
        {
            if (_messagesContext.Messages == null)
            {
                return NotFound();
            }
            var message = await _messagesContext.Messages.FindAsync(id);
            if (message == null)
            {
                return NotFound();
            }
            _messagesContext.Messages.Remove(message);
            await _messagesContext.SaveChangesAsync();
            return Ok();
        }
    }
}
