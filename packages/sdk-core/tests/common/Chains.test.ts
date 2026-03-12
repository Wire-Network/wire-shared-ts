import { Chains, ChainDefinition } from "@wireio/sdk-core/common/Chains"

describe("Chains", () => {
  describe("built-in chains", () => {
    it("TESTNET exists and is a ChainDefinition", () => {
      expect(Chains.TESTNET).toBeDefined()
      expect(Chains.TESTNET).toBeInstanceOf(ChainDefinition)
    })

    it("DEVNET exists and is a ChainDefinition", () => {
      expect(Chains.DEVNET).toBeDefined()
      expect(Chains.DEVNET).toBeInstanceOf(ChainDefinition)
    })

    it("MAINNET_CLASSIC exists and is a ChainDefinition", () => {
      expect(Chains.MAINNET_CLASSIC).toBeDefined()
      expect(Chains.MAINNET_CLASSIC).toBeInstanceOf(ChainDefinition)
    })
  })

  describe("chain properties", () => {
    it("each chain has id, name, endpoint, namespace, coreSymbol", () => {
      const chains = [Chains.TESTNET, Chains.DEVNET, Chains.MAINNET_CLASSIC]
      for (const chain of chains) {
        expect(chain.id).toBeDefined()
        expect(typeof chain.name).toBe("string")
        expect(typeof chain.endpoint).toBe("string")
        expect(typeof chain.namespace).toBe("string")
        expect(typeof chain.coreSymbol).toBe("string")
      }
    })

    it("TESTNET has expected values", () => {
      expect(Chains.TESTNET.name).toBe("Wire Testnet")
      expect(Chains.TESTNET.namespace).toBe("sysio")
      expect(Chains.TESTNET.coreSymbol).toBe("SYS")
    })

    it("MAINNET_CLASSIC has expected values", () => {
      expect(Chains.MAINNET_CLASSIC.name).toBe("Wire Classic")
      expect(Chains.MAINNET_CLASSIC.namespace).toBe("sysio")
      expect(Chains.MAINNET_CLASSIC.coreSymbol).toBe("SYS")
    })
  })

  describe("ChainDefinition.from", () => {
    it("creates from args object", () => {
      const chain = ChainDefinition.from({
        id: "0000000000000000000000000000000000000000000000000000000000000001",
        name: "Test Chain",
        endpoint: "https://example.com",
        namespace: "test",
        coreSymbol: "TST"
      })
      expect(chain).toBeInstanceOf(ChainDefinition)
      expect(chain.name).toBe("Test Chain")
      expect(chain.endpoint).toBe("https://example.com")
      expect(chain.namespace).toBe("test")
      expect(chain.coreSymbol).toBe("TST")
    })
  })

  describe("equals", () => {
    it("returns true for same chain definitions", () => {
      const a = ChainDefinition.from({
        id: "0000000000000000000000000000000000000000000000000000000000000001",
        name: "Test",
        endpoint: "https://example.com",
        namespace: "test",
        coreSymbol: "TST"
      })
      const b = ChainDefinition.from({
        id: "0000000000000000000000000000000000000000000000000000000000000001",
        name: "Test",
        endpoint: "https://example.com",
        namespace: "test",
        coreSymbol: "TST"
      })
      expect(a.equals(b)).toBe(true)
    })

    it("returns false for different endpoints", () => {
      const a = ChainDefinition.from({
        id: "0000000000000000000000000000000000000000000000000000000000000001",
        name: "Test",
        endpoint: "https://example.com",
        namespace: "test",
        coreSymbol: "TST"
      })
      const b = ChainDefinition.from({
        id: "0000000000000000000000000000000000000000000000000000000000000001",
        name: "Test",
        endpoint: "https://other.com",
        namespace: "test",
        coreSymbol: "TST"
      })
      expect(a.equals(b)).toBe(false)
    })
  })
})
