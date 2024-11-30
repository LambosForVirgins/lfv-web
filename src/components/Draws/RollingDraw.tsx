"use client";

import { useEffect, useState } from "react";
import styles from "./RollingDraw.module.css";
import { type DrawEntry } from "@/src/state/types";
import { useRecoilValue } from "recoil";
import { currentSeedSelector } from "@/src/state/submissions";
import { deriveNumberFromSeed } from "@/src/utils/string/deriveNumberFromSeed";
import clsx from "classnames";
import { InfiniteSlider } from "./InfiniteSlider";
import { Countdown } from "../Countdown/Countdown";

const COUNTDOWN_TIME = 120;

interface RollingDrawProps {
  entries: DrawEntry[];
  duration?: number;
  onDraw?: (entryIndex: number) => void;
}

export const RollingDraw = ({
  entries = [],
  duration = COUNTDOWN_TIME,
  ...props
}: RollingDrawProps) => {
  const currentSeed = useRecoilValue(currentSeedSelector);
  const [selectedEntry, setSelectedEntry] = useState<number>(
    deriveNumberFromSeed(currentSeed, {
      max: entries.length,
    })
  );

  useEffect(() => {
    setSelectedEntry((previousSelectedEntry) =>
      deriveNumberFromSeed(currentSeed, {
        max: entries.length,
        skip: previousSelectedEntry,
      })
    );
  }, [currentSeed, entries.length]);

  return (
    <div className={styles.frame}>
      <div className="flex flex-row items-center justify-between">
        <Countdown timeRemaining={duration} />
        <h3>Seed {currentSeed}</h3>
      </div>
      <InfiniteSlider items={entries} selectedIndex={selectedEntry} />
    </div>
  );
};
