import type { Config } from "jest"

const config: Config = {
  displayName: "shared",
  testEnvironment: "node",
  roots: ["<rootDir>/tests"],
  testMatch: ["**/*.test.ts"],
  transform: {
    "^.+\\.ts$": [
      "ts-jest",
      {
        tsconfig: "<rootDir>/../../etc/tsconfig/tsconfig.base.jest.json",
      },
    ],
  },
  moduleNameMapper: {
    "^@wireio/shared$": "<rootDir>/src/index",
    "^@wireio/shared/(.*)$": "<rootDir>/src/$1",
    "^(\\.\\.?/.*)\\.js$": "$1",
  },
}

export default config
