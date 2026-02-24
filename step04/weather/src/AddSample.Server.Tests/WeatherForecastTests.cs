using System.Net;
using System.Text.Json;
using System.Threading.Tasks;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc.Testing;
using Xunit;

namespace AddSample.Server.Tests
{
    public class WeatherForecastTests : IClassFixture<WebApplicationFactory<Program>>
    {
        private readonly WebApplicationFactory<Program> _factory;

        public WeatherForecastTests(WebApplicationFactory<Program> factory)
        {
            _factory = factory;
        }

        [Fact]
        public async Task GetWeatherForecast_ReturnsSuccessAndFiveItems()
        {
            var client = _factory.CreateClient();
            var resp = await client.GetAsync("/api/weatherforecast");
            resp.StatusCode.Should().Be(HttpStatusCode.OK);

            var json = await resp.Content.ReadAsStringAsync();
            var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };
            var items = JsonSerializer.Deserialize<WeatherForecastDto[]>(json, options);

            items.Should().NotBeNull();
            items!.Length.Should().Be(5);
            items[0].Summary.Should().NotBeNullOrWhiteSpace();
        }

        private class WeatherForecastDto
        {
            public string Date { get; set; } = default!;
            public int TemperatureC { get; set; }
            public int TemperatureF { get; set; }
            public string Summary { get; set; } = default!;
        }
    }
}
