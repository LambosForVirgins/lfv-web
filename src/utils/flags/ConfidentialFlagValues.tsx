import { encrypt, FlagValuesType } from "@vercel/flags";
import { FlagValues } from "@vercel/flags/react";

export const ConfidentialFlagValues = async ({
  values,
}: {
  values: FlagValuesType;
}) => {
  const encryptedFlagValues = await encrypt(values);
  return <FlagValues values={encryptedFlagValues} />;
};
