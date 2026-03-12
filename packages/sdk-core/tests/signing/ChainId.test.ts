import { ChainName, ChainId } from "@wireio/sdk-core/signing/ChainId"

describe("ChainId", () => {
  describe("ChainName enum", () => {
    it("has UNKNOWN value", () => {
      expect(ChainName.UNKNOWN).toBe(0)
    })

    it("has SYS value", () => {
      expect(ChainName.SYS).toBe(1)
    })

    it("has TELOS value", () => {
      expect(ChainName.TELOS).toBe(2)
    })

    it("has WAX value", () => {
      expect(ChainName.WAX).toBe(10)
    })

    it("has FIO value", () => {
      expect(ChainName.FIO).toBe(12)
    })
  })

  describe("ChainId.from", () => {
    it("creates from checksum hex string", () => {
      const id = ChainId.from(
        "aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906"
      )
      expect(id).toBeInstanceOf(ChainId)
      expect(id.hexString).toBe(
        "aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906"
      )
    })

    it("creates from ChainName alias", () => {
      const id = ChainId.from(ChainName.SYS)
      expect(id).toBeInstanceOf(ChainId)
      expect(id.hexString).toBe(
        "aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906"
      )
    })

    it("returns the same instance if already a ChainId", () => {
      const id = ChainId.from(
        "aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906"
      )
      const same = ChainId.from(id)
      expect(same).toBe(id)
    })

    it("throws for unknown chain alias", () => {
      expect(() => ChainId.from(999 as any)).toThrow("Unknown chain id alias")
    })
  })

  describe("chainName", () => {
    it("returns the correct ChainName for known chains", () => {
      const id = ChainId.from(ChainName.SYS)
      expect(id.chainName).toBe(ChainName.SYS)
    })

    it("returns UNKNOWN for unrecognized chain ids", () => {
      const id = ChainId.from(
        "0000000000000000000000000000000000000000000000000000000000000001"
      )
      expect(id.chainName).toBe(ChainName.UNKNOWN)
    })
  })
})
