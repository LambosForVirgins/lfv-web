"use client";

import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";
import { checkMembership } from "../utils/membership/checkMembership";

export const useMembership = () => {
  const { connection } = useConnection();
  const { connected, connecting, publicKey } = useWallet();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (connected && publicKey) {
      (async () => {
        const hasAccess = await checkMembership(
          connection,
          publicKey.toString()
        );
        console.log(hasAccess);
        setIsAuthorized(hasAccess);
        setLoading(false);
      })();
    } else {
      setLoading(false);
    }
  }, [connected, connection, publicKey]);

  return {
    loading: loading || connecting,
    isAuthorized,
  };
};
