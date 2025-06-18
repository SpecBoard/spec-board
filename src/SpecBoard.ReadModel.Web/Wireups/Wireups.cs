using STrain.CQS.NetCore;
using STrain.CQS.NetCore.Builders;
using STrain.Eventing.KurrentDB.NetCore.Extensions;
using STrain.Eventing.NetCore.Builders;

namespace SpecBoard.ReadModel.Web.Wireups
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
				builder.AddGenericRequestHandler();
				builder.AddMvcRequestReceiver();

				builder.AddRequestValidator()
					.UseFluentRequestValidator(builder => { });
			});
		}

		public static void AddEventing(this WebApplicationBuilder builder)
		{
			builder.AddEventing(builder =>
			{
				builder.AddKurrentDB((options, configuration) => configuration.Bind("KurrentDB", options))
					.Consume("$ce-profile")
						.AutoStateManagement()
						.AddGenericUnwrapper();
			});
		}
	}
}
