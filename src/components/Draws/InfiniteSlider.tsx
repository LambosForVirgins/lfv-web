import { type DrawEntry } from "@/src/state/types";
import React, { useEffect } from "react";
import { useHorizontalImageBackground } from "@/src/hooks/useScollerBackgroundImage";

interface InfiniteSliderProps {
  items: DrawEntry[];
  selectedIndex: number;
  advanceBy?: number;
  closed?: boolean;
}

export const InfiniteSlider = ({
  items,
  selectedIndex,
}: InfiniteSliderProps) => {
  const sliderRef = React.useRef<HTMLDivElement>(null);
  const backgroundImage = useHorizontalImageBackground(items, {
    gap: 16,
    imageSize: 150,
  });

  useEffect(() => {
    if (sliderRef.current) {
      const itemSize = 150 + 16;
      const currentPosition = parseFloat(
        sliderRef.current.style.backgroundPositionX || "0"
      );
      const slider = sliderRef.current,
        delta = items.length * itemSize + selectedIndex * itemSize;

      new Promise((resolve) => {
        slider.style.transition = "background-position-x 0.5s ease-in-out";
        slider.style.backgroundPositionX = `${currentPosition - delta}px`;

        setTimeout(() => {
          resolve(selectedIndex);
        }, 1000);
      });
    }
  }, [selectedIndex, items.length]);

  return (
    <div
      ref={sliderRef}
      className="grid grid-row-2"
      style={{ backgroundImage: `url(${backgroundImage})`, height: 150 }}
    />
  );
};
