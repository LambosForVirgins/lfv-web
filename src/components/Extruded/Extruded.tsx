import styles from "./Extruded.module.css";

interface ExtrudedProps extends Common.ComponentProps {
  label: string;
}

export const Extruded = ({ testID, ...props }: ExtrudedProps) => {
  return (
    <div data-testid={testID} className={styles.frame}>
      <div className={styles.layer}></div>
      <div className={styles.layer}></div>
      <div className={styles.layer}></div>
      <div className={styles.layer}></div>
      <div className={styles.layer}></div>
      <div className={styles.layer}></div>
      <div className={styles.layer}></div>
      <div className={styles.layer}></div>
      <div className={styles.layer}></div>
      <div className={styles.layer}></div>
      <div className={styles.layer}></div>
      <div className={styles.layer}></div>
      <div className={styles.layer}></div>
      <div className={styles.layer}></div>
      <div className={styles.layer}></div>
      <div className={styles.layer}></div>
      <div className={styles.layer}></div>
      <div className={styles.layer}></div>
      <div className={styles.layer}></div>
      <div className={styles.layer}></div>
    </div>
  );
};
