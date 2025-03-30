using AutoBogus;
using Moq;

namespace SpecBoard.Test.Unit.Queries
{
	public partial class ProjectPerformersTest
	{
		[Trait("Feature", "PS - Project Summary")]
		[Fact(DisplayName = "[UNIT][PRQ-001] - Get Project Summary")]
		public async Task GetProjectSummaryQuery_PerformAsync_GetProjectSummary()
		{
			// Arrange
			var sut = CreateSUT();
			var summary = new AutoFaker<SpecStore.GetProjectSummaryQuery.Result>().Generate();

			_requestSenderMock.Setup(sender => sender.SendAsync<SpecStore.GetProjectSummaryQuery, SpecStore.GetProjectSummaryQuery.Result>(It.IsAny<SpecStore.GetProjectSummaryQuery>(), It.IsAny<CancellationToken>()))
				.ReturnsAsync(summary);

			// Act
			var result = await sut.PerformAsync(new AutoFaker<SpecBoard.GetProjectSummaryQuery>().RuleFor(q => q.Key, summary.Key).Generate(), default);

			// Assert
			Assert.Equal(summary.Key, result.Key);
			Assert.Equal(summary.Version, result.Version);
			Assert.Equal(summary.LastReport, result.LastReport);
			Assert.Equal(summary.Pass, result.Pass);
			Assert.Equal(summary.Fail, result.Fail);
			Assert.Equal(summary.Skipped, result.Skipped);
			Assert.Collection(result.FailedScenarios, [.. summary.FailedScenarios.Inspect()]);
		}
	}

	file static class GetProjectSummaryQueryTestExtensions
	{
		public static IEnumerable<Action<SpecBoard.GetProjectSummaryQuery.Result.ScenarioSummary>> Inspect(this IEnumerable<SpecStore.GetProjectSummaryQuery.Result.ScenarioSummary> scenarios)
		{
			foreach (var scenario in scenarios)
			{
				yield return s =>
				{
					Assert.Equal(scenario.Id, s.Id);
					Assert.Collection(s.Segments, [.. scenario.Segments.Inspect()]);
				};
			}
		}

		public static IEnumerable<Action<string>> Inspect(this IEnumerable<string> values)
		{
			foreach (var value in values)
			{
				yield return v => Assert.Equal(value, v);
			}
		}
	}
}
