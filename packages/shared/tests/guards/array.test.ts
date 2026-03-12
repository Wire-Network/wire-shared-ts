import { isArray } from "@wireio/shared/guards/array"

describe("isArray", () => {
  it("returns true for empty array", () => {
    expect(isArray([])).toBe(true)
  })

  it("returns true for array with elements", () => {
    expect(isArray([1, 2, 3])).toBe(true)
  })

  it("returns true for new Array()", () => {
    expect(isArray(new Array())).toBe(true)
  })

  it("returns false for null", () => {
    expect(isArray(null)).toBe(false)
  })

  it("returns false for undefined", () => {
    expect(isArray(undefined)).toBe(false)
  })

  it("returns false for object", () => {
    expect(isArray({})).toBe(false)
  })

  it("returns false for string", () => {
    expect(isArray("array")).toBe(false)
  })

  it("returns false for object with length property", () => {
    expect(isArray({ length: 0 })).toBe(false)
  })

  it("returns false for arguments-like object", () => {
    expect(isArray({ 0: "a", 1: "b", length: 2 })).toBe(false)
  })
})
