using LightInject;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Specboard.Hubs;
using SpecBoard.Application.Handlers;
using SpecBoard.Application.Hubs;
using SpecBoard.Application.Performers;
using SpecStore;
using STrain;
using STrain.CQS.NetCore;
using STrain.CQS.NetCore.Builders;
using STrain.CQS.NetCore.LigtInject;
using STrain.Eventing.RabbitMQ.NetCore.Extensions;

namespace Specboard.Wireup
{
	public static class Wireup
	{
		public static void ConfigureServices(this IServiceCollection services, IConfiguration configuration)
		{
			services.AddSignalR();

			services.AddTransient<INotificationHub, NotificationService>();
		}

		public static void ConfigureContainer(this IServiceRegistry registry)
		{

		}

		public static void ConfigureSTrain(this WebApplicationBuilder builder)
		{
			builder.AddCQS(builder =>
			{
				builder.AddPerformer<IQueryPerformer<SpecBoard.GetProjectsQuery, IEnumerable<SpecBoard.GetProjectsQuery.Result>>, ProjectPerformers>();
				builder.AddPerformer<IQueryPerformer<SpecBoard.GetProjectSummaryQuery, SpecBoard.GetProjectSummaryQuery.Result>, ProjectPerformers>();
				builder.AddPerformer<IQueryPerformer<SpecBoard.GetProjectEvolutionQuery, IEnumerable<SpecBoard.GetProjectEvolutionQuery.Result>>, ProjectPerformers>();

				builder.AddMvcRequestReceiver()
					.UseLogger();
				builder.AddGenericRequestHandler("api");

				builder.AddRequestValidator()
					.UseFluentRequestValidator(builder => builder.RegistrateFrom<SpecBoard.GetProjectsQuery>());

				builder.AddRequestRouter(request => request.GetType().Namespace switch
				{
					"SpecStore" => "specstore",
					_ => throw new InvalidOperationException("Not supported request")
				}, builder => builder.AddGenericHttpSender("specstore", (options, configuration) => configuration.Bind("Services:SpecStore", options)));
			});

			builder.Services.RemoveAll<IProblemDetailsWriter>();
			builder.Services.AddExceptionHandler()
				.UseDefaultWriters();

			builder.AddEventing(builder =>
			{
				builder.AddHandler<ReportUploadedEvent, SpecStoreEventHandlers>();

				builder.AddRabbitMQ((options, configuration) => configuration.Bind("RabbitMQ", options))
					.AddConnection("receive").AddConsumer("RabbitMQ:Consumer");
			});
		}
	}
}
