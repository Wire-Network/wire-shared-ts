import { isLogLevelKind } from "@wireio/shared/logging/util"
import { Level } from "@wireio/shared/logging/Level"

describe("isLogLevelKind", () => {
  it("returns true for 'trace'", () => {
    expect(isLogLevelKind("trace")).toBe(true)
  })

  it("returns true for 'debug'", () => {
    expect(isLogLevelKind("debug")).toBe(true)
  })

  it("returns true for 'info'", () => {
    expect(isLogLevelKind("info")).toBe(true)
  })

  it("returns true for 'warn'", () => {
    expect(isLogLevelKind("warn")).toBe(true)
  })

  it("returns true for 'error'", () => {
    expect(isLogLevelKind("error")).toBe(true)
  })

  it("returns true for 'fatal'", () => {
    expect(isLogLevelKind("fatal")).toBe(true)
  })

  it("returns true for Level enum values", () => {
    expect(isLogLevelKind(Level.trace)).toBe(true)
    expect(isLogLevelKind(Level.debug)).toBe(true)
    expect(isLogLevelKind(Level.info)).toBe(true)
    expect(isLogLevelKind(Level.warn)).toBe(true)
    expect(isLogLevelKind(Level.error)).toBe(true)
    expect(isLogLevelKind(Level.fatal)).toBe(true)
  })

  it("returns false for 'invalid'", () => {
    expect(isLogLevelKind("invalid")).toBe(false)
  })

  it("returns false for empty string", () => {
    expect(isLogLevelKind("")).toBe(false)
  })

  it("returns false for null", () => {
    expect(isLogLevelKind(null)).toBe(false)
  })

  it("returns false for undefined", () => {
    expect(isLogLevelKind(undefined)).toBe(false)
  })

  it("returns false for number", () => {
    expect(isLogLevelKind(123)).toBe(false)
  })
})
