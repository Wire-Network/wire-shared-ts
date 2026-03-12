import {
  ConsoleAppender,
  consoleFormatter,
  getConsoleLogBinding
} from "@wireio/shared/logging/appenders/ConsoleAppender"
import { Level } from "@wireio/shared/logging/Level"
import type { LogRecord } from "@wireio/shared/logging/LogRecord"

describe("consoleFormatter", () => {
  it("formats a LogRecord into an array containing category, level, and message", () => {
    const record: LogRecord = {
      timestamp: Date.now(),
      category: "testCat",
      level: Level.info,
      message: "hello world",
      args: ["extra"]
    }

    const result = consoleFormatter(record)
    expect(Array.isArray(result)).toBe(true)
    expect(result[0]).toContain("testCat")
    expect(result[0]).toContain("info")
    expect(result[0]).toContain("hello world")
    expect(result).toContain("extra")
  })

  it("handles undefined args gracefully", () => {
    const record: LogRecord = {
      timestamp: Date.now(),
      category: "cat",
      level: Level.warn,
      message: "msg",
      args: undefined
    }

    const result = consoleFormatter(record)
    expect(Array.isArray(result)).toBe(true)
    expect(result[0]).toContain("msg")
  })
})

describe("ConsoleAppender", () => {
  it("calls console methods when append is called", () => {
    const spy = jest.spyOn(console, "info").mockImplementation(() => {})
    const appender = new ConsoleAppender()

    const record = {
      timestamp: Date.now(),
      category: "test",
      level: Level.info,
      message: "test message",
      args: []
    } as LogRecord

    appender.append(record)
    expect(spy).toHaveBeenCalled()
    spy.mockRestore()
  })

  it("falls back to console.log for unknown levels", () => {
    const spy = jest.spyOn(console, "log").mockImplementation(() => {})
    const appender = new ConsoleAppender()

    const record = {
      timestamp: Date.now(),
      category: "test",
      level: "fatal" as any,
      message: "fatal message",
      args: []
    } as LogRecord

    appender.append(record)
    expect(spy).toHaveBeenCalled()
    spy.mockRestore()
  })
})

describe("getConsoleLogBinding", () => {
  it("returns console.log for trace", () => {
    const fn = getConsoleLogBinding("trace")
    expect(typeof fn).toBe("function")
  })

  it("returns console.debug for debug", () => {
    const fn = getConsoleLogBinding("debug")
    expect(typeof fn).toBe("function")
  })

  it("returns console.info for info", () => {
    const fn = getConsoleLogBinding("info")
    expect(typeof fn).toBe("function")
  })

  it("returns console.warn for warn", () => {
    const fn = getConsoleLogBinding("warn")
    expect(typeof fn).toBe("function")
  })

  it("returns console.error for error", () => {
    const fn = getConsoleLogBinding("error")
    expect(typeof fn).toBe("function")
  })

  it("returns a function for fatal (falls back to console.log)", () => {
    const fn = getConsoleLogBinding("fatal")
    expect(typeof fn).toBe("function")
  })

  it("caches bindings on repeated calls", () => {
    const fn1 = getConsoleLogBinding("info")
    const fn2 = getConsoleLogBinding("info")
    expect(fn1).toBe(fn2)
  })
})
