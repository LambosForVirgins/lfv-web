"use client";

import ProtectedRoute from "@/src/components/ProtectedRoute/ProtectedRoute";
import { GiveawayCard } from "@/src/components/GiveawayCard/GiveawayCard";
import { RecoilRoot } from "recoil";
import { useGiveaways } from "@/src/state/giveaways/useGiveaways";
import { useDraw } from "@/src/state/draws/useDraws";
import { useRollDraw } from "@/src/state/draws/useRollDraw";
import styles from "./GiveawaysSection.module.css";
import Link from "next/link";
import { SlotMachine } from "@/src/components/SlotMachine/SlotMachine";
import { useState } from "react";

export const GiveawaySection = ({ testID }: Common.ComponentProps) => {
  const { giveaways } = useGiveaways();
  const { draw: currentDraw } = useDraw(1);
  const { roll } = useRollDraw();
  const [tempRoll, setTempRoll] = useState(0);

  return (
    <div data-testid={testID} className="col-content">
      <div data-testid={`${testID}.feature`}>
        {currentDraw && (
          <SlotMachine testID={`${testID}.draw`} selected={tempRoll} />
        )}
        <button onClick={() => setTempRoll((r) => r + 1)}>Spin</button>
        <h1>Next mega giveaway in 10 days</h1>
      </div>
      <div data-testid={`${testID}.collection`} className={styles.collection}>
        {giveaways.map((promo, index) => (
          <Link href={`/giveaways/${promo.id}`} key={index}>
            <GiveawayCard
              testID={`${testID}.reward`}
              label={promo.title}
              description={promo.description}
              criteria={promo.criteria}
            />
          </Link>
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
