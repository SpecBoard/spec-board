export interface ProjectOverview {
  key: string;
  name?: string;
  version: string;
  lastReport: Date;
  passCount: number;
  failCount: number;
  skippedCount: number;
}
