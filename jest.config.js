module.exports = {
  preset: 'jest-expo',
  setupFilesAfterEnv: [
    '<rootDir>/common/utils/test-utils/setup.ts'
  ],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?@?react-native|@react-native-community|@react-native-firebase|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg|@tamagui/.*|tamagui|axios)'
  ],
  testMatch: [
    '**/__tests__/**/*.(ts|tsx|js)',
    '**/*.(test|spec).(ts|tsx|js)'
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1'
  },
  collectCoverageFrom: [
    '**/*.{ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!**/.expo/**',
    '!**/coverage/**',
    '!jest.config.js',
    '!babel.config.js',
    '!metro.config.js',
    '!**/__tests__/**',
    '!**/test-utils/**'
  ],
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testTimeout: 10000,
  clearMocks: true,
  resetMocks: true,
  restoreMocks: true,
  verbose: true,
  // Configurações para resolver problemas de operações assíncronas pendentes
  forceExit: true,
  detectOpenHandles: true,
  // Limitar workers para evitar problemas de concorrência
  maxWorkers: 1
}; 