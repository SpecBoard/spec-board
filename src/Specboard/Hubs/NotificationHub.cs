using Microsoft.AspNetCore.SignalR;
using SpecBoard.Application.Hubs;

namespace Specboard.Hubs
{
	public class NotificationService : INotificationHub
	{
		private readonly IHubContext<NotificationHub> _context;

		public NotificationService(IHubContext<NotificationHub> context)
		{
			_context = context;
		}
		public async Task ReportUploadedAsync(string project, string version, CancellationToken cancellationToken)
		{
			await _context.Clients.All.SendAsync("report.uploaded", new { Project = project, Version = version }, cancellationToken);
		}
	}

	public class NotificationHub : Hub
	{

	}
}
