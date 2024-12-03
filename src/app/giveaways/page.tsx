"use client";

import { DrawSimulator } from "@/src/components/Draws/DrawSimulator";
import ProtectedRoute from "@/src/components/ProtectedRoute/ProtectedRoute";
import { RewardCard } from "@/src/components/RewardCard/RewardCard";
import { useGiveaways } from "@/src/state/giveaways";
import { useDraw, useRollDraw } from "@/src/state/submissions";
import { RecoilRoot } from "recoil";

export const GiveawaySection = ({ testID }: Common.ComponentProps) => {
  const { giveaways } = useGiveaways();
  const { draw: currentDraw } = useDraw(1);
  const { roll } = useRollDraw();

  return (
    <div data-testid={testID} className="col-content">
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
          <RewardCard
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
