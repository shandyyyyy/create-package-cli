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
}
