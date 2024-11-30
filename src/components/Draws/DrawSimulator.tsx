"use client";

import { DrawRound, DrawStatus } from "@/src/state/types";
import { Button } from "../Buttons/Button";
import { RollingDraw } from "./RollingDraw";

interface DrawSimulatorProps extends Common.ComponentProps {
  draw: DrawRound;
  timeOpens: number;
  timeCloses: number;
  onRoll: () => void;
}

export const DrawSimulator = ({
  draw: currentRound,
  timeOpens,
  timeCloses,
  ...props
}: DrawSimulatorProps) => {
  return (
    <div className="grid col-content p-5 gap-5">
      <div className="flex flex-row justify-between">
        <div style={{ position: "sticky", top: 0, right: 0 }}>
          <h2>Meta</h2>
          <p>Initial seed: {currentRound.seed}</p>
        </div>
        <Button
          testID={`draw`}
          onClick={props.onRoll}
          disabled={currentRound.status !== DrawStatus.Open}
        >
          Redraw
        </Button>
      </div>
      <RollingDraw
        entries={currentRound.entries}
        duration={Math.max(0, timeCloses - timeOpens)}
      />
    </div>
  );
};
