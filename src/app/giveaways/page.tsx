"use client";

import { DrawSimulator } from "@/src/components/Draws/DrawSimulator";
import ProtectedRoute from "@/src/components/ProtectedRoute/ProtectedRoute";
import { GiveawayCard } from "@/src/components/GiveawayCard/GiveawayCard";
import { SunRays } from "@/src/components/SunRays/SunRays";
import { RecoilRoot } from "recoil";
import { useGiveaways } from "@/src/state/giveaways/useGiveaways";
import { useDraw } from "@/src/state/draws/useDraws";
import { useRollDraw } from "@/src/state/draws/useRollDraw";

export const GiveawaySection = ({ testID }: Common.ComponentProps) => {
  const { giveaways } = useGiveaways();
  const { draw: currentDraw } = useDraw(1);
  const { roll } = useRollDraw();

  return (
    <div data-testid={testID} className="col-content">
      <SunRays />
      <div data-testid={`${testID}.feature`}>
        {currentDraw && (
          <DrawSimulator
            testID={`${testID}.draw`}
            draw={currentDraw}
            timeOpens={currentDraw.timeOpens}
            timeCloses={currentDraw.timeCloses}
            onRoll={roll}
          />
        )}
        <h1>Next mega giveaway in 10 days</h1>
      </div>
      <div
        data-testid={`${testID}.collection`}
        className="grid grid-cols-3 gap-5 p-5"
      >
        {giveaways.map((label, index) => (
          <GiveawayCard
            key={index}
            testID={`${testID}.reward`}
            label={label.title}
            description={label.description}
            criteria={label.criteria}
          />
        ))}
      </div>
    </div>
  );
};

export default function GiveawayPage({
  testID = "giveaways",
}: Readonly<Partial<Common.ComponentProps>>) {
  return (
    <RecoilRoot>
      <ProtectedRoute>
        <GiveawaySection testID={testID} />
      </ProtectedRoute>
    </RecoilRoot>
  );
}
