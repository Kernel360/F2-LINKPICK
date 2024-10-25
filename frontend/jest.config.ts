import type { Config } from 'jest';

// 기본 Jest 설정
const config: Config = {
  // transform을 비활성화하거나 ESM을 내보내도록 구성합니다.
  transform: {
    '^.+\\.tsx?$': 'ts-jest', // TypeScript 파일 변환
  },
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/techpick/**/*.(test|spec).[jt]s?(x)'],
  extensionsToTreatAsEsm: ['.ts', '.tsx'], // ESM으로 취급할 파일 확장자
  moduleNameMapper: {
    // 경로 별칭에 대한 매핑 설정 (필요시)
    '^@/(.*)$': '<rootDir>/techpick/$1',
  },
};

// Jest 설정을 내보냅니다.
export default config;
