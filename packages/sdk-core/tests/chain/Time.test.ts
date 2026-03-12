import { TimePoint, TimePointSec, BlockTimestamp } from "@wireio/sdk-core/chain/Time"

describe("Time", () => {
  describe("TimePointSec", () => {
    test("from ISO string creates a valid instance", () => {
      const tp = TimePointSec.from("2024-01-01T00:00:00")
      expect(tp).toBeInstanceOf(TimePointSec)
    })

    test("toDate roundtrips from ISO string", () => {
      const tp = TimePointSec.from("2024-01-01T00:00:00")
      const date = tp.toDate()
      expect(date.toISOString()).toBe("2024-01-01T00:00:00.000Z")
    })

    test("toMilliseconds returns correct ms", () => {
      const tp = TimePointSec.from("2024-01-01T00:00:00")
      const expected = Date.parse("2024-01-01T00:00:00Z")
      expect(tp.toMilliseconds()).toBe(expected)
    })

    test("toString returns ISO string without milliseconds", () => {
      const tp = TimePointSec.from("2024-01-01T00:00:00")
      expect(tp.toString()).toBe("2024-01-01T00:00:00")
    })

    test("equals method works correctly", () => {
      const tp1 = TimePointSec.from("2024-01-01T00:00:00")
      const tp2 = TimePointSec.from("2024-01-01T00:00:00")
      expect(tp1.equals(tp2)).toBe(true)
    })

    test("equals returns false for different times", () => {
      const tp1 = TimePointSec.from("2024-01-01T00:00:00")
      const tp2 = TimePointSec.from("2024-06-15T12:00:00")
      expect(tp1.equals(tp2)).toBe(false)
    })
  })

  describe("TimePoint", () => {
    test("fromMilliseconds roundtrips", () => {
      const tp = TimePoint.fromMilliseconds(1000)
      expect(tp.toMilliseconds()).toBe(1000)
    })

    test("fromMilliseconds with larger value", () => {
      const ms = 1704067200000
      const tp = TimePoint.fromMilliseconds(ms)
      expect(tp.toMilliseconds()).toBe(ms)
    })
  })

  describe("BlockTimestamp", () => {
    test("from string creates a valid instance", () => {
      const bt = BlockTimestamp.from("2024-01-01T00:00:00")
      expect(bt).toBeInstanceOf(BlockTimestamp)
    })

    test("roundtrips through toDate", () => {
      const bt = BlockTimestamp.from("2024-01-01T00:00:00")
      const date = bt.toDate()
      expect(date.getUTCFullYear()).toBe(2024)
      expect(date.getUTCMonth()).toBe(0)
      expect(date.getUTCDate()).toBe(1)
    })

    test("equals method works correctly", () => {
      const bt1 = BlockTimestamp.from("2024-01-01T00:00:00")
      const bt2 = BlockTimestamp.from("2024-01-01T00:00:00")
      expect(bt1.equals(bt2)).toBe(true)
    })
  })
})
