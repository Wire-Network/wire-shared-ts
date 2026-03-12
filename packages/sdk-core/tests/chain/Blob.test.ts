import { Blob } from "@wireio/sdk-core/chain/Blob"

describe("Blob", () => {
  test("from base64 string creates a valid Blob", () => {
    const blob = Blob.from("aGVsbG8=")
    expect(blob).toBeInstanceOf(Blob)
    expect(blob.utf8String).toBe("hello")
  })

  test("roundtrip from -> toJSON -> from produces same result", () => {
    const original = Blob.from("aGVsbG8=")
    const json = original.toJSON()
    const restored = Blob.from(json)
    expect(restored.equals(original)).toBe(true)
  })

  test("array property returns correct bytes", () => {
    const blob = Blob.from("aGVsbG8=")
    const expected = new Uint8Array([104, 101, 108, 108, 111])
    expect(blob.array).toEqual(expected)
  })

  test("base64String returns base64 encoded string", () => {
    const blob = Blob.from("aGVsbG8=")
    expect(blob.base64String).toBe("aGVsbG8=")
  })

  test("equals returns true for same content", () => {
    const a = Blob.from("aGVsbG8=")
    const b = Blob.from("aGVsbG8=")
    expect(a.equals(b)).toBe(true)
  })

  test("equals returns false for different content", () => {
    const a = Blob.from("aGVsbG8=")
    const b = Blob.from("d29ybGQ=")
    expect(a.equals(b)).toBe(false)
  })
})
