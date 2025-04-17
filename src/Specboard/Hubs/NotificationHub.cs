using Microsoft.AspNetCore.SignalR;
using SpecBoard.Application.Hubs;
using SpecStore;

namespace Specboard.Hubs
{
	public class NotificationService : INotificationHub
	{
		private readonly IHubContext<NotificationHub> _context;

		public NotificationService(IHubContext<NotificationHub> context)
		{
			_context = context;
		}
		public async Task ReportUploadedAsync(string project, string version, Status status, CancellationToken cancellationToken)
		{
			await _context.Clients.All.SendAsync("report.uploaded", new { Project = project, Version = version, Status = status }, cancellationToken);
		}
	}

	public class NotificationHub : Hub
	{

	}
}
