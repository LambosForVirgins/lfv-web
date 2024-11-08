import * as web3 from "@solana/web3.js";

type VercelEnvironment = "development" | "preview" | "production";

export const getEnvironmentEndpoint = <T extends string = VercelEnvironment>(
  environment?: T
) => {
  switch (environment) {
    case "production":
      return web3.clusterApiUrl("mainnet-beta");
    case "preview":
      return web3.clusterApiUrl("mainnet-beta");
    case "development":
    default:
      return web3.clusterApiUrl("devnet");
  }
};
