import { Checksum256, Checksum512, Checksum160 } from "@wireio/sdk-core/chain/Checksum"
import { Bytes } from "@wireio/sdk-core/chain/Bytes"

describe("Checksum", () => {
  describe("Checksum256", () => {
    test("hash produces a valid 32-byte hash", () => {
      const hash = Checksum256.hash(Bytes.from("hello", "utf8"))
      expect(hash.array.length).toBe(32)
    })

    test("hash produces consistent output for same input", () => {
      const input = Bytes.from("hello", "utf8")
      const hash1 = Checksum256.hash(input)
      const hash2 = Checksum256.hash(input)
      expect(hash1.toString()).toBe(hash2.toString())
    })

    test("from hex string works", () => {
      const hash = Checksum256.hash(Bytes.from("test", "utf8"))
      const hexStr = hash.toString()
      const restored = Checksum256.from(hexStr)
      expect(restored.toString()).toBe(hexStr)
    })

    test("equals method works", () => {
      const input = Bytes.from("hello", "utf8")
      const hash1 = Checksum256.hash(input)
      const hash2 = Checksum256.hash(input)
      expect(hash1.equals(hash2)).toBe(true)
    })

    test("equals returns false for different hashes", () => {
      const hash1 = Checksum256.hash(Bytes.from("hello", "utf8"))
      const hash2 = Checksum256.hash(Bytes.from("world", "utf8"))
      expect(hash1.equals(hash2)).toBe(false)
    })

    test("toString returns hex string", () => {
      const hash = Checksum256.hash(Bytes.from("hello", "utf8"))
      expect(typeof hash.toString()).toBe("string")
      expect(hash.toString().length).toBe(64)
    })
  })

  describe("Checksum512", () => {
    test("hash produces a 64-byte hash", () => {
      const hash = Checksum512.hash(Bytes.from("hello", "utf8"))
      expect(hash.array.length).toBe(64)
    })

    test("toString returns hex string of correct length", () => {
      const hash = Checksum512.hash(Bytes.from("hello", "utf8"))
      expect(hash.toString().length).toBe(128)
    })
  })

  describe("Checksum160", () => {
    test("hash produces a 20-byte hash", () => {
      const hash = Checksum160.hash(Bytes.from("hello", "utf8"))
      expect(hash.array.length).toBe(20)
    })

    test("toString returns hex string of correct length", () => {
      const hash = Checksum160.hash(Bytes.from("hello", "utf8"))
      expect(hash.toString().length).toBe(40)
    })
  })
})
