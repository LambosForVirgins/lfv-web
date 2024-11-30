import * as web3 from "@solana/web3.js";

type VercelEnvironment = "development" | "preview" | "production";

const rpcEndpoint = process.env.NEXT_RPC_PROVIDER_URL;

export const getEnvironmentEndpoint = <T extends string = VercelEnvironment>(
  environment?: T
): string => {
  // if (!rpcEndpoint) throw new Error("Missing RPC endpoint");

  switch (environment) {
    case "production":
    case "preview":
      return rpcEndpoint || web3.clusterApiUrl("devnet");
    case "development":
    default:
      return web3.clusterApiUrl("devnet");
  }
};
