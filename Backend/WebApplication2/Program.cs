using Microsoft.EntityFrameworkCore;
using StackExchange.Redis;
using WebApplication1.Models;
using WebApplication2.Hubs;
using WebApplication2.Models;
using WebApplication2.Services;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddSignalR();

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("ChatDB")));



builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<IOnlineUsersService,OnlineUsersService>();
builder.Services.AddTransient<IManageImage, ManageImage>();

// redis connection config 
builder.Services.AddSingleton<IConnectionMultiplexer>(opt =>
{
    var redisUrl = builder.Configuration.GetConnectionString("Redis");
    return ConnectionMultiplexer.Connect(redisUrl);
});

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
    {
        builder.WithOrigins("http://localhost:3000")
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
    });
});

builder.Services.AddSingleton<IDictionary<string, OnlineUsers>>(opts => new Dictionary<string, OnlineUsers>());


builder.Services.AddCors();
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseDeveloperExceptionPage();
}
app.UseRouting();

app.UseCors();
app.UseCors(builder =>
{
    builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
});
app.UseEndpoints(endpoints =>
{
    endpoints.MapHub<OnlineUsersHub>("/chat");
    endpoints.MapHub<SendMessageHub>("/message");
});
app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
