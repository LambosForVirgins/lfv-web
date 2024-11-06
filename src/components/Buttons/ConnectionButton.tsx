"use client";

import React from "react";
import { useConnect, useAccount } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";

export const ConnectionButton = ({ testID }: Common.ComponentProps) => {
  const { connect, connectors } = useConnect();
  const { isConnected, address } = useAccount();

  const handleConnect = (connector: any) => {
    connect({ connector });
  };

  return (
    <div data-testid={testID}>
      {isConnected ? (
        <p>Connected: {address}</p>
      ) : (
        <div>
          {connectors.map((connector) => (
            <button
              key={connector.id}
              onClick={() => handleConnect(connector)}
              disabled={!connector.ready}
            >
              {connector.name}
              {!connector.ready && " (unsupported)"}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
