namespace SpecBoard.Application.Hubs
{
	public interface INotificationHub
	{
		Task ReportUploadedAsync(string project, string version, CancellationToken cancellationToken);
	}
}
