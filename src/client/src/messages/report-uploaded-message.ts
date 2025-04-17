export interface ReportUploadedMessage {
  project: string;
  version: string;
  status: Status;
}

export enum Status {
  Pass = 'Pass',
  Fail = 'Fail',
  Skipped = 'Skipped',
}
