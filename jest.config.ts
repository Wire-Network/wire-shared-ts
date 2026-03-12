import type { Config } from "jest"

const config: Config = {
  projects: [
    "packages/shared",
    "packages/shared-node",
    "packages/shared-web",
    "packages/sdk-core",
  ],
}

export default config
