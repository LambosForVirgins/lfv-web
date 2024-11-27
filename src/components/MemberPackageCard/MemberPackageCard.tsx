import { Button } from "../Buttons/Button";
import styles from "./MemberPackageCard.module.css";
import clsx from "classnames";

interface MembershipPackageCardProps extends Common.ComponentProps {
  title: string;
  benefits: { label: string }[];
  amount: number;
  highlight?: boolean;
  className?: string;
  onClick?: (amount: number) => void;
}

export const CardHeader = (props: { title: string }) => {
  return (
    <div>
      <h3 className="text-2xl ">{props.title}</h3>
    </div>
  );
};

export const BenefitList = (props: { benefits: { label: string }[] }) => {
  return (
    <ul>
      {props.benefits.map((benefit) => (
        <li key={benefit.label}>{benefit.label}</li>
      ))}
    </ul>
  );
};

export const MemberPackageCard = ({
  testID,
  ...props
}: MembershipPackageCardProps) => {
  const selectMembershipAmount = () => {
    props.onClick?.(props.amount);
  };

  return (
    <div
      className={clsx(
        props.className,
        styles.frame,
        "flex flex-col p-5 gap-2 bg-white rounded-lg",
        props.highlight && styles.highlight
      )}
    >
      <CardHeader title={props.title} />
      <h4 className="text-xl">1 Million VIRGINS</h4>
      <div className={styles.content}>
        <BenefitList benefits={props.benefits} />
      </div>
      <Button testID={`${testID}.select`} onClick={selectMembershipAmount}>
        Select
      </Button>
    </div>
  );
};
