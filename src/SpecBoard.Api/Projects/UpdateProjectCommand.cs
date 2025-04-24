using STrain;

namespace SpecBoard
{
	public record UpdateProjectCommand : Command
	{
		public required string Key { get; init; }
		public string? Name { get; init; }
	}
}
