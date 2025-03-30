export interface ProjectSummary {
  key: string;
  version: string;
  lastReport: Date;
  pass: number;
  fail: number;
  skipped: number;
  failedScenarios: ScenarioSummary[];
}

export interface ScenarioSummary {
  id: number;
  segments: string[];
}
