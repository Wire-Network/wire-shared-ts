import {
  assert,
  AssertError,
  setGlobalAssertOptions,
  getAssertOptions,
  DefaultAssertOptions
} from "@wireio/shared/guards/assert"

describe("assert", () => {
  afterEach(() => {
    setGlobalAssertOptions({ ...DefaultAssertOptions })
  })

  it("does not throw when test is true", () => {
    expect(() => assert(true)).not.toThrow()
  })

  it("throws AssertError when test is false", () => {
    expect(() => assert(false)).toThrow(AssertError)
  })

  it("throws with custom message", () => {
    expect(() => assert(false, "custom message")).toThrow("custom message")
  })

  it("throws the provided error directly", () => {
    const err = new Error("err")
    expect(() => assert(false, err)).toThrow(err)
  })

  it("does not throw when function returns true", () => {
    expect(() => assert(() => true)).not.toThrow()
  })

  it("throws when function returns false", () => {
    expect(() => assert(() => false)).toThrow(AssertError)
  })

  it("throws AssertError when function throws", () => {
    expect(() =>
      assert(() => {
        throw new Error("boom")
      })
    ).toThrow(AssertError)
  })
})

describe("AssertError", () => {
  it("has cause property", () => {
    const cause = new Error("original")
    const assertErr = new AssertError("wrapper", cause)
    expect(assertErr.cause).toBe(cause)
    expect(assertErr.message).toBe("wrapper")
  })

  it("cause is undefined when not provided", () => {
    const assertErr = new AssertError("no cause")
    expect(assertErr.cause).toBeUndefined()
  })
})

describe("assert.lift", () => {
  it("creates a reusable assertion function that does not throw on pass", () => {
    const assertPositive = assert.lift(
      (n: number) => n > 0,
      "must be positive"
    )
    expect(() => assertPositive(5)).not.toThrow()
  })

  it("creates a reusable assertion function that throws on fail", () => {
    const assertPositive = assert.lift(
      (n: number) => n > 0,
      "must be positive"
    )
    expect(() => assertPositive(-1)).toThrow(AssertError)
    expect(() => assertPositive(-1)).toThrow("must be positive")
  })

  it("supports message provider function", () => {
    const assertPositive = assert.lift(
      (n: number) => n > 0,
      (n: number) => `${n} is not positive`
    )
    expect(() => assertPositive(-3)).toThrow("-3 is not positive")
  })
})

describe("setGlobalAssertOptions / getAssertOptions", () => {
  afterEach(() => {
    setGlobalAssertOptions({ ...DefaultAssertOptions })
  })

  it("returns default options initially", () => {
    const options = getAssertOptions()
    expect(options.logErrorsToConsole).toBe(false)
  })

  it("updates options via setGlobalAssertOptions", () => {
    setGlobalAssertOptions({ logErrorsToConsole: true })
    const options = getAssertOptions()
    expect(options.logErrorsToConsole).toBe(true)
  })

  it("returns a copy of options", () => {
    const options1 = getAssertOptions()
    const options2 = getAssertOptions()
    expect(options1).toEqual(options2)
    expect(options1).not.toBe(options2)
  })
})
