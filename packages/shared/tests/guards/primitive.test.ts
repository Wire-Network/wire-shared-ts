import {
  isNil,
  isDefined,
  isObject,
  isPromise,
  isObjectType,
  isString,
  isNumber,
  isFunction,
  isSymbol,
  isBoolean,
  isDate,
  isPrimitive,
  isPrimitiveProducer
} from "@wireio/shared/guards/primitive"

describe("isNil", () => {
  it("returns true for null", () => {
    expect(isNil(null)).toBe(true)
  })

  it("returns true for undefined", () => {
    expect(isNil(undefined)).toBe(true)
  })

  it("returns false for 0", () => {
    expect(isNil(0)).toBe(false)
  })

  it("returns false for empty string", () => {
    expect(isNil("")).toBe(false)
  })

  it("returns false for false", () => {
    expect(isNil(false)).toBe(false)
  })

  it("returns false for empty object", () => {
    expect(isNil({})).toBe(false)
  })

  it("returns false for empty array", () => {
    expect(isNil([])).toBe(false)
  })
})

describe("isDefined", () => {
  it("returns false for null", () => {
    expect(isDefined(null)).toBe(false)
  })

  it("returns false for undefined", () => {
    expect(isDefined(undefined)).toBe(false)
  })

  it("returns true for 0", () => {
    expect(isDefined(0)).toBe(true)
  })

  it("returns true for empty string", () => {
    expect(isDefined("")).toBe(true)
  })

  it("returns true for false", () => {
    expect(isDefined(false)).toBe(true)
  })

  it("returns true for empty object", () => {
    expect(isDefined({})).toBe(true)
  })

  it("returns true for empty array", () => {
    expect(isDefined([])).toBe(true)
  })
})

describe("isObject", () => {
  it("returns true for plain object", () => {
    expect(isObject({})).toBe(true)
  })

  it("returns true for array", () => {
    expect(isObject([])).toBe(true)
  })

  it("returns true for Date", () => {
    expect(isObject(new Date())).toBe(true)
  })

  it("returns false for null", () => {
    expect(isObject(null)).toBe(false)
  })

  it("returns false for undefined", () => {
    expect(isObject(undefined)).toBe(false)
  })

  it("returns false for string", () => {
    expect(isObject("string")).toBe(false)
  })

  it("returns false for number", () => {
    expect(isObject(123)).toBe(false)
  })
})

describe("isPromise", () => {
  it("returns true for Promise.resolve()", () => {
    expect(isPromise(Promise.resolve())).toBe(true)
  })

  it("returns true for new Promise", () => {
    expect(isPromise(new Promise(() => {}))).toBe(true)
  })

  it("returns true for thenable object", () => {
    expect(isPromise({ then: () => {} })).toBe(true)
  })

  it("returns false for plain object", () => {
    expect(isPromise({})).toBe(false)
  })

  it("returns false for null", () => {
    expect(isPromise(null)).toBe(false)
  })
})

describe("isObjectType", () => {
  it("returns true for matching type", () => {
    expect(isObjectType(new Date(), Date)).toBe(true)
  })

  it("returns false for non-matching type", () => {
    expect(isObjectType("hello", Date)).toBe(false)
  })

  it("returns false for null", () => {
    expect(isObjectType(null, Date)).toBe(false)
  })
})

describe("isString", () => {
  it("returns true for hello", () => {
    expect(isString("hello")).toBe(true)
  })

  it("returns true for empty string", () => {
    expect(isString("")).toBe(true)
  })

  it("returns false for null", () => {
    expect(isString(null)).toBe(false)
  })

  it("returns false for number", () => {
    expect(isString(123)).toBe(false)
  })

  it("returns false for undefined", () => {
    expect(isString(undefined)).toBe(false)
  })
})

describe("isNumber", () => {
  it("returns true for 0", () => {
    expect(isNumber(0)).toBe(true)
  })

  it("returns true for 1", () => {
    expect(isNumber(1)).toBe(true)
  })

  it("returns true for -1", () => {
    expect(isNumber(-1)).toBe(true)
  })

  it("returns true for 1.5", () => {
    expect(isNumber(1.5)).toBe(true)
  })

  it("returns false for NaN", () => {
    expect(isNumber(NaN)).toBe(false)
  })

  it("returns false for null", () => {
    expect(isNumber(null)).toBe(false)
  })

  it("returns false for string number", () => {
    expect(isNumber("1")).toBe(false)
  })

  it("returns false for undefined", () => {
    expect(isNumber(undefined)).toBe(false)
  })
})

describe("isFunction", () => {
  it("returns true for arrow function", () => {
    expect(isFunction(() => {})).toBe(true)
  })

  it("returns true for function expression", () => {
    expect(
      isFunction(function () {})
    ).toBe(true)
  })

  it("returns true for class", () => {
    expect(isFunction(class Foo {})).toBe(true)
  })

  it("returns false for null", () => {
    expect(isFunction(null)).toBe(false)
  })

  it("returns false for object", () => {
    expect(isFunction({})).toBe(false)
  })
})

describe("isSymbol", () => {
  it("returns true for Symbol", () => {
    expect(isSymbol(Symbol("test"))).toBe(true)
  })

  it("returns false for string", () => {
    expect(isSymbol("symbol")).toBe(false)
  })

  it("returns false for null", () => {
    expect(isSymbol(null)).toBe(false)
  })
})

describe("isBoolean", () => {
  it("returns true for true", () => {
    expect(isBoolean(true)).toBe(true)
  })

  it("returns true for false", () => {
    expect(isBoolean(false)).toBe(true)
  })

  it("returns false for 0", () => {
    expect(isBoolean(0)).toBe(false)
  })

  it("returns false for 1", () => {
    expect(isBoolean(1)).toBe(false)
  })

  it("returns false for null", () => {
    expect(isBoolean(null)).toBe(false)
  })

  it("returns false for string true", () => {
    expect(isBoolean("true")).toBe(false)
  })
})

describe("isDate", () => {
  it("returns true for new Date()", () => {
    expect(isDate(new Date())).toBe(true)
  })

  it("returns false for Date.now()", () => {
    expect(isDate(Date.now())).toBe(false)
  })

  it("returns false for date string", () => {
    expect(isDate("2024-01-01")).toBe(false)
  })
})

describe("isPrimitive", () => {
  it("returns true for boolean", () => {
    expect(isPrimitive(true)).toBe(true)
  })

  it("returns true for string", () => {
    expect(isPrimitive("hello")).toBe(true)
  })

  it("returns true for number", () => {
    expect(isPrimitive(42)).toBe(true)
  })

  it("returns false for object", () => {
    expect(isPrimitive({})).toBe(false)
  })

  it("returns false for array", () => {
    expect(isPrimitive([])).toBe(false)
  })

  it("returns false for null", () => {
    expect(isPrimitive(null)).toBe(false)
  })
})

describe("isPrimitiveProducer", () => {
  it("returns true for String constructor", () => {
    expect(isPrimitiveProducer(String)).toBe(true)
  })

  it("returns true for Number constructor", () => {
    expect(isPrimitiveProducer(Number)).toBe(true)
  })

  it("returns true for Boolean constructor", () => {
    expect(isPrimitiveProducer(Boolean)).toBe(true)
  })

  it("returns false for a regular function", () => {
    expect(isPrimitiveProducer(() => "hello")).toBe(false)
  })
})
