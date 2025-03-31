export interface ProjectOverview {
  key: string;
  version: string;
  lastReport: Date;
  passCount: number;
  failCount: number;
  skippedCount: number;
}
