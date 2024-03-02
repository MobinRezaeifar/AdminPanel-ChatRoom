using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApplication2.Models;
using WebApplication2.Services;

namespace WebApplication2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OnlineUsersController : ControllerBase
    {

        private readonly IOnlineUsersService _onlineUsers;

        public OnlineUsersController(IOnlineUsersService onlineUsers)
        {
            _onlineUsers = onlineUsers;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<OnlineUserCatch>> GetUser(string id)
        {
            var user = await _onlineUsers.GetUserAsync(id);

            return user ?? new OnlineUserCatch(id);
        }

        [HttpPost]
        public async Task<ActionResult<OnlineUserCatch>> UpdateOrCreateUser(OnlineUserCatch user)
        {
            var createdOrUpdatedUser = await _onlineUsers.UpdateUserAsync(user);

            if (createdOrUpdatedUser is null) return BadRequest("Failed TO Save");

            return createdOrUpdatedUser;
        }
        [HttpDelete]
        public async Task<ActionResult> DeleteBasket(string userId)
        {
            var result = await _onlineUsers.DeleteUserAsync(userId);

            if (result)
                return Ok("The Basket Has Been Deleted");

            return BadRequest("Failed To Delete Basket");
        }


    }
}
