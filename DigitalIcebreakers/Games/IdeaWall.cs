using System.Threading.Tasks;
using DigitalIcebreakers.Games;
using DigitalIcebreakers.Hubs;
using Microsoft.AspNetCore.SignalR;

public class IdeaWall : IGame 
{
    public string Name => "ideawall";

    public async Task Message(string payload, GameHub hub)
    {
        var player = hub.GetPlayerByConnectionId();
        if (payload.StartsWith("idea:"))
            await hub.Clients.Client(hub.GetAdmin().ConnectionId).SendAsync("gameUpdate", player.Name, payload.Substring(5));
    }

    public Task Start(GameHub hub)
    {
        return Task.CompletedTask;
    }
}