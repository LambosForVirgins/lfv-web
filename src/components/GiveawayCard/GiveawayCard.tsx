import { Giveaway, type EntryCriteria } from "@/src/state/types";
import styles from "./GiveawayCard.module.css";
import clsx from "classnames";
import { ProgressIndicator } from "../ProgressIndicator/ProgressIndicator";
import Image from "next/image";
import { Button } from "../Buttons/Button";
import { getProgressFromBalance } from "@/src/utils/membership/getProgressFromBalance";
import { validateEntryCriteria } from "@/src/utils/entry-criteria/validateEntryCriteria";

interface RewardCardProps extends Common.ComponentProps {
  label: string;
  description?: string | null;
  criteria?: EntryCriteria[];
  onClick?: () => void;
}

const mockBalanceVirgin = 15_432;

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
            <button
              data-testid={`${testID}.button`}
              className={styles.button}
            >{`Enter draw`}</button>
          )}
        </div>
      </div>
    </div>
  );
};
