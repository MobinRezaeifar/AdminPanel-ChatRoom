using Microsoft.AspNetCore.SignalR;
using WebApplication2.Models;

namespace WebApplication2.Hubs
{
    public class OnlineUsersHub : Hub
    {

        private static List<OnlineUsers> _users;
        public OnlineUsersHub()
        {
            if (_users == null) _users = new List<OnlineUsers>();
        }

        public Task Connect(string userName)
        {
            string clientId = Context.ConnectionId;

            if (!_users.Any(x =>  x.Id == clientId))
            {
                _users.Add(new OnlineUsers()
                {
                    Id = clientId,
                    Username = userName
                });
            }

            Clients.All.SendAsync("getOnlineUsers", _users);
            return Task.CompletedTask;
        }




        public override Task OnDisconnectedAsync(Exception? exception)
        {
            string clientId = Context.ConnectionId;
            var user = _users.FirstOrDefault(x => x.Id == clientId);
            if (user != null)
                _users.Remove(user);

            Clients.All.SendAsync("getOnlineUsers", _users);
            return base.OnDisconnectedAsync(exception);
        }

    }


}
