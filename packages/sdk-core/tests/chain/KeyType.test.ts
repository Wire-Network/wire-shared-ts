import { KeyType } from "@wireio/sdk-core/chain/KeyType"

describe("KeyType", () => {
  test("enum values exist", () => {
    expect(KeyType.K1).toBe("K1")
    expect(KeyType.R1).toBe("R1")
    expect(KeyType.WA).toBe("WA")
    expect(KeyType.EM).toBe("EM")
    expect(KeyType.ED).toBe("ED")
  })

  test("indexFor returns correct index for K1", () => {
    expect(KeyType.indexFor(KeyType.K1)).toBe(0)
  })

  test("indexFor returns correct index for R1", () => {
    expect(KeyType.indexFor(KeyType.R1)).toBe(1)
  })

  test("indexFor returns correct index for WA", () => {
    expect(KeyType.indexFor(KeyType.WA)).toBe(2)
  })

  test("indexFor returns correct index for EM", () => {
    expect(KeyType.indexFor(KeyType.EM)).toBe(3)
  })

  test("indexFor returns correct index for ED", () => {
    expect(KeyType.indexFor(KeyType.ED)).toBe(4)
  })

  test("from number 0 returns K1", () => {
    expect(KeyType.from(0)).toBe(KeyType.K1)
  })

  test("from number 1 returns R1", () => {
    expect(KeyType.from(1)).toBe(KeyType.R1)
  })

  test("from string K1 returns K1", () => {
    expect(KeyType.from("K1")).toBe(KeyType.K1)
  })

  test("from string R1 returns R1", () => {
    expect(KeyType.from("R1")).toBe(KeyType.R1)
  })

  test("from unknown number throws", () => {
    expect(() => KeyType.from(99)).toThrow("Unknown curve type")
  })
})
