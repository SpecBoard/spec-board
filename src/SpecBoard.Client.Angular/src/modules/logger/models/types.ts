export enum LogLevel {
  Verbose = 'Verbose',
  Debug = 'Debug',
  Information = 'Information',
  Warning = 'Warning',
  Error = 'Error',

  Off = 'Off',
}

export type LogLabel = Record<string, unknown>;
