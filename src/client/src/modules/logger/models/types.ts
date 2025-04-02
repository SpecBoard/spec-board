export enum LogLevel {
  Verbose = 0,
  Debug = 1,
  Information = 2,
  Warning = 3,
  Error = 4,

  Off = 5,
}

export type LogLabel = Record<string, unknown>;
