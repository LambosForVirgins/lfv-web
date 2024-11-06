"use client";

import { useEffect, useState } from "react";
import { TextContext } from "../utils/canvas/TextContext";

export const useGraphicText = (text: string) => {
  const [url, setUrl] = useState<string | null>(null);
  const [width, setWidth] = useState<number>(32);

  useEffect(() => {
    const fontSize = 32;
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    const customFont = new FontFace("Bangers", "url(/fonts/Bangers.ttf)");

    customFont
      .load()
      .then((font) => {
        // console.log("Loaded font", font);
        if (context && text) {
          // console.log("Drawing text", text);
          const textSize = TextContext(context).measureText(text, fontSize);
          document.fonts.add(font);
          canvas.height = fontSize;
          canvas.width = textSize.width;
          context.font = `${fontSize}px Bangers`;
          context.fillStyle = "rgba(255,255,255,1)";
          context.textRendering = "optimizeLegibility";

          setWidth(textSize.width);

          context.fillText(text, 0, fontSize);

          setUrl(canvas.toDataURL());
        }
      })
      .catch((err) => console.error(err));
  }, [text]);
  // TODO: Return ref instead and populate when ref changes/loads
  return { url, width };
};
