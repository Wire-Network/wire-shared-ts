import { Base58 } from "@wireio/sdk-core/Base58"
import { Bytes } from "@wireio/sdk-core/chain/Bytes"

describe("Base58", () => {
  describe("encode", () => {
    it("encodes bytes to base58 string", () => {
      const bytes = Bytes.from([0x00, 0x01, 0x02])
      const encoded = Base58.encode(bytes)
      expect(typeof encoded).toBe("string")
      expect(encoded.length).toBeGreaterThan(0)
    })

    it("encodes [0] as '1'", () => {
      const encoded = Base58.encode(Bytes.from([0]))
      expect(encoded).toBe("1")
    })

    it("encodes [0,0] as '11'", () => {
      const encoded = Base58.encode(Bytes.from([0, 0]))
      expect(encoded).toBe("11")
    })
  })

  describe("decode", () => {
    it("decodes base58 string back to bytes", () => {
      const original = Bytes.from([0x01, 0x02, 0x03])
      const encoded = Base58.encode(original)
      const decoded = Base58.decode(encoded)
      expect(decoded.array).toEqual(original.array)
    })

    it("throws DecodingError on invalid characters", () => {
      expect(() => Base58.decode("0OIl")).toThrow(Base58.DecodingError)
      try {
        Base58.decode("0OIl")
      } catch (e) {
        expect(e).toBeInstanceOf(Base58.DecodingError)
        expect((e as Base58.DecodingError).code).toBe(
          Base58.ErrorCode.E_INVALID
        )
      }
    })
  })

  describe("roundtrip encode/decode", () => {
    it("encode(decode(x)) === x for valid base58 strings", () => {
      const original = "3mJr7AoUXx2Wqd"
      const decoded = Base58.decode(original)
      const reencoded = Base58.encode(decoded)
      expect(reencoded).toBe(original)
    })

    it("decode(encode(x)) returns original bytes", () => {
      const original = Bytes.from([10, 20, 30, 40, 50])
      const encoded = Base58.encode(original)
      const decoded = Base58.decode(encoded)
      expect(decoded.array).toEqual(original.array)
    })
  })

  describe("encodeCheck / decodeCheck", () => {
    it("roundtrips with checksum", () => {
      const original = Bytes.from([0x01, 0x02, 0x03, 0x04])
      const encoded = Base58.encodeCheck(original)
      const decoded = Base58.decodeCheck(encoded)
      expect(decoded.array).toEqual(original.array)
    })

    it("decodeCheck throws DecodingError on invalid checksum", () => {
      const original = Bytes.from([0x01, 0x02, 0x03, 0x04])
      const encoded = Base58.encodeCheck(original)
      // Tamper with the encoded string by changing a character
      const tampered =
        encoded.slice(0, -1) + (encoded.slice(-1) === "1" ? "2" : "1")
      expect(() => Base58.decodeCheck(tampered)).toThrow(Base58.DecodingError)
      try {
        Base58.decodeCheck(tampered)
      } catch (e) {
        expect((e as Base58.DecodingError).code).toBe(
          Base58.ErrorCode.E_CHECKSUM
        )
      }
    })
  })

  describe("encodeRipemd160Check / decodeRipemd160Check", () => {
    it("roundtrips with ripemd160 checksum", () => {
      const original = Bytes.from([0xab, 0xcd, 0xef, 0x01])
      const encoded = Base58.encodeRipemd160Check(original)
      const decoded = Base58.decodeRipemd160Check(encoded)
      expect(decoded.array).toEqual(original.array)
    })

    it("roundtrips with suffix", () => {
      const original = Bytes.from([0x10, 0x20, 0x30])
      const suffix = "K1"
      const encoded = Base58.encodeRipemd160Check(original, suffix)
      const decoded = Base58.decodeRipemd160Check(encoded, undefined, suffix)
      expect(decoded.array).toEqual(original.array)
    })
  })
})
