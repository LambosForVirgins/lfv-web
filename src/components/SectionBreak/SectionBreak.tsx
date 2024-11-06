"use client";

import { useGraphicText } from "@/src/hooks/useGraphicText";
import styles from "./SectionBreak.module.css";
import clsx from "classnames";
import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";

interface SectionBreakProps extends Common.ComponentProps {
  className?: string;
}

export const SectionBreak = ({ testID, ...props }: SectionBreakProps) => {
  const backgroundRef = useRef<HTMLHRElement>(null);
  const t = useTranslations("Metadata");
  const { url, width } = useGraphicText(t("Token.Symbol"));

  useEffect(() => {
    if (backgroundRef.current && url) {
      const element = backgroundRef.current;
      element.style.setProperty("--LOOP_WIDTH", `${width - 1}px`);
      element.style.backgroundImage = `url(${url})`;
    }
  }, [backgroundRef, url, width]);

  return (
    <hr
      ref={backgroundRef}
      data-testid={testID}
      className={clsx(props.className, `bg-red-500`, styles.frame)}
    />
  );
};
