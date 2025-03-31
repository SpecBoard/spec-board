using Microsoft.Extensions.Logging;
using STrain;

namespace SpecBoard.Application.Performers
{
	public class ProjectPerformers : IQueryPerformer<SpecBoard.GetProjectsQuery, IEnumerable<SpecBoard.GetProjectsQuery.Result>>,
		IQueryPerformer<SpecBoard.GetProjectSummaryQuery, SpecBoard.GetProjectSummaryQuery.Result>,
		IQueryPerformer<SpecBoard.GetProjectEvolutionQuery, IEnumerable<SpecBoard.GetProjectEvolutionQuery.Result>>
	{
		private readonly IRequestSender _sender;

		private readonly ILogger<ProjectPerformers> _logger;

		public ProjectPerformers(IRequestSender sender, ILogger<ProjectPerformers> logger)
		{
			_sender = sender;
			_logger = logger;
		}

		public async Task<IEnumerable<SpecBoard.GetProjectsQuery.Result>> PerformAsync(SpecBoard.GetProjectsQuery query, CancellationToken cancellationToken)
		{
			_logger.LogDebug("Querying projects");
			var projects = await _sender.GetAsync<SpecStore.GetProjectsQuery, IEnumerable<SpecStore.GetProjectsQuery.Result>>(new SpecStore.GetProjectsQuery(), cancellationToken);

			_logger.LogInformation("Queried {Count} projects", projects!.Count());
			_logger.LogTrace("Projects: {@Projects}", projects);

			return projects!.Map();
		}

		public async Task<GetProjectSummaryQuery.Result> PerformAsync(GetProjectSummaryQuery query, CancellationToken cancellationToken)
		{
			_logger.LogDebug("Querying summary of {Project} project", query.Key);
			var summary = await _sender.GetAsync<SpecStore.GetProjectSummaryQuery, SpecStore.GetProjectSummaryQuery.Result>(new SpecStore.GetProjectSummaryQuery(query.Key), cancellationToken);

			_logger.LogInformation("Queried summary of {Project} project", summary!.Key);
			_logger.LogTrace("Summary: {@Summary}", summary);

			return new GetProjectSummaryQuery.Result
			{
				Key = summary.Key,
				Version = summary.Version,
				LastReport = summary.LastReport,
				Pass = summary.Pass,
				Fail = summary.Fail,
				Skipped = summary.Skipped,
				Duration = summary.Duration,
				FailedScenarios = [.. summary.FailedScenarios.Select(fs => new GetProjectSummaryQuery.Result.ScenarioSummary { Id = fs.Id, Segments = fs.Segments })],
			};
		}

		public async Task<IEnumerable<GetProjectEvolutionQuery.Result>> PerformAsync(GetProjectEvolutionQuery query, CancellationToken cancellationToken)
		{
			_logger.LogDebug("Querying evolution of {Project} project", query.Key);
			var evolution = await _sender.GetAsync<SpecStore.GetProjectEvolutionQuery, IEnumerable<SpecStore.GetProjectEvolutionQuery.Result>>(new SpecStore.GetProjectEvolutionQuery(query.Key), cancellationToken);

			_logger.LogInformation("Queried evolution of {Project} project", query.Key);
			_logger.LogTrace("Evolution: {@Evolution}", evolution);

			return evolution!.Select(e => new GetProjectEvolutionQuery.Result
			{
				Id = e.Id,
				Version = e.Version,
				Pass = e.Pass,
				Fail = e.Fail,
				Skipped = e.Skipped
			});
		}
	}

	file static class ProjectPerformersExtensions
	{
		public static IEnumerable<SpecBoard.GetProjectsQuery.Result> Map(this IEnumerable<SpecStore.GetProjectsQuery.Result> projects)
		{
			return projects.Select(p => new GetProjectsQuery.Result
			{
				Key = p.Key,
				Version = p.Version,
				LastReport = p.LastReport,
				PassCount = p.PassCount,
				FailCount = p.FailCount,
				SkippedCount = p.SkippedCount
			});
		}
	}
}
