using AutoBogus;
using Bogus.Extensions;
using Moq;

namespace SpecBoard.Test.Unit.Queries
{
	[Trait("Feature", "MP - Managing Projects")]
	public partial class ProjectPerformersTest
	{
		[Fact(DisplayName = "[UNIT][PRP-001] - Get Projects")]
		public async Task ProjectPerformers_PerformAsync_GetProjects()
		{
			// Arrange
			var sut = CreateSUT();
			var projects = new AutoFaker<SpecStore.GetProjectsQuery.Result>().GenerateBetween(1, 5);

			_requestSenderMock.Setup(sender => sender.SendAsync<SpecStore.GetProjectsQuery, IEnumerable<SpecStore.GetProjectsQuery.Result>>(It.IsAny<SpecStore.GetProjectsQuery>(), It.IsAny<CancellationToken>()))
				.ReturnsAsync(projects);

			// Act
			var result = await sut.PerformAsync(new AutoFaker<SpecBoard.GetProjectsQuery>().Generate(), default);

			// Assert
			Assert.Collection(result, [.. projects.Inspect()]);
		}
	}

	file static class ProjectPerformersTestExtensions
	{
		public static IEnumerable<Action<SpecBoard.GetProjectsQuery.Result>> Inspect(this IEnumerable<SpecStore.GetProjectsQuery.Result> projects)
		{
			foreach (var project in projects)
			{
				yield return p =>
				{
					Assert.Equal(project.Key, p.Key);
					Assert.Equal(project.Version, p.Version);
				};
			}
		}
	}
}
