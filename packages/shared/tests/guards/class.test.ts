import {
  isNativeClass,
  isConventionalClass,
  isClass,
  createInstanceOfGuard,
  instanceOf
} from "@wireio/shared/guards/class"

describe("isNativeClass", () => {
  it("returns true for ES6 class", () => {
    class Foo {}
    expect(isNativeClass(Foo)).toBe(true)
  })

  it("returns false for regular function", () => {
    function Foo() {}
    expect(isNativeClass(Foo)).toBe(false)
  })

  it("returns false for arrow function", () => {
    const fn = () => {}
    expect(isNativeClass(fn)).toBe(false)
  })
})

describe("isConventionalClass", () => {
  it("returns true for function with capital first letter", () => {
    function Foo() {}
    expect(isConventionalClass(Foo)).toBe(true)
  })

  it("returns false for function with lowercase first letter", () => {
    function foo() {}
    expect(isConventionalClass(foo)).toBe(false)
  })

  it("returns false for non-function", () => {
    expect(isConventionalClass("Foo")).toBe(false)
  })
})

describe("isClass", () => {
  it("returns true for native class", () => {
    class Bar {}
    expect(isClass(Bar)).toBe(true)
  })

  it("returns true for conventional class with includeConventional=true", () => {
    function Bar() {}
    expect(isClass(Bar, true)).toBe(true)
  })

  it("returns false for conventional class with includeConventional=false", () => {
    function Bar() {}
    expect(isClass(Bar, false)).toBe(false)
  })

  it("returns true for conventional class by default", () => {
    function Bar() {}
    expect(isClass(Bar)).toBe(true)
  })

  it("returns false for arrow function", () => {
    const fn = () => {}
    expect(isClass(fn)).toBe(false)
  })
})

describe("createInstanceOfGuard", () => {
  it("creates a guard that returns true for instances", () => {
    class MyClass {}
    const guard = createInstanceOfGuard(MyClass)
    expect(guard(new MyClass())).toBe(true)
  })

  it("creates a guard that returns false for non-instances", () => {
    class MyClass {}
    const guard = createInstanceOfGuard(MyClass)
    expect(guard({})).toBe(false)
  })
})

describe("instanceOf", () => {
  it("works as shorthand for createInstanceOfGuard", () => {
    class MyClass {}
    const guard = instanceOf(MyClass)
    expect(guard(new MyClass())).toBe(true)
    expect(guard({})).toBe(false)
  })
})
