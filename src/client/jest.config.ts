import type { Config } from 'jest';

const config: Config = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup.jest.ts'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/dist/', '<rootDir>/libs/'],
  coveragePathIgnorePatterns: ['<rootDir>/src/modules/logger/'],
  clearMocks: true,
};

export default config;
