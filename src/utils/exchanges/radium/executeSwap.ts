import { Connection, PublicKey, Transaction } from "@solana/web3.js";
import { Liquidity, LIQUIDITY_PROGRAM_ID_V4 } from "@raydium-io/raydium-sdk";

export const swapTokens = async (connection: Connection, amount: number) => {
  const poolKeys = await Liquidity.fetchAllPoolKeys(
    connection,
    new PublicKey("POOL_PUBLIC_KEY")
  );
  const { transaction, signers } = await Liquidity.makeSwapInstruction({
    connection,
    poolKeys,
    userKeys: {
      tokenAccounts: [], // User's token accounts
      owner: payer.publicKey,
    },
    amountIn: amount,
    minAmountOut: 1, // Minimum amount to receive
    fixedSide: "in",
    programId: LIQUIDITY_PROGRAM_ID_V4,
  });

  const tx = new Transaction().add(transaction);
  const signature = await connection.sendTransaction(tx, [payer, ...signers]);
  await connection.confirmTransaction(signature, "confirmed");
  console.log("Swap successful with signature:", signature);
};
