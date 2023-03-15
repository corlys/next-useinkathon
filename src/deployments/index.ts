import { SubstrateDeployment, shibuya } from "@scio-labs/use-inkathon"

export const getDeployments = async (): Promise<SubstrateDeployment[]> => {
  return [
    {
      contractId: "greeter",
      networkId: shibuya.network,
      abi: await import("@/contracts/greeter.json"),
      address: "aU5Px6gfgsGgrDJrP1fbecL6PgfLn15WrXkuPq2qX2To3mL"
    }
  ]
}
