import { TimeSpan } from '../../shared/types/time-span';

export interface ProjectSummary {
  key: string;
  version: string;
  lastReport: Date;
  pass: number;
  fail: number;
  skipped: number;
  duration: TimeSpan;
  failedScenarios: ScenarioSummary[];
}

export interface ScenarioSummary {
  id: number;
  segments: string[];
}
