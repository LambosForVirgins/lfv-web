import { useConnection } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";
import { getMarketCap } from "../utils/exchanges/getMarketCap";
import { Brand } from "../utils/config/Brand";

export const useMarketCap = () => {
  const { connection } = useConnection();
  const [marketCapDiluted, setMarketCapDiluted] = useState<number>(0);

  useEffect(() => {
    const getCap = async () => {
      const result = await getMarketCap(connection, Brand.contractAddress);

      setMarketCapDiluted(result);
    };

    getCap();
  }, []);

  return {
    marketCapDiluted,
  };
};
