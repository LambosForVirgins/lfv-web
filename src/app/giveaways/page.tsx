"use client";

import ProtectedRoute from "@/src/components/ProtectedRoute/ProtectedRoute";
import { GiveawayCard } from "@/src/components/GiveawayCard/GiveawayCard";
import { RecoilRoot } from "recoil";
import { useGiveaways } from "@/src/state/giveaways/useGiveaways";
import styles from "./GiveawaysSection.module.css";
import clsx from "classnames";
import { DrawMachine } from "@/src/components/DrawMachine/DrawMachine";

export const GiveawaySection = ({ testID }: Common.ComponentProps) => {
  const { giveaways } = useGiveaways();

  return (
    <div data-testid={testID} className={clsx("col-content", styles.frame)}>
      <div data-testid={`${testID}.feature`} className={styles.banner}>
        <DrawMachine testID={`${testID}.draw`} drawId={"we3t54wa"} />
      </div>
      <div data-testid={`${testID}.collection`} className={styles.collection}>
        {giveaways.map((promo, index) => (
          <GiveawayCard
            key={promo.id}
            testID={`${testID}.reward`}
            label={promo.title}
            description={promo.description}
            criteria={promo.criteria}
          />
        ))}
      </div>
      <div>
        <h2>Previous Giveaways</h2>
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
