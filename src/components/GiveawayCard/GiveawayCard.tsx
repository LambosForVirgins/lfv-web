import { Giveaway, type EntryCriteria } from "@/src/state/types";
import styles from "./GiveawayCard.module.css";
import clsx from "classnames";
import { ProgressIndicator } from "../ProgressIndicator/ProgressIndicator";
import Image from "next/image";

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
  const isDisabled = criteria.some((criterion) => {
    if (criterion.type === "balance" && criterion.value) {
      if (criterion.value instanceof Array) {
        return (
          mockBalanceVirgin < criterion.value[0] ||
          mockBalanceVirgin > criterion.value[1]
        );
      }

      return mockBalanceVirgin < criterion.value;
    }
    return false;
  });

  return (
    <div
      data-testid={testID}
      className={clsx(styles.frame, isDisabled && styles.disabled)}
      onClick={props.onClick}
    >
      <Image src="/images/coin.png" alt={"coins"} width={160} height={160} />
      <div
        data-testid={`${testID}.label`}
        className={clsx(styles.label, "text-xl")}
      >
        {props.label}
      </div>

      {isDisabled && (
        <ProgressIndicator
          testID={`${testID}.progress`}
          size="small"
          progress={
            mockBalanceVirgin /
            criteria.reduce((sum, criterion) => {
              if (criterion.type === "balance" && criterion.value) {
                if (criterion.value instanceof Array) {
                  return sum + criterion.value[0];
                }

                return sum + criterion.value;
              }

              return sum;
            }, 0)
          }
        />
      )}

      <div className={styles.overlay}>
        <div>{props.description}</div>
        <ul>
          {criteria.map((criterion, index) => (
            <li key={index}>
              {criterion.parameter} {criterion.value}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
