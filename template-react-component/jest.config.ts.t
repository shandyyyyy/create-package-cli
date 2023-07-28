import config from '../../jest.config'

export default {
  ...config,
  setupFilesAfterEnv: [
    'jest-expect-message',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      statements: 80,
    },
  },
  moduleNameMapper: {
    '\\.(css|less|sass|scss)(\\?.+)?$': '<rootDir>/node_modules/@exp-builder/lib.jest-helpers/moduleMappers/stub.js',
  },
}