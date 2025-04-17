using LightInject;
using Serilog;
using Specboard.Hubs;
using Specboard.Wireup;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Host.UseSerilog((context, configuration) => configuration.ReadFrom.Configuration(context.Configuration));
builder.Host.UseLightInject();

builder.Services.AddControllers();

builder.Services.ConfigureServices(builder.Configuration);
builder.Host.ConfigureContainer<IServiceRegistry>(registry => registry.ConfigureContainer());

builder.ConfigureSTrain();

var app = builder.Build();

app.UseExceptionHandler();

app.UseCors(builder =>
{
	builder.WithOrigins("http://localhost:4200");
	builder.AllowAnyHeader();
	builder.AllowAnyMethod();
	builder.AllowCredentials();
});

// Configure the HTTP request pipeline.

app.UseAuthorization();

app.MapControllers();
app.MapHub<NotificationHub>("/notification");

app.Run();
