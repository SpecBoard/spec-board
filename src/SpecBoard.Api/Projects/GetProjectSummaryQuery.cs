using STrain;

namespace SpecBoard
{
	public record GetProjectSummaryQuery : Query<GetProjectSummaryQuery.Result>
	{
		public required string Key { get; init; }
		public record Result
		{
			public required string Key { get; init; }
			public required string Version { get; init; }
			public required DateTimeOffset LastReport { get; init; }
			public required int Pass { get; init; }
			public required int Fail { get; init; }
			public required int Skipped { get; init; }
			public IEnumerable<ScenarioSummary> FailedScenarios { get; init; } = [];

			public record ScenarioSummary
			{
				public required int Id { get; init; }
				public required IEnumerable<string> Segments { get; init; } = [];
			}
		}
	}
}
