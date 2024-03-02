using StackExchange.Redis;
using System.Text.Json;
using WebApplication2.Models;

namespace WebApplication2.Services
{
    public class OnlineUsersService:IOnlineUsersService
    {
        private readonly IDatabase _redisDb;

        public OnlineUsersService(IConnectionMultiplexer redis)
        {
            _redisDb = redis.GetDatabase();
        }
        public async Task<bool> DeleteUserAsync(string userId)
        {
            return await _redisDb.KeyDeleteAsync(userId);
        }

        public async Task<OnlineUserCatch?> GetUserAsync(string userId)
        {
            var user = await _redisDb.StringGetAsync(userId);
            return user.IsNull ? null : JsonSerializer.Deserialize<OnlineUserCatch>(user);
        }

        public async Task<OnlineUserCatch?> UpdateUserAsync(OnlineUserCatch user)
        {
           
            var updateOrCreateBasket = await _redisDb.StringSetAsync(user.Id, JsonSerializer.Serialize(user), TimeSpan.FromDays(30));
            if (updateOrCreateBasket)
                return await GetUserAsync(user.Id);
            return null;
        }
    }
}
