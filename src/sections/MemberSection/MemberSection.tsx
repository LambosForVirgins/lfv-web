"use client";

import { BoostButton } from "@/src/components/Buttons/BoostButton";
import { DrawSimulator } from "@/src/components/Draws/DrawSimulator";
import { EntrySlider } from "@/src/components/EntrySlider/EntrySlider";
import { useMarketCap } from "@/src/state/marketCap";
import { useDraw, useRollDraw } from "@/src/state/submissions";

export const MemberSection = ({ testID }: Common.ComponentProps) => {
  // const t = useTranslations("Members");
  const { draw: currentDraw, enterDraw } = useDraw();
  const { roll } = useRollDraw();

  const enterDailyDraw = async (): Promise<boolean> => {
    try {
      const result = enterDraw(1, { address: "abc123", name: "Test" });

      console.log(JSON.stringify(result, null, " "));
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  return (
    <section data-testid={testID} className="col-content p-5">
      <div>
        <h1>GigChad</h1>
        <div>Progress indicator until next level</div>
      </div>

      <BoostButton label="boost" progress={30} />

      <div className="grid gap-9">
        <h2 className="text-2xl">Win 1000 to 10,000 VIRGIN every day!</h2>
        <h3 className="text-xl">
          Test your virginity with our daily virgin rewards
        </h3>
        <EntrySlider
          testID={`${testID}.entry`}
          name={"daily"}
          label={`Slide to enter today's draw`}
          onComplete={enterDailyDraw}
        />
        <small>Entries are drawn next day</small>
      </div>

      {currentDraw && (
        <DrawSimulator
          testID={`${testID}.draw`}
          draw={currentDraw}
          timeOpens={currentDraw.timeOpens}
          timeCloses={currentDraw.timeCloses}
          onRoll={roll}
        />
      )}
    </section>
  );
};
