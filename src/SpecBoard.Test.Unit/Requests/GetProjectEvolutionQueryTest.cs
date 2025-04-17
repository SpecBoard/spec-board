using AutoBogus;
using Bogus.Extensions;
using Moq;

namespace SpecBoard.Test.Unit.Requests
{
	public partial class ProjectPerformersTest
	{
		[Trait("Feature", "PE - Project Evolution")]
		[Fact(DisplayName = "[UNIT][PEQ-001] - Get Project Evolution")]
		public async Task GetProjectEvolutionQuery_PerformAsync_GetProjectEvolution()
		{
			// Arrange
			var sut = CreateSUT();
			var evolution = new AutoFaker<SpecStore.GetProjectEvolutionQuery.Result>().GenerateBetween(1, 4);
			var query = new AutoFaker<SpecBoard.GetProjectEvolutionQuery>().Generate();

			_requestSenderMock.Setup(rs => rs.SendAsync<SpecStore.GetProjectEvolutionQuery, IEnumerable<SpecStore.GetProjectEvolutionQuery.Result>>(It.Is<SpecStore.GetProjectEvolutionQuery>(q => q.Key == query.Key), It.IsAny<CancellationToken>()))
				.ReturnsAsync(evolution);

			// Act
			var result = await sut.PerformAsync(query, default);

			// Assert
			Assert.Collection(result, [.. evolution.Inspect()]);
		}
	}

	file static class GetProjectEvolutionQueryTestExtensions
	{
		public static IEnumerable<Action<SpecBoard.GetProjectEvolutionQuery.Result>> Inspect(this IEnumerable<SpecStore.GetProjectEvolutionQuery.Result> evolutions)
		{
			foreach (var evolution in evolutions)
			{
				yield return r =>
				{
					Assert.Equal(evolution.Id, r.Id);
					Assert.Equal(evolution.Version, r.Version);
					Assert.Equal(evolution.Pass, r.Pass);
					Assert.Equal(evolution.Fail, r.Fail);
					Assert.Equal(evolution.Skipped, r.Skipped);
				};
			}
		}
	}
}
