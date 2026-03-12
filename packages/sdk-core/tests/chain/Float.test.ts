import { Float32, Float64, Float128 } from "@wireio/sdk-core/chain/Float"

describe("Float", () => {
  describe("Float64", () => {
    test("from number creates a float", () => {
      const f = Float64.from(3.14)
      expect(f).toBeInstanceOf(Float64)
    })

    test("value is approximately 3.14", () => {
      expect(Float64.from(3.14).value).toBeCloseTo(3.14)
    })

    test("equals returns true for same value", () => {
      expect(Float64.from(1.5).equals(1.5)).toBe(true)
    })

    test("equals returns false for different value", () => {
      expect(Float64.from(1.5).equals(2.5)).toBe(false)
    })

    test("from string creates correct value", () => {
      expect(Float64.from("2.5").value).toBe(2.5)
    })
  })

  describe("Float32", () => {
    test("from number creates correct value", () => {
      expect(Float32.from(1.5).value).toBe(1.5)
    })

    test("equals works correctly", () => {
      expect(Float32.from(1.5).equals(Float32.from(1.5))).toBe(true)
    })

    test("toString returns fixed precision string", () => {
      expect(Float32.from(1.5).toString()).toBe("1.5000000")
    })
  })

  describe("Float128", () => {
    test("from hex string creates a valid instance", () => {
      const hex = "00000000000000000000000000000000"
      const f = Float128.from(hex)
      expect(f).toBeInstanceOf(Float128)
    })

    test("equals works correctly", () => {
      const hex = "00000000000000000000000000000000"
      const a = Float128.from(hex)
      const b = Float128.from(hex)
      expect(a.equals(b)).toBe(true)
    })

    test("toString returns 0x prefixed hex", () => {
      const hex = "00000000000000000000000000000000"
      const f = Float128.from(hex)
      expect(f.toString()).toBe("0x" + hex)
    })
  })
})
