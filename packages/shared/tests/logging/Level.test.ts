import { Level, LevelNames, LevelThresholds } from "@wireio/shared/logging/Level"

describe("Level", () => {
  it("has correct enum values", () => {
    expect(Level.trace).toBe("trace")
    expect(Level.debug).toBe("debug")
    expect(Level.info).toBe("info")
    expect(Level.warn).toBe("warn")
    expect(Level.error).toBe("error")
    expect(Level.fatal).toBe("fatal")
  })
})

describe("LevelNames", () => {
  it("contains all level names", () => {
    expect(LevelNames).toContain("trace")
    expect(LevelNames).toContain("debug")
    expect(LevelNames).toContain("info")
    expect(LevelNames).toContain("warn")
    expect(LevelNames).toContain("error")
    expect(LevelNames).toContain("fatal")
    expect(LevelNames).toHaveLength(6)
  })
})

describe("LevelThresholds", () => {
  it("maps each level to a numeric threshold", () => {
    expect(typeof LevelThresholds["trace"]).toBe("number")
    expect(typeof LevelThresholds["debug"]).toBe("number")
    expect(typeof LevelThresholds["info"]).toBe("number")
    expect(typeof LevelThresholds["warn"]).toBe("number")
    expect(typeof LevelThresholds["error"]).toBe("number")
    expect(typeof LevelThresholds["fatal"]).toBe("number")
  })

  it("has ascending thresholds: trace < debug < info < warn < error < fatal", () => {
    expect(LevelThresholds["trace"]).toBeLessThan(LevelThresholds["debug"])
    expect(LevelThresholds["debug"]).toBeLessThan(LevelThresholds["info"])
    expect(LevelThresholds["info"]).toBeLessThan(LevelThresholds["warn"])
    expect(LevelThresholds["warn"]).toBeLessThan(LevelThresholds["error"])
    expect(LevelThresholds["error"]).toBeLessThan(LevelThresholds["fatal"])
  })
})
