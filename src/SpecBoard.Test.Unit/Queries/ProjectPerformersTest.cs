using Microsoft.Extensions.Logging;
using Moq;
using SpecBoard.Application.Performers;
using STrain;
using Xunit.Abstractions;

namespace SpecBoard.Test.Unit.Queries
{
	public partial class ProjectPerformersTest
	{

		private Mock<IRequestSender> _requestSenderMock;

		private readonly ILogger<ProjectPerformers> _logger;

		public ProjectPerformersTest(ITestOutputHelper outputHelper)
		{
			_logger = new LoggerFactory()
						  .AddXUnit(outputHelper)
						  .CreateLogger<ProjectPerformers>();
		}

		private ProjectPerformers CreateSUT()
		{
			_requestSenderMock = new Mock<IRequestSender>();

			return new ProjectPerformers(_requestSenderMock.Object, _logger);
		}
	}
}
