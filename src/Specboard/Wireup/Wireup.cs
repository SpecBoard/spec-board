using LightInject;
using SpecBoard;
using SpecBoard.Application.Performers;
using STrain;
using STrain.CQS.NetCore;
using STrain.CQS.NetCore.Builders;
using STrain.CQS.NetCore.LigtInject;

namespace Specboard.Wireup
{
	public static class Wireup
	{
		public static void ConfigureServices(this IServiceCollection services, IConfiguration configuration)
		{

		}

		public static void ConfigureContainer(this IServiceRegistry registry)
		{

		}

		public static void ConfigureSTrain(this WebApplicationBuilder builder)
		{
			builder.AddCQS(builder =>
			{
				builder.AddPerformer<IQueryPerformer<GetProjectsQuery, IEnumerable<GetProjectsQuery.Result>>, ProjectPerformers>();
				builder.AddPerformer<IQueryPerformer<GetProjectSummaryQuery, GetProjectSummaryQuery.Result>, ProjectPerformers>();
				builder.AddPerformer<IQueryPerformer<GetProjectEvolutionQuery, IEnumerable<GetProjectEvolutionQuery.Result>>, ProjectPerformers>();

				builder.AddMvcRequestReceiver()
					.UseLogger();
				builder.AddGenericRequestHandler("api");

				builder.AddRequestValidator()
					.UseFluentRequestValidator(builder => builder.RegistrateFrom<GetProjectsQuery>());

				builder.AddRequestRouter(request => request.GetType().Namespace switch
				{
					"SpecStore" => "specstore",
					_ => throw new InvalidOperationException("Not supported request")
				}, builder => builder.AddGenericHttpSender("specstore", (options, configuration) => configuration.Bind("Services:SpecStore", options)));
			});
		}
	}
}
