using Microsoft.AspNetCore.SignalR;
using WebApplication2.Models;

namespace WebApplication2.Hubs
{
    public class SendMessageHub : Hub
    {
        private static List<SendMessage> _sendMessages;

        public SendMessageHub()
        {
            if (_sendMessages == null) _sendMessages = new List<SendMessage>();

        }
        public Task Connect(string message)
        {
            string MessageId = Context.ConnectionId;
            if (!_sendMessages.Any(x => x.Id == MessageId))
            {
                _sendMessages.Add(new SendMessage()
                {
                    Id = MessageId,
                    Message = message
                });
            }
            
            Clients.All.SendAsync("getSendmessage", _sendMessages);
            return Task.CompletedTask;
        }
        public override Task OnDisconnectedAsync(Exception? exception)
        {
            string MessageId = Context.ConnectionId;
            var message = _sendMessages.FirstOrDefault(x => x.Id == MessageId);
            if (message != null)
            {
                _sendMessages.Remove(message);
            }
            Clients.All.SendAsync("getSendmessage", _sendMessages);
            return base.OnDisconnectedAsync(exception);
        }

    }
}
