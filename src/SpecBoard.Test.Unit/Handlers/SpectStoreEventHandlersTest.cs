using Moq;
using SpecBoard.Application.Handlers;
using SpecBoard.Application.Hubs;

namespace SpecBoard.Test.Unit.Handlers
{
	public partial class SpectStoreEventHandlersTest
	{

		private Mock<INotificationHub> _hubMock = null!;

		private SpecStoreEventHandlers CreateSUT()
		{
			_hubMock = new Mock<INotificationHub>();

			return new SpecStoreEventHandlers(_hubMock.Object);
		}
	}
}
