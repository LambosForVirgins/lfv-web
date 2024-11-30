"use client";

import { Button } from "../Buttons/Button";
import { RollingDraw } from "./RollingDraw";
import { useDraw, useEntries } from "@/src/state/submissions";

interface DrawSimulatorProps extends Common.ComponentProps {
  timeOpens: number;
  timeCloses: number;
  onRoll: () => void;
}

export const DrawSimulator = ({
  timeOpens,
  timeCloses,
  ...props
}: DrawSimulatorProps) => {
  const { draw: currentRound, roll } = useDraw();

  const { entries, setWinningEntry } = useEntries();

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
          disabled={!!currentRound.winner}
        >
          Redraw
        </Button>
      </div>
      <RollingDraw
        entries={entries}
        duration={Math.max(0, timeCloses - timeOpens)}
        onDraw={setWinningEntry}
      />
    </div>
  );
};
