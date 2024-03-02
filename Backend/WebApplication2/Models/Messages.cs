namespace WebApplication2.Models
{
    public class Messages
    {
        public int Id { get; set; } = new Random().Next();
        public string? Sender { get; set; }
        public string? Recipient { get; set; }
        public string? Text { get; set; }
        public string? Sticker { get; set; }
        public string? File { get; set; }
        public string? Relationship { get; set; }
    }
}
