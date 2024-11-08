import * as web3 from "@solana/web3.js";

type VercelEnvironment = "development" | "preview" | "production";

export const getEnvironmentEndpoint = <T extends string = VercelEnvironment>(
  environment?: T
) => {
  switch (environment) {
    case "production":
    case "preview":
      return "https://practical-multi-diamond.solana-mainnet.quiknode.pro/9b31cd9dc3d514d5e7a007861e5e5455de1b920e";
    case "development":
    default:
      return web3.clusterApiUrl("devnet");
  }
};
