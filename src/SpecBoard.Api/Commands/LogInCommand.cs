using Microsoft.AspNetCore.Authorization;
using STrain;

namespace SpecBoard.Commands
{
	[Authorize]
	public record LogInCommand : Command
	{

	}
}
