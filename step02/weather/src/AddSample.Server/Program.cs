var builder = WebApplication.CreateBuilder(args);

// Add service defaults & Aspire client integrations.
builder.AddServiceDefaults();

// Configure output caching: prefer Redis when a connection string is provided,
// otherwise fall back to the default in-memory output cache so the app
// remains runnable in development without requiring Redis.
var redisConn = builder.Configuration.GetConnectionString("cache")
    ?? builder.Configuration["Aspire:StackExchange:Redis:ConnectionString"];
if (!string.IsNullOrWhiteSpace(redisConn))
{
    builder.AddRedisClientBuilder("cache")
        .WithOutputCache();
}
else
{
    builder.Services.AddOutputCache();
}

// Add services to the container.
builder.Services.AddProblemDetails();

// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseExceptionHandler();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseOutputCache();

string[] summaries = ["Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching", "Blistering", "Sizzling"];

var api = app.MapGroup("/api");
api.MapGet("weatherforecast", () =>
{
    var forecast = Enumerable.Range(1, 5).Select(index =>
        new WeatherForecast
        (
            DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            Random.Shared.Next(-20, 55),
            summaries[Random.Shared.Next(summaries.Length)]
        ))
        .ToArray();
    return forecast;
})
.CacheOutput(p => p.Expire(TimeSpan.FromSeconds(5)))
.WithName("GetWeatherForecast");

app.MapDefaultEndpoints();

if (!string.IsNullOrWhiteSpace(app.Environment.WebRootPath)
    && Directory.Exists(app.Environment.WebRootPath))
{
    app.UseFileServer();
}

app.Run();

record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}

// Expose Program type for WebApplicationFactory in integration tests
public partial class Program { }
