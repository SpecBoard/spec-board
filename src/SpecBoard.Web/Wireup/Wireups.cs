using STrain.CQS.NetCore;
using STrain.CQS.NetCore.Builders;
using STrain.CQS.NetCore.LigtInject;

namespace SpecBoard.Web.Wireup
{
	public static class Wireups
	{
		public static void AddDependencies(this WebApplicationBuilder builder)
		{
		}

		public static void AddCQS(this WebApplicationBuilder builder)
		{
			builder.AddCQS(builder =>
			{
				builder.AddRequestValidator()
					.UseFluentRequestValidator(builder => { });

				builder.AddRequestRouter(request =>
				{
					if (request.GetType().Namespace.StartsWith("SpecProfile")) return "specprofile";
					else return "readmodel";
				}, builder =>
				{
					builder.AddGenericHttpSender("specprofile", (options, confiugration) => confiugration.Bind("SpecProfile", options));
					builder.AddGenericHttpSender("readmodel", (options, configuration) => configuration.Bind("ReadModel", options));
				});
			});
		}

		public static void AddEventing(this WebApplicationBuilder builder)
		{
		}
	}
}
