using SpecBoard.Application.Contexts;
using SpecBoard.Commands;
using STrain;

namespace SpecBoard.Application.Performers
{
	public class UserPerformers : ICommandPerformer<SpecBoard.Commands.LogInCommand>,
		ICommandPerformer<SpecBoard.Commands.LogOutCommand>
	{
		private readonly IUserAccessor _userContext;
		private readonly IRequestSender _sender;

		public UserPerformers(IUserAccessor userContext, IRequestSender sender)
		{
			_userContext = userContext;
			_sender = sender;
		}

		public async Task PerformAsync(SpecBoard.Commands.LogInCommand command, CancellationToken cancellationToken)
		{
			await _sender.SendAsync(new SpecProfile.Commands.LogInCommand { User = _userContext.User }, cancellationToken);
		}

		public async Task PerformAsync(LogOutCommand command, CancellationToken cancellationToken)
		{
			await _sender.SendAsync(new SpecProfile.Commands.LogOutCommand { User = _userContext.User }, cancellationToken);
		}
	}
}
