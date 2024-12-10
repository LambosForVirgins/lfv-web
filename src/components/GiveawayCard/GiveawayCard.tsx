import { type EntryCriteria } from "@/src/state/types";
import styles from "./GiveawayCard.module.css";
import clsx from "classnames";
import { ProgressIndicator } from "../ProgressIndicator/ProgressIndicator";
import Image from "next/image";
import { getProgressFromBalance } from "@/src/utils/membership/getProgressFromBalance";
import { validateEntryCriteria } from "@/src/utils/entry-criteria/validateEntryCriteria";
import { useRecoilValue } from "recoil";
import { drawEntryCountSelector } from "@/src/state/giveaways/selectors";
import { useGiveaways } from "@/src/state/giveaways/useGiveaways";
import { drawRoundSelector, roundSelector } from "@/src/state/draws/selectors";

interface RewardCardProps extends Common.ComponentProps {
  drawId: string;
  label: string;
  description?: string | null;
  criteria?: EntryCriteria[];
  onClick?: () => void;
}

const mockBalanceVirgin = 15_432;

const EntryButton = ({
  testID,
  ...props
}: Common.ComponentProps & { drawId: string }) => {
  const entries = useRecoilValue(drawEntryCountSelector(props.drawId));
  const { loading, enterDraw } = useGiveaways();
  const draws = useRecoilValue(roundSelector(props.drawId));

  const enterGiveaway = async (drawId: string) => {
    console.log("Entering giveaway", drawId);
    await enterDraw(drawId, { address: "0x1234", name: "test" });
  };

  // TODO: Should only get a single draw and should check it's open
  // We only want to show giveaways with current and future draws
  if (!draws) {
    return (
      <button
        data-testid={testID}
        onClick={() => enterGiveaway(props.drawId)}
        className={clsx(styles.button, styles.muted)}
        disabled
      >
        {`No draws`}
      </button>
    );
  }

  return (
    <button
      data-testid={testID}
      onClick={() => enterGiveaway(props.drawId)}
      className={styles.button}
      disabled={loading || entries > 0}
    >
      {entries > 0 ? `Entered` : `Enter draw`}
    </button>
  );
};

export const GiveawayCard = ({
  testID,
  criteria = [],
  ...props
}: RewardCardProps) => {
  const { errors } = validateEntryCriteria(criteria, mockBalanceVirgin);

  const isDisabled = errors.length > 0;

  return (
    <div
      data-testid={testID}
      className={clsx(styles.frame, isDisabled && styles.disabled)}
      onClick={props.onClick}
    >
      <div className={styles.image}>
        <Image src="/images/coin.png" alt={"coins"} width={160} height={160} />
      </div>

      <div className={styles.featured}>
        {isDisabled && (
          <ProgressIndicator
            testID={`${testID}.progress`}
            size="small"
            progress={getProgressFromBalance(criteria, mockBalanceVirgin)}
          />
        )}
      </div>

      <div className={styles.content}>
        <h2 data-testid={`${testID}.label`} className={styles.title}>
          {props.label}
        </h2>

        <p className={styles.description}>{props.description}</p>

        <div className={styles.actions}>
          <button
            data-testid={`${testID}.button`}
            className={clsx(styles.button, styles.muted)}
          >{`More info`}</button>
          {isDisabled ? (
            <button
              data-testid={`${testID}.button`}
              className={styles.button}
            >{`Stake more`}</button>
          ) : (
            <EntryButton testID={`${testID}.enter`} drawId={props.drawId} />
          )}
        </div>
      </div>
    </div>
  );
};
