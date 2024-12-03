import { useDailyGiveaway } from "@/src/state/giveaways/useDailyGiveaway";
import { ConfirmationSlider } from "../ConfirmationSlider/ConfirmationSlider";
import { useState } from "react";

export const DailyEntrySlider = ({ testID }: Common.ComponentProps) => {
  const [hasEntered, setHasEntered] = useState(false);
  const { giveaway, enterDraw } = useDailyGiveaway();

  console.log(giveaway);

  const enterDailyDraw = async (): Promise<boolean> => {
    try {
      const result = enterDraw({ address: "abc123", name: "Test" });

      console.log(JSON.stringify(result, null, " "));
      setHasEntered(false);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  if (hasEntered) {
    return null;
  }

  return (
    <ConfirmationSlider
      testID={testID}
      name={"daily"}
      label={`Slide to enter today's draw`}
      onComplete={enterDailyDraw}
    />
  );
};
