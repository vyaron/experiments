using System.Threading.Tasks;
using Microsoft.AspNet.SignalR;
using Newtonsoft.Json;
using Serilog;

namespace Server.Api
{
    public class EventHub : Hub
    {
        /// <summary>
        /// Allow a client to receive events on a particular channel
        /// </summary>
        /// <param name="channel">The name of the channel</param>
        /// <returns></returns>
        public async Task Subscribe(string channel)
        {
            Log.Information("Client {ConnectionId} subscribing to channel {channel}", Context.ConnectionId, channel);

            await Groups.Add(Context.ConnectionId, channel);
            Clients.OthersInGroup(channel).OnEvent(new ChannelEvent
            {
                Name = "client.connected",
                Json = JsonConvert.SerializeObject(Context.ConnectionId)
            });
        }

        /// <summary>
        /// Allow a client to stop receiving events on a particular channel
        /// </summary>
        /// <param name="channel">The name of the channel</param>
        /// <returns></returns>
        public async Task Unsubscribe(string channel)
        {
            Log.Information("Client {ConnectionId} unsubscribing from channel {channel}", Context.ConnectionId, channel);

            await Groups.Remove(Context.ConnectionId, channel);
            Clients.OthersInGroup(channel).OnEvent(new ChannelEvent
            {
                Name = "client.disconnected",
                Json = JsonConvert.SerializeObject(Context.ConnectionId)
            });
        }

        /// <summary>
        /// A method for clients to publish events that others should know about
        /// </summary>
        /// <param name="ev"></param>
        /// <param name="channel"></param>
        /// <returns></returns>
        public void Publish(ChannelEvent ev, string channel)
        {
            Log.Information("Client {ConnectionId} published event to channel {channel} - {@ev}", Context.ConnectionId, channel, ev);

            Clients.OthersInGroup(channel).OnEvent(ev);
        }
    }


    public class ChannelEvent
    {
        public string Name { get; set; }

        public string Json { get; set; }
    }
}
