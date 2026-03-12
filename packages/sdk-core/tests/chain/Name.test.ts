import { Name } from "@wireio/sdk-core/chain/Name"
import { UInt64 } from "@wireio/sdk-core/chain/Integer"

describe("Name", () => {
  test("Name.from creates a valid name", () => {
    const name = Name.from("sysio")
    expect(name).toBeInstanceOf(Name)
  })

  test("toString returns the name string", () => {
    expect(Name.from("sysio").toString()).toBe("sysio")
  })

  test("equals returns true for matching string", () => {
    expect(Name.from("sysio").equals("sysio")).toBe(true)
  })

  test("equals returns true for matching Name instance", () => {
    expect(Name.from("sysio").equals(Name.from("sysio"))).toBe(true)
  })

  test("equals returns false for different name", () => {
    expect(Name.from("sysio").equals("other")).toBe(false)
  })

  test("empty name has empty toString", () => {
    const name = Name.from("")
    expect(name.toString()).toBe("")
  })

  test("valid name patterns", () => {
    expect(Name.from("a").toString()).toBe("a")
    expect(Name.from("abcde12345").toString()).toBe("abcde12345")
    expect(Name.from("a.b.c").toString()).toBe("a.b.c")
  })

  test("Name.from with UInt64 numeric value", () => {
    const original = Name.from("sysio")
    const fromUint = Name.from(original.value)
    expect(fromUint.toString()).toBe("sysio")
  })

  test("Name.from with UInt64.from(0) creates empty name", () => {
    const name = Name.from(UInt64.from(0))
    expect(name.toString()).toBe("")
  })
})
