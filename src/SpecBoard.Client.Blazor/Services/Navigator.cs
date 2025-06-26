using Microsoft.AspNetCore.Components;

namespace SpecBoard.Client.Blazor.Services
{
	public interface INavigator
	{
		void ToHome();
		void ToLogin();
	}

	public class Navigator : INavigator
	{
		private readonly NavigationManager _navigation;

		public Navigator(NavigationManager navigation)
		{
			_navigation = navigation;
		}

		public void ToHome()
		{
			_navigation.NavigateTo("/");
		}

		public void ToLogin()
		{
			_navigation.NavigateTo("/login");
		}
	}
}
