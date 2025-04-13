using SpecBoard.Application.Hubs;
using SpecStore;
using STrain.Eventing.Handlers;

namespace SpecBoard.Application.Handlers
{
	public class SpecStoreEventHandlers : IEventHandler<SpecStore.ReportUploadedEvent>
	{
		private readonly INotificationHub _hub;

		public SpecStoreEventHandlers(INotificationHub hub)
		{
			_hub = hub;
		}

		public async Task HandleAsync(ReportUploadedEvent @event, CancellationToken cancellationToken)
		{
			await _hub.ReportUploadedAsync(@event.Project, @event.Version, cancellationToken);
		}
	}
}
