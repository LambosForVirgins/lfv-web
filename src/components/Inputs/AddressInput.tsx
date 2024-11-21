import {
  getBalance,
  validateSolanaAddress,
} from "@/src/utils/validators/validateSolanaAddress";
import { forwardRef, useState } from "react";
import clsx from "classnames";
import { prettyAddress } from "@/src/utils/string/prettyAddress";
import { Brand } from "@/src/utils/config/Brand";
import { useWallet } from "@solana/wallet-adapter-react";

interface AddressInputProps extends Common.ComponentProps {
  label: string;
  className?: string;
  onChange?: (address: string | undefined) => void;
}

export const AddressInput = forwardRef<HTMLInputElement, AddressInputProps>(
  ({ testID, ...props }, ref) => {
    const { publicKey, connecting } = useWallet();
    const [isValid, setIsValid] = useState(false);
    const [balance, setBalance] = useState(123);

    const fetchWalletBalance = async (address: string) => {
      console.log("fetching balance");
      const balance = await getBalance(address);
      console.log(balance);
      setBalance(balance);
    };

    const handleAddressChange = (
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      console.log(event.target.value);
      if (event.target.value.length < 32) return;

      console.log(validateSolanaAddress(event.target.value));
      // event.currentTarget.setCustomValidity("Error");
      // Fetch their VIRGIN balance
      // fetchWalletBalance(event.target.value);

      props.onChange?.(event.target.value);
    };

    if (publicKey) {
      return (
        <div className="grid grid-cols-1">
          <span>{`Your Solana address`}</span>
          <span>{publicKey.toBase58()}</span>
        </div>
      );
    }

    return (
      <label htmlFor="address" className="grid grid-cols-1 content-center">
        <span>{props.label}</span>
        <input
          ref={ref}
          data-testid={testID}
          name="address"
          type="text"
          placeholder={prettyAddress(Brand.contractAddress) ?? ""}
          onChange={handleAddressChange}
          className={clsx(props.className)}
          required
        />
      </label>
    );
  }
);
