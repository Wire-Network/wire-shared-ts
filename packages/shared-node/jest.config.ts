import type { Config } from "jest"

const config: Config = {
  displayName: "shared-node",
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
    "^@wireio/shared-node$": "<rootDir>/src/index",
    "^@wireio/shared-node/(.*)$": "<rootDir>/src/$1",
    "^@wireio/shared$": "<rootDir>/../shared/src",
    "^@wireio/shared/(.*)$": "<rootDir>/../shared/src/$1",
  },
}

export default config
