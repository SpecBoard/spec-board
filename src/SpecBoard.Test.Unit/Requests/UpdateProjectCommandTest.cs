using AutoBogus;
using Moq;

namespace SpecBoard.Test.Unit.Requests
{
	public partial class ProjectPerformersTest
	{
		[Fact(DisplayName = "[UNIT][UPC-001]: Update Project")]
		public async Task ProjectPerformers_PerformAsync_UpdateProject()
		{
			// Arrange
			var sut = CreateSUT();
			var command = new AutoFaker<SpecBoard.UpdateProjectCommand>().Generate();

			// Act
			await sut.PerformAsync(command, default);

			// Assert
			_requestSenderMock.Verify(r => r.SendAsync<SpecStore.UpdateProjectCommand, object>(It.Is<SpecStore.UpdateProjectCommand>(c => c.Key == command.Key && c.Name == command.Name), It.IsAny<CancellationToken>()), Times.Once());
		}
	}
}
