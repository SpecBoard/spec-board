using Microsoft.AspNetCore.Components;
using Moq;
using SpecBoard.Client.Blazor.Services;

namespace SpecBoard.Client.Blazor.Test.Unit.Services
{
	public class NavigatorTest
	{
		private Mock<NavigationManager> _navigationMock = null!;

		private Navigator CreateSUT()
		{
			_navigationMock = new Mock<NavigationManager>();

			return new Navigator(_navigationMock.Object);
		}

		[Fact(DisplayName = "[UNIT][NVG-001] - To Login")]
		public void Navigator_ToLogin()
		{
			// Arrange
			var sut = CreateSUT();

			// Act
			sut.ToLogin();

			// Assert
			_navigationMock.Verify(n => n.NavigateTo(It.Is<string>(p => p == "/login"), It.IsAny<NavigationOptions>()));
		}

		[Fact(DisplayName = "[UNIT][NVG-002] - To Home")]
		public void Navigator_ToHome()
		{
			// Arrange
			var sut = CreateSUT();

			// Act
			sut.ToHome();

			// Assert
			_navigationMock.Verify(n => n.NavigateTo(It.Is<string>(p => p == "/"), It.IsAny<NavigationOptions>()));
		}
	}
}
