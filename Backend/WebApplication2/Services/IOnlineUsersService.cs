using WebApplication2.Models;

namespace WebApplication2.Services
{
    public interface IOnlineUsersService
    {
        Task<OnlineUserCatch> GetUserAsync(string userId);
        Task<OnlineUserCatch> UpdateUserAsync(OnlineUserCatch user);
        Task<bool> DeleteUserAsync(string userId);
    }
}
