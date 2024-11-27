import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { MemberPackageCard } from "../MemberPackageCard/MemberPackageCard";
import styles from "./MembershipSell.module.css";
import clsx from "classnames";
import { useEffect, useState } from "react";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

export const MembershipSell = ({ testID }: Common.ComponentProps) => {
  const { connection } = useConnection();
  const { wallet } = useWallet();
  const [availableBalance, setAvailableBalance] = useState(0);
  const handleClick = (amount: number) => {
    console.log(`Selected membership amount: ${amount}`);
  };

  useEffect(() => {
    const getWalletBalance = async (publicKey: PublicKey) => {
      const balance = await connection.getBalance(publicKey, "confirmed");
      setAvailableBalance(balance / LAMPORTS_PER_SOL);
    };
    if (wallet?.adapter.connected && wallet.adapter.publicKey) {
      const publicKey = wallet.adapter.publicKey;
      getWalletBalance(publicKey);
    }
  });

  return (
    <div className={clsx(styles.options, styles.frame, "col-content")}>
      <h1>Balance {Math.floor(availableBalance * 100) / 100} SOL</h1>
      <MemberPackageCard
        testID={`${testID}.membership`}
        title={"SupaChad"}
        amount={25_000}
        benefits={[
          { label: "Shop virgin only merch" },
          { label: "Access to daily giveaways" },
        ]}
        onClick={handleClick}
      />
      <MemberPackageCard
        testID={`${testID}.membership`}
        title={"MegaChad"}
        amount={350_000}
        benefits={[
          { label: "10% off virgin only merch" },
          { label: "Access to mega giveaways" },
          { label: "Entry into the Lamborghini draw" },
          { label: "10% Discount on all merchandise" },
          { label: "VIP invitations to VIRGIN events" },
        ]}
        onClick={handleClick}
        highlight
      />
      <MemberPackageCard
        testID={`${testID}.membership`}
        title={"GigaChad"}
        amount={1_000_000}
        benefits={[{ label: "25% off virgin only merch" }]}
        onClick={handleClick}
      />
    </div>
  );
};
