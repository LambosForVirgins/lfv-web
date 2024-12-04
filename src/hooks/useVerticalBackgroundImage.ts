import { useState, useEffect } from "react";
import { type DrawEntry } from "../state/types";

interface LayoutOptions {
  gap: number; // Space between photos in pixels
  imageSize: number; // Width and height of each photo in pixels
}

export const useVerticalImageBackground = (
  items: DrawEntry[],
  options: LayoutOptions
) => {
  const [backgroundUrl, setBackgroundUrl] = useState<string>("");

  useEffect(() => {
    if (items.length === 0) return;

    const { gap, imageSize } = options;
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    if (!context) return;

    // Calculate canvas height based on item count, image size, and gap
    canvas.height = gap + items.length * imageSize + (items.length - 1) * gap;
    canvas.width = imageSize;

    // Draw each image onto the canvas
    items.forEach((item, index) => {
      const yPosition = index * imageSize;

      const img = new Image();
      img.src = `http://localhost:3000/api/proxy-image?url=${encodeURIComponent(`https://i.pravatar.cc/${imageSize / 2}?u=${index}`)}`;
      img.crossOrigin = "anonymous";

      img.onload = () => {
        context.drawImage(img, 0, yPosition, imageSize, imageSize);
        // After last image loads, update the background URL
        if (index === items.length - 1) {
          const dataUrl = canvas.toDataURL();
          setBackgroundUrl(dataUrl);
        }
      };

      img.onerror = () => {
        console.error(`Failed to load image for ${item.name}`);
      };
    });
  }, [items, options]);

  return backgroundUrl;
};
