"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";

export const AboutSection = ({ testID }: Common.ComponentProps) => {
  const t = useTranslations("About");

  return (
    <section
      id={"about"}
      className="grid p-5 gap-9 col-content grid-cols-panels content-center justify-items-center"
    >
      <Image
        src={"/images/not-lambo.png"}
        alt={`Not lambo`}
        width={400}
        height={250}
      />
      <div className="flex flex-col gap-5 justify-center">
        <h2 className="font-headline text-3xl">{t("Heading")}</h2>
        <p className="font-base text-base">{t("Description")}</p>
        <p className="font-base text-base">{t("Footnote")}</p>
      </div>
      <div id={"buy"}>
        <h2 className="font-headline text-3xl">{t("Instructions.Title")}</h2>
        <Image
          src={"/images/schematics.png"}
          alt={`Schematics`}
          width={400}
          height={250}
        />
      </div>
      <div className="flex flex-col gap-5 justify-center">
        <p className="font-base text-base">{t("Instructions.Description")}</p>
        <ol className="instruct">
          <li>{t("Instructions.Steps.Hold")}</li>
          <li>{t("Instructions.Steps.Submit")}</li>
          <li>{t("Instructions.Steps.Wait")}</li>
        </ol>
      </div>
    </section>
  );
};
