"use client";

import { SwapButton } from "@/src/components/Buttons/SwapButton";
import { PurchaseSteps } from "@/src/components/PurchaseSteps/PurchaseSteps";
import { Section } from "@/src/components/Section/Section";
import { Brand } from "@/src/utils/config/Brand";
import Image from "next/image";

export const PurchaseSection = ({ testID }: Common.ComponentProps) => {
  return (
    <Section testID="purchase" id={"purchase"}>
      <div className="grid p-5 gap-9 col-content grid-cols-panels">
        <div data-testid={`${testID}.content`}>
          <Image
            data-testid={`${testID}.image`}
            src={"/images/lambos.png"}
            alt={`${Brand.tokenSymbol} stamp logo`}
            width={501}
            height={186}
          />
          <div className="grid gap-5">
            <SwapButton testID={`${testID}.swap`} />
            <h3 className="text-2xl">How to buy $VIRGIN</h3>
            <PurchaseSteps testID={`${testID}.steps`} />
          </div>
        </div>
        <Image
          src={"/images/logo-stamp.png"}
          alt={`${Brand.tokenSymbol} stamp logo`}
          width={400}
          height={250}
          className="justify-self-center"
        />
      </div>
    </Section>
  );
};
