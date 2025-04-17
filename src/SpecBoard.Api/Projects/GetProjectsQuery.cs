using STrain;

namespace SpecBoard
{
	public record GetProjectsQuery : Query<IEnumerable<GetProjectsQuery.Result>>
	{
		public record Result
		{
			public required string Key { get; init; }
			public string? Name { get; init; }
			public required string Version { get; init; }
			public required DateTimeOffset LastReport { get; init; }
			public required int PassCount { get; init; }
			public required int FailCount { get; init; }
			public required int SkippedCount { get; init; }
		}
	}
}
