import { type NextRequest, NextResponse } from "next/server";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import BigNumber from "bignumber.js";
import {
  encodeURL,
  createQR,
  type TransferRequestURLFields,
} from "@solana/pay";

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();
    const { recipient, amount, reference, label, message } = body;

    if (!recipient || !amount) {
      return NextResponse.json(
        { error: "Recipient and amount are required" },
        { status: 400 }
      );
    }

    const recipientPublicKey = new PublicKey(recipient);

    const amountInSOL = parseFloat(amount);
    if (isNaN(amountInSOL) || amountInSOL <= 0) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    }

    const paymentParams: TransferRequestURLFields = {
      recipient: recipientPublicKey,
      amount: BigNumber(amountInSOL * LAMPORTS_PER_SOL),
      reference: reference ? new PublicKey(reference) : undefined,
      label: label || "Your Payment Label",
      message: message || "Thanks for your payment",
    };

    const paymentURL = encodeURL(paymentParams);
    const qrCode = createQR(paymentURL); // TODO: Maybe do client side

    return NextResponse.json({
      paymentURL,
      qrCodeURL: qrCode._canvas?.toDataURL(),
    });
  } catch (error) {
    console.error("Error generating payment URL:", error);
    return NextResponse.json(
      { error: "Failed to generate payment URL" },
      { status: 500 }
    );
  }
}
