using SpecBoard.Application.Contexts;
using System.Security.Claims;

namespace SpecBoard.Web.Middlewares
{
	public interface IUserContext : IUserAccessor
	{
		ClaimsPrincipal? Claims { set; }
	}


	public class UserContext : IUserContext
	{
		private ClaimsPrincipal? _claims;
		public ClaimsPrincipal? Claims { set { _claims = value; } }

		public string User => _claims?.FindFirstValue(ClaimTypes.Name) ?? throw new UnauthorizedAccessException();


	}

	public class UserContextMiddleware : IMiddleware
	{
		private readonly IUserContext _context;

		public UserContextMiddleware(IUserContext context)
		{
			_context = context;
		}

		public async Task InvokeAsync(HttpContext context, RequestDelegate next)
		{
			_context.Claims = context.User;

			await next(context);
		}
	}
}
