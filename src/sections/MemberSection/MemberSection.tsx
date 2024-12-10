"use client";

import { DailyEntrySlider } from "@/src/components/DailyEntrySlider/DailyEntrySlider";
import styles from "./MemberSection.module.css";
import clsx from "classnames";

const HEADLINES = [
  "Daily Giveaway!",
  "Win 1000 to 10,000 VIRGIN every day!",
  "Wake up to 1000 to 10,000 more $VIRGIN!",
  "How does waking up to 1000 to 10,000 more $VIRGIN sound?",
];

const SUBTITLES = [
  "1000 to 10,000 VIRGIN rewarded every day",
  "You could wake up with 1000 to 10,000 VIRGIN",
  "Test your virginity with our daily virgin rewards",
  "Test your virginity with our daily giveaways",
  "Enjoy your virginity with our daily giveaways",
];

export const MemberSection = ({ testID }: Common.ComponentProps) => {
  // const t = useTranslations("Members");

  return (
    <section data-testid={testID} className="grid col-full grid-cols-subgrid">
      <div
        data-testid={`${testID}.banner`}
        className="grid col-full grid-cols-subgrid"
      >
        <div
          data-testid={`${testID}.promo`}
          className="grid col-content gap-9 p-9 justify-center"
        >
          <h2
            data-testid={`${testID}.title`}
            className={clsx("text-2xl text-center", styles.title)}
          >
            <mark>{HEADLINES[0]}</mark>
          </h2>
          <h3
            data-testid={`${testID}.subtitle`}
            className={clsx("text-xl text-center", styles.subtitle)}
          >
            {SUBTITLES[0]}
          </h3>
          <DailyEntrySlider testID={`${testID}.daily`} />
          <small
            data-testid={`${testID}.description`}
            className="text-lg text-center"
          >
            ~ Drawn next day ~
          </small>
        </div>
      </div>
      <div className="col-content">
        <h2>All about your membership here</h2>
        <p>You're in the top 1% of...</p>
        <p>Entries accrued</p>
        <p>Staked tokens</p>
      </div>
      <div className="col-full bg-white grid-cols-subgrid">
        <div className="col-content">
          Show the giveaways entered into. Feed life from entry to daily
          giveaway
        </div>
        <div className="grid p-5 gap-5">
          {["Daily Draw 2000 VIRGIN", "Daily Draw 5000 PEACH"].map((title) => (
            <div key={title}>{title}</div>
          ))}
        </div>
        <div>
          <h2>Special event</h2>
          <p>Special event details and stuff here</p>
        </div>
        <div>
          <h2>Sponsored bonus</h2>
          <p>Promotional bonus stuff</p>
        </div>
        <div>
          <h2>Partner offer #1</h2>
        </div>
      </div>
    </section>
  );
};
