"use client";

import { Section } from "@/src/components/Section/Section";
import Image from "next/image";
import { Brand } from "@/src/utils/config/Brand";
import { MembershipSell } from "@/src/components/MembershipSell/MembershipSell";
import { useMarketCap } from "@/src/state/marketCap";
import { ProgressIndicator } from "@/src/components/ProgressIndicator/ProgressIndicator";

export const MembershipSection = ({
  testID,
}: Readonly<Common.ComponentProps>) => {
  const { marketCapDiluted } = useMarketCap();

  return (
    <Section testID="membership" id={"membership"}>
      <div className="grid gap-9 col-content content-center">
        <h1 className="text-2xl">Virgins need Lambos</h1>
        <div className="grid">
          <Image
            src={"/images/logo-stamp.png"}
            alt={`${Brand.tokenSymbol} stamp logo`}
            width={400}
            height={250}
            className="justify-self-center"
          />
          <Image
            src={"/images/banner.png"}
            alt={"banner"}
            width={618}
            height={123}
            className="justify-self-center"
          />
        </div>
        <h1 className="text-2xl text-center">
          {`We're celebrating $100 million market cap with a Lambo giveaway for one lucky member!`}
        </h1>
        <ProgressIndicator
          testID={`${testID}.progress`}
          progress={marketCapDiluted / 100_000_000}
          label={`$${Math.floor(marketCapDiluted / 100_000) / 10} Million`}
        />
        <p>
          Gain access to our exclusive club and member benefits with only one
          $VIRGIN token today!
        </p>
        <h2>Plus many more weekly member giveaways</h2>
        <p>(Watches, Cars, & More)</p>
      </div>
      <div className="grid gap-9 col-content grid-cols-2">
        <div className="bg-white">
          <h4>Acquire</h4>
          <p>More tokens</p>
          <p>equals</p>
          <p>Greater benefits</p>
        </div>
        <div className="bg-white">
          <h4>Stake</h4>
          <p>More time</p>
          <p>equals</p>
          <p>More rewards</p>
        </div>
      </div>
      <div className="grid gap-2 col-content text-center">
        <h3 className="text-2xl">Join the club today for only 1 VIRGIN</h3>
        <p className="text-xl">OR</p>
        <h3 className="text-2xl">Become a Chad</h3>
      </div>
      <MembershipSell testID={`${testID}.promo`} />
      <hr />
      <div className="col-content">
        <p>Not interested in membership?</p>
        <p>
          Bag VIRGIN tokens to inherit from membership demand or become a
          liquidity provider to profit by supporting the market.
        </p>
      </div>
      <div className="col-content">
        <ol>
          <li>Connect your wallet</li>
          <li>Hold 1 or more VIRGIN tokens</li>
          <li>Access the members area</li>
        </ol>
      </div>
    </Section>
  );
};
