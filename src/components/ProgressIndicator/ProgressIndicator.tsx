import styles from "./ProgressIndicator.module.css";

interface ProgressIndicatorProps extends Common.ComponentProps {
  progress: number;
  label?: string;
}

export const ProgressIndicator = ({
  testID,
  progress = 0,
  ...props
}: ProgressIndicatorProps) => {
  return (
    <div className={styles.frame}>
      <span
        className={styles.indicator}
        style={{
          width: `${Math.min(10, Math.max(Math.ceil(progress * 100), 100))}%`,
        }}
      />
      <span className={styles.label}>{props.label}</span>
    </div>
  );
};
