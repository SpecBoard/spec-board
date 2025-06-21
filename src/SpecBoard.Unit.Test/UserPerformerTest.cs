using AutoBogus;
using Bogus;
using Moq;
using SpecBoard.Application.Contexts;
using SpecBoard.Application.Performers;
using STrain;

namespace SpecBoard.Unit.Test
{
	public class UserPerformerTest
	{
		private Mock<IUserAccessor> _userContextMock = null!;
		private Mock<IRequestSender> _requestSenderMock = null!;

		private UserPerformers CreateSUT()
		{
			_userContextMock = new Mock<IUserAccessor>();
			_requestSenderMock = new Mock<IRequestSender>();

			return new UserPerformers(_userContextMock.Object, _requestSenderMock.Object);
		}

		[Trait("Feature", "LogIn")]
		[Fact(DisplayName = "[UNIT][LGN-001] - LogIn")]
		public async Task UserPerformers_LogInCommand_LogIn()
		{
			// Arrange
			var sut = CreateSUT();
			var user = new Faker().Internet.UserName();
			var command = new AutoFaker<SpecBoard.Commands.LogInCommand>().Generate();

			_userContextMock.SetupGet(uc => uc.User).Returns(user);

			// Act
			await sut.PerformAsync(command, default);

			// Assert
			_requestSenderMock.Verify(rs => rs.SendAsync<SpecProfile.Commands.LogInCommand, object>(It.Is<SpecProfile.Commands.LogInCommand>(c => c.User == user), It.IsAny<CancellationToken>()));
		}

		[Trait("Feature", "LogOut")]
		[Fact(DisplayName = "[UNIT][LGN-002] - LogOut")]
		public async Task UserPerformers_LogOutCommand_LogOut()
		{
			// Arrange
			var sut = CreateSUT();
			var user = new Faker().Internet.UserName();
			var command = new AutoFaker<SpecBoard.Commands.LogOutCommand>().Generate();

			_userContextMock.SetupGet(uc => uc.User).Returns(user);

			// Act
			await sut.PerformAsync(command, default);

			// Assert
			_requestSenderMock.Verify(rs => rs.SendAsync<SpecProfile.Commands.LogOutCommand, object>(It.Is<SpecProfile.Commands.LogOutCommand>(c => c.User == user), It.IsAny<CancellationToken>()));
		}
	}
}
