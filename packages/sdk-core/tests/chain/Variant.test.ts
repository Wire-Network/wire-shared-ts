import { Variant } from "@wireio/sdk-core/chain/Variant"
import { Name } from "@wireio/sdk-core/chain/Name"
import { UInt64 } from "@wireio/sdk-core/chain/Integer"

@Variant.type("my_variant", [Name, UInt64])
class MyVariant extends Variant {
  declare value: Name | UInt64
}

describe("Variant", () => {
  describe("from", () => {
    it("creates a variant with a Name value", () => {
      const v = MyVariant.from(["name", "alice"])
      expect(v).toBeInstanceOf(MyVariant)
      expect(v.variantIdx).toBe(0)
      expect(v.value).toBeInstanceOf(Name)
      expect(String(v.value)).toBe("alice")
    })

    it("creates a variant with a UInt64 value", () => {
      const v = MyVariant.from(["uint64", 42])
      expect(v).toBeInstanceOf(MyVariant)
      expect(v.variantIdx).toBe(1)
    })
  })

  describe("equals", () => {
    it("returns true for equal variants", () => {
      const a = MyVariant.from(["name", "alice"])
      const b = MyVariant.from(["name", "alice"])
      expect(a.equals(b)).toBe(true)
    })

    it("returns false for different variant types", () => {
      const a = MyVariant.from(["name", "alice"])
      const b = MyVariant.from(["uint64", 42])
      expect(a.equals(b)).toBe(false)
    })
  })

  describe("variantName", () => {
    it("returns the name of the active variant type", () => {
      const v = MyVariant.from(["name", "alice"])
      expect(v.variantName).toBe("name")
    })
  })

  describe("decorator", () => {
    it("registers ABI name via Variant.type", () => {
      expect((MyVariant as any).abiName).toBe("my_variant")
    })

    it("registers variant types", () => {
      expect((MyVariant as any).abiVariant).toBeDefined()
      expect((MyVariant as any).abiVariant.length).toBe(2)
    })
  })
})
