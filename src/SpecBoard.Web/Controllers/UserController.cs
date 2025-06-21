using Microsoft.AspNetCore.Mvc;
using SpecBoard.Commands;
using STrain;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;

namespace SpecBoard.Web.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class UserController : ControllerBase
	{
		private readonly IMvcRequestReceiver _receiver;

		public UserController(IMvcRequestReceiver receiver)
		{
			_receiver = receiver;
		}

		[HttpPost("login")]
		public async Task<IActionResult> LoginAsync(CancellationToken cancellationToken)
		{
			return await _receiver.ReceiveCommandAsync(new LogInCommand(), cancellationToken);
		}
	}
}
