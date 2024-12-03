"use client";

import { DailyEntrySlider } from "@/src/components/DailyEntrySlider/DailyEntrySlider";

export const MemberSection = ({ testID }: Common.ComponentProps) => {
  // const t = useTranslations("Members");

  return (
    <section data-testid={testID} className="col-content p-5">
      <div>
        <h1>GigaChad</h1>
        <div>Progress indicator until next level</div>
      </div>

      <div className="grid gap-9">
        <h2 className="text-2xl">Win 1000 to 10,000 VIRGIN every day!</h2>
        <h3 className="text-xl">
          Test your virginity with our daily virgin rewards
        </h3>
        <DailyEntrySlider testID={`${testID}.daily`} />
        <small>Entries are drawn next day</small>
      </div>
    </section>
  );
};
