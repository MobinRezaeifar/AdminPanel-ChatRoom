namespace WebApplication2.Models
{
    public class OnlineUserCatch
    {
        public OnlineUserCatch(string id)
        {
            Id = id;
        }

        public string Id { get; set; }
        public string Username { get; set; }
    }
}
