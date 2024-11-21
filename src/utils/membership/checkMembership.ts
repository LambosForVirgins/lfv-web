import { PublicKey, type Connection } from "@solana/web3.js";
import { Brand } from "../config/Brand";

const TOKEN_MINT_ADDRESS = Brand.contractAddress; // Replace with your token mint address

export const checkMembership = async (
  connection: Connection,
  walletAddress: string
) => {
  try {
    const publicKey = new PublicKey(walletAddress);
    const tokenMint = new PublicKey(TOKEN_MINT_ADDRESS);
    const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
      publicKey,
      {
        mint: tokenMint,
      }
    );

    if (tokenAccounts.value.length > 0) {
      return (
        tokenAccounts.value[0].account.data.parsed.info.tokenAmount.uiAmount > 0
      );
    }

    return false;
  } catch (error) {
    console.error("Error checking token ownership:", error);
    return false;
  }
};
