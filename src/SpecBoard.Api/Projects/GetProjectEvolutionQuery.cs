using STrain;

namespace SpecBoard
{
	public record GetProjectEvolutionQuery : Query<IEnumerable<GetProjectEvolutionQuery.Result>>
	{
		public required string Key { get; init; }

		public record Result
		{
			public required int Id { get; init; }
			public required string Version { get; init; }
			public required int Pass { get; init; }
			public required int Fail { get; init; }
			public required int Skipped { get; init; }

		}
	}
}
