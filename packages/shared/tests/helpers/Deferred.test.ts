import { Deferred, DeferredStatus } from "@wireio/shared/helpers/Deferred"

describe("Deferred", () => {
  describe("initial state", () => {
    it("starts in PENDING status", () => {
      const d = new Deferred()
      expect(d.status()).toBe(DeferredStatus.PENDING)
    })

    it("isFulfilled() is false initially", () => {
      const d = new Deferred()
      expect(d.isFulfilled()).toBe(false)
    })

    it("isRejected() is false initially", () => {
      const d = new Deferred()
      expect(d.isRejected()).toBe(false)
    })

    it("isSettled() is false initially", () => {
      const d = new Deferred()
      expect(d.isSettled()).toBe(false)
    })

    it("isCancelled() is false initially", () => {
      const d = new Deferred()
      expect(d.isCancelled()).toBe(false)
    })
  })

  describe("resolve", () => {
    it("changes status to FULFILLED", () => {
      const d = new Deferred<number>()
      d.resolve(42)
      expect(d.status()).toBe(DeferredStatus.FULFILLED)
    })

    it("sets isFulfilled() to true", () => {
      const d = new Deferred<number>()
      d.resolve(42)
      expect(d.isFulfilled()).toBe(true)
    })

    it("sets isSettled() to true", () => {
      const d = new Deferred<number>()
      d.resolve(42)
      expect(d.isSettled()).toBe(true)
    })

    it("getResult() returns the resolved value", () => {
      const d = new Deferred<number>()
      d.resolve(42)
      expect(d.getResult()).toBe(42)
    })

    it("promise resolves to the value", async () => {
      const d = new Deferred<number>()
      d.resolve(42)
      await expect(d.promise).resolves.toBe(42)
    })

    it("subsequent resolve() is a no-op", () => {
      const d = new Deferred<number>()
      d.resolve(42)
      d.resolve(99)
      expect(d.getResult()).toBe(42)
    })

    it("subsequent reject() is a no-op after resolve", () => {
      const d = new Deferred<number>()
      d.resolve(42)
      d.reject(new Error("fail"))
      expect(d.isFulfilled()).toBe(true)
      expect(d.isRejected()).toBe(false)
    })
  })

  describe("reject", () => {
    it("changes status to REJECTED", () => {
      const d = new Deferred<number>()
      const err = new Error("oops")
      d.reject(err)
      // Catch the promise to avoid unhandled rejection
      d.promise.catch(() => {})
      expect(d.status()).toBe(DeferredStatus.REJECTED)
    })

    it("sets isRejected() to true", () => {
      const d = new Deferred<number>()
      d.reject(new Error("oops"))
      d.promise.catch(() => {})
      expect(d.isRejected()).toBe(true)
    })

    it("sets isSettled() to true", () => {
      const d = new Deferred<number>()
      d.reject(new Error("oops"))
      d.promise.catch(() => {})
      expect(d.isSettled()).toBe(true)
    })

    it("getError() returns the error", () => {
      const d = new Deferred<number>()
      const err = new Error("oops")
      d.reject(err)
      d.promise.catch(() => {})
      expect(d.getError()).toBe(err)
    })

    it("promise rejects with the error", async () => {
      const d = new Deferred<number>()
      const err = new Error("oops")
      d.reject(err)
      await expect(d.promise).rejects.toBe(err)
    })
  })

  describe("cancel", () => {
    it("sets isCancelled() to true", () => {
      const d = new Deferred<number>()
      d.cancel()
      expect(d.isCancelled()).toBe(true)
    })

    it("sets isSettled() to true", () => {
      const d = new Deferred<number>()
      d.cancel()
      expect(d.isSettled()).toBe(true)
    })

    it("sets status to CANCELED", () => {
      const d = new Deferred<number>()
      d.cancel()
      expect(d.status()).toBe(DeferredStatus.CANCELED)
    })

    it("resolve() is a no-op after cancel", () => {
      const d = new Deferred<number>()
      d.cancel()
      d.resolve(42)
      expect(d.isFulfilled()).toBe(false)
    })

    it("reject() is a no-op after cancel", () => {
      const d = new Deferred<number>()
      d.cancel()
      d.reject(new Error("fail"))
      expect(d.isRejected()).toBe(false)
    })
  })

  describe("getResult() and getError() when not settled", () => {
    it("getResult() throws when not settled", () => {
      const d = new Deferred<number>()
      expect(() => d.getResult()).toThrow(
        "Deferred promise is not settled, result is not available"
      )
    })

    it("getError() throws when not settled", () => {
      const d = new Deferred<number>()
      expect(() => d.getError()).toThrow(
        "Deferred promise is not settled, result is not available"
      )
    })
  })

  describe("value and error getters", () => {
    it("value getter works same as getResult()", () => {
      const d = new Deferred<number>()
      d.resolve(42)
      expect(d.value).toBe(d.getResult())
    })

    it("error getter works same as getError()", () => {
      const d = new Deferred<number>()
      d.reject(new Error("oops"))
      d.promise.catch(() => {})
      expect(d.error).toBe(d.getError())
    })
  })

  describe("static resolve", () => {
    it("creates a pre-resolved deferred", () => {
      const d = Deferred.resolve(42)
      expect(d.isFulfilled()).toBe(true)
      expect(d.getResult()).toBe(42)
    })
  })

  describe("static delay", () => {
    beforeEach(() => {
      jest.useFakeTimers()
    })

    afterEach(() => {
      jest.useRealTimers()
    })

    it("resolves after the specified timeout", async () => {
      let resolved = false
      const p = Deferred.delay(1000).then(() => {
        resolved = true
      })

      expect(resolved).toBe(false)
      jest.advanceTimersByTime(1000)
      await p
      expect(resolved).toBe(true)
    })
  })

  describe("constructor with existing promise", () => {
    it("resolves when the provided promise resolves", async () => {
      const p = Promise.resolve(42)
      const d = new Deferred<number>(p)
      await expect(d.promise).resolves.toBe(42)
    })

    it("rejects when the provided promise rejects", async () => {
      const err = new Error("fail")
      const p = Promise.reject(err)
      const d = new Deferred<number>(p)
      await expect(d.promise).rejects.toBe(err)
    })

    it("throws when given an invalid argument", () => {
      expect(() => new Deferred("not a promise" as any)).toThrow(
        "An existing promise was provided to Deferred constructor, but it wasn't a valid promise"
      )
    })
  })
})
