import styles from "./PromoSection.module.css";
import Image from "next/image";
import clsx from "classnames";

interface PromoSectionProps extends Common.ComponentProps {
  className?: string;
}

export const PromoSection = ({ testID, ...props }: PromoSectionProps) => {
  return (
    <div data-testid={testID} className={clsx(props.className, styles.frame)}>
      <div className="relative col-content" style={{ height: 60 }}>
        <Image
          src={"/images/banner.png"}
          alt={"banner"}
          width={618}
          height={123}
          className="justify-self-center absolute"
          style={{ top: -100, right: 0 }}
        />
      </div>
    </div>
  );
};
