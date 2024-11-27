"use client";

import { Section } from "@/src/components/Section/Section";
import Image from "next/image";
import { Brand } from "@/src/utils/config/Brand";
import { MembershipSell } from "@/src/components/MembershipSell/MembershipSell";

export const MembershipSection = ({
  testID,
}: Readonly<Common.ComponentProps>) => {
  return (
    <Section testID="membership" id={"membership"}>
      <div className="grid gap-9 col-content content-center">
        <h1 className="text-2xl">Virgins need Lambos</h1>
        <Image
          src={"/images/logo-stamp.png"}
          alt={`${Brand.tokenSymbol} stamp logo`}
          width={400}
          height={250}
          className="justify-self-center"
        />
        <h1 className="text-2xl">
          {`We're celebrating $100 million market cap with a Lambo giveaway!`}
        </h1>
        <p>
          Gain access to our exclusive club and member benefits with only one
          $VIRGIN token today!
        </p>
        <h2>Plus many more weekly member giveaways</h2>
        <p>(Watches, Cars, & More)</p>
      </div>
      <div className="grid gap-9 col-content">
        <div className="bg-white">
          <h4>Acquire</h4>
          <p>More tokens</p>
          <p>equals</p>
          <p>Access greater benefits</p>
        </div>
        <div className="bg-white">
          <h4>HODL</h4>
          <p>More time</p>
          <p>equals</p>
          <p>More entries every month</p>
        </div>
      </div>
      <div className="col-content">
        <p>Join the club today for only 1 VIRGIN</p>
        <p>OR</p>
        <p>Become a Chad</p>
      </div>
      <MembershipSell testID={`${testID}.promo`} />
      <hr />
      <div className="col-content">
        <p>
          Not interested in membership but still want your chance at giveaway
        </p>
        <p>Become a liquidty provider for...</p>
      </div>
    </Section>
  );
};
