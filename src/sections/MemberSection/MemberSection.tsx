import { BoostButton } from "@/src/components/Buttons/BoostButton";
import { DrawSimulator } from "@/src/components/Draws/DrawSimulator";
import { EntrySlider } from "@/src/components/EntrySlider/EntrySlider";
import { useDraw } from "@/src/state/submissions";
import { type DrawRound } from "@/src/state/types";

const rollCurrentDraw = async (): Promise<DrawRound | null> => {
  try {
    const result = await fetch("/api/draw/roll", { method: "POST" }).then(
      (res) => res.json()
    );

    console.log(JSON.stringify(result, null, " "));

    return result;
  } catch (err) {
    return null;
  }
};

const enterDraw = async (
  drawNumber: number,
  details: { address: string; name: string }
) => {
  const body = JSON.stringify(details);

  return await fetch(`/api/draw/${drawNumber}/enter`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
  }).then((res) => res.json());
};

export const MemberSection = ({ testID }: Common.ComponentProps) => {
  // const t = useTranslations("Members");
  const { draw: currentDraw } = useDraw();

  const rollDraw = async () => {
    await rollCurrentDraw();
  };

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

      <div className="grid gap-9 p-9">
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
        <div>
          <h2>Draw seed</h2>
          <p>{currentDraw.seed}</p>
          <DrawSimulator
            testID={`${testID}.draw`}
            timeOpens={currentDraw.timeOpens}
            timeCloses={currentDraw.timeCloses}
            onRoll={rollDraw}
          />
        </div>
      )}
    </section>
  );
};
