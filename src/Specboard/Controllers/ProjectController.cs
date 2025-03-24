using Microsoft.AspNetCore.Mvc;
using STrain;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;

namespace Specboard.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class ProjectController : ControllerBase
	{
		private readonly IMvcRequestReceiver _receiver;

		public ProjectController(IMvcRequestReceiver receiver)
		{
			_receiver = receiver;
		}

		[HttpGet]
		public async Task<IActionResult> GetProjectsAsync(CancellationToken cancellationToken)
		{
			return await _receiver.ReceiveQueryAsync(new SpecBoard.GetProjectsQuery(), cancellationToken);
		}
	}
}
