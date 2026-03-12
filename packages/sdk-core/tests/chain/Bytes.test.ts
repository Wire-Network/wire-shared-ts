import { Bytes } from "@wireio/sdk-core/chain/Bytes"

describe("Bytes", () => {
  test("from array creates correct bytes", () => {
    const bytes = Bytes.from([1, 2, 3])
    expect(bytes.array).toEqual(new Uint8Array([1, 2, 3]))
  })

  test("from hex string creates correct bytes", () => {
    const bytes = Bytes.from("deadbeef", "hex")
    expect(bytes.array).toEqual(new Uint8Array([0xde, 0xad, 0xbe, 0xef]))
  })

  test("hexString returns correct hex", () => {
    expect(Bytes.from("deadbeef", "hex").hexString).toBe("deadbeef")
  })

  test("from utf8 string roundtrips", () => {
    expect(Bytes.from("hello", "utf8").utf8String).toBe("hello")
  })

  test("equals returns true for matching bytes", () => {
    expect(Bytes.from([1, 2]).equals(Bytes.from([1, 2]))).toBe(true)
  })

  test("equals returns false for different bytes", () => {
    expect(Bytes.from([1, 2]).equals(Bytes.from([1, 3]))).toBe(false)
  })

  test("static equal method works", () => {
    expect(Bytes.equal([1, 2, 3], [1, 2, 3])).toBe(true)
    expect(Bytes.equal([1, 2, 3], [1, 2, 4])).toBe(false)
  })

  test("random generates bytes of correct length", () => {
    expect(Bytes.random(16).length).toBe(16)
  })

  test("copy creates independent copy", () => {
    const original = Bytes.from([1, 2, 3])
    const copied = original.copy()
    copied.array[0] = 99
    expect(original.array[0]).toBe(1)
    expect(copied.array[0]).toBe(99)
  })

  test("appending concatenates bytes", () => {
    const a = Bytes.from([1, 2])
    const b = Bytes.from([3, 4])
    const result = a.appending(b)
    expect(result.array).toEqual(new Uint8Array([1, 2, 3, 4]))
  })

  test("zeropadded pads to length n", () => {
    const bytes = Bytes.from([1, 2])
    const padded = bytes.zeropadded(4)
    expect(padded.length).toBe(4)
    expect(padded.array[0]).toBe(0)
    expect(padded.array[1]).toBe(0)
    expect(padded.array[2]).toBe(1)
    expect(padded.array[3]).toBe(2)
  })

  test("droppingFirst drops first n bytes", () => {
    const bytes = Bytes.from([1, 2, 3, 4])
    const dropped = bytes.droppingFirst(2)
    expect(dropped.array).toEqual(new Uint8Array([3, 4]))
  })

  test("length returns byte count", () => {
    expect(Bytes.from([10, 20, 30]).length).toBe(3)
  })
})
