using AutoBogus;
using Moq;
using SpecStore;

namespace SpecBoard.Test.Unit.Handlers
{
	public partial class SpectStoreEventHandlersTest
	{
		[Fact(DisplayName = "[UNIT][RUE-001]: Send Notification")]
		public async Task ReportUploadedEventHandler_HandleAsync_SendNotification()
		{
			// Arrange
			var sut = CreateSUT();
			var @event = new AutoFaker<ReportUploadedEvent>().Generate();

			// Act
			await sut.HandleAsync(@event, default);

			// Assert
			_hubMock.Verify(h => h.ReportUploadedAsync(@event.Project, @event.Version, It.IsAny<CancellationToken>()), Times.Once());
		}
	}
}
