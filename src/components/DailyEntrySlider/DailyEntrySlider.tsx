import { useDraw } from "@/src/state/submissions";
import { ConfirmationSlider } from "../ConfirmationSlider/ConfirmationSlider";

export const DailyEntrySlider = ({ testID }: Common.ComponentProps) => {
  const { draw, enterDraw } = useDraw(1);

  const enterDailyDraw = async (): Promise<boolean> => {
    try {
      const result = enterDraw({ address: "abc123", name: "Test" });

      console.log(JSON.stringify(result, null, " "));
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  return (
    <ConfirmationSlider
      testID={testID}
      name={"daily"}
      label={`Slide to enter today's draw`}
      onComplete={enterDailyDraw}
    />
  );
};
