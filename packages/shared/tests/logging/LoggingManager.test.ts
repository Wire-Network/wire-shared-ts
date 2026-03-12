import { LoggingManager } from "@wireio/shared/logging/LoggingManager"
import { Level, LevelThresholds } from "@wireio/shared/logging/Level"
import { Logger } from "@wireio/shared/logging/Logger"
import type { LogRecord } from "@wireio/shared/logging/LogRecord"

describe("LoggingManager", () => {
  let manager: LoggingManager

  beforeEach(() => {
    manager = LoggingManager.get()
    manager.setRootLevel(Level.info)
    manager.setAppenders()
    manager.clearThresholdOverrides()
  })

  describe("singleton", () => {
    it("LoggingManager.get() returns the same instance on repeated calls", () => {
      const a = LoggingManager.get()
      const b = LoggingManager.get()
      expect(a).toBe(b)
    })
  })

  describe("setRootLevel", () => {
    it("changes rootLevel", () => {
      manager.setRootLevel(Level.warn)
      expect(manager.rootLevel).toBe(Level.warn)
    })

    it("changes rootThreshold accordingly", () => {
      manager.setRootLevel(Level.error)
      expect(manager.rootThreshold).toBe(LevelThresholds["error"])
    })
  })

  describe("setAppenders", () => {
    it("replaces existing appenders", () => {
      const records: LogRecord[] = []
      const appenderA = { append: () => {} }
      const appenderB = {
        append: (record: LogRecord) => {
          records.push(record)
        }
      }
      manager.setAppenders(appenderA)
      manager.setAppenders(appenderB)
      expect(manager.appenders).toContain(appenderB)
      expect(manager.appenders).not.toContain(appenderA)
    })
  })

  describe("addAppenders", () => {
    it("adds to existing appenders", () => {
      const appenderA = { append: () => {} }
      const appenderB = { append: () => {} }
      manager.setAppenders(appenderA)
      manager.addAppenders(appenderB)
      expect(manager.appenders).toContain(appenderA)
      expect(manager.appenders).toContain(appenderB)
    })
  })

  describe("setThresholdOverrides", () => {
    it("sets category-specific overrides", () => {
      manager.setThresholdOverrides(["myCategory", Level.debug])
      expect(manager.thresholdOverrides).toHaveLength(1)
      expect(manager.thresholdOverrides[0]).toEqual(["myCategory", Level.debug])
    })
  })

  describe("determineThresholdOverride", () => {
    it("matches string category against overrides", () => {
      manager.setThresholdOverrides(["myCategory", Level.debug])
      const threshold = manager.determineThresholdOverride("myCategory")
      expect(threshold).toBe(LevelThresholds["debug"])
    })

    it("matches regex category against overrides", () => {
      manager.setThresholdOverrides([/^my.*/, Level.trace])
      const threshold = manager.determineThresholdOverride("myCategory")
      expect(threshold).toBe(LevelThresholds["trace"])
    })

    it("returns null when no override matches", () => {
      manager.setThresholdOverrides(["other", Level.debug])
      const threshold = manager.determineThresholdOverride("noMatch")
      expect(threshold).toBeNull()
    })
  })

  describe("getLogger", () => {
    it("returns a Logger instance", () => {
      const logger = manager.getLogger("testCategory")
      expect(logger).toBeInstanceOf(Logger)
    })

    it("returns the correct category", () => {
      const logger = manager.getLogger("testCategory")
      expect(logger.category).toBe("testCategory")
    })

    it("caches loggers by category", () => {
      const logger1 = manager.getLogger("cachedCategory")
      const logger2 = manager.getLogger("cachedCategory")
      expect(logger1).toBe(logger2)
    })
  })

  describe("fire", () => {
    it("sends record to all appenders", () => {
      const recordsA: LogRecord[] = []
      const recordsB: LogRecord[] = []
      const appenderA = {
        append: (record: LogRecord) => {
          recordsA.push(record)
        }
      }
      const appenderB = {
        append: (record: LogRecord) => {
          recordsB.push(record)
        }
      }
      manager.setAppenders(appenderA, appenderB)

      const record: LogRecord = {
        timestamp: Date.now(),
        category: "test",
        level: Level.info,
        message: "hello"
      }
      manager.fire(record)

      expect(recordsA).toHaveLength(1)
      expect(recordsA[0].message).toBe("hello")
      expect(recordsB).toHaveLength(1)
      expect(recordsB[0].message).toBe("hello")
    })
  })
})
