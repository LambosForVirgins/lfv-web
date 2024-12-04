"use client";

import ProtectedRoute from "@/src/components/ProtectedRoute/ProtectedRoute";
import { RecoilRoot } from "recoil";
import { useGiveaway } from "@/src/state/giveaways/useGiveaway";
import { useParams } from "next/navigation";

export const GiveawaySection = ({ testID }: Common.ComponentProps) => {
  const { giveawayId } = useParams<{ giveawayId: string }>();
  const { giveaway } = useGiveaway(giveawayId);

  return (
    <div data-testid={testID} className="col-content">
      <div data-testid={`${testID}.feature`} className="p-5">
        <h1 className="text-2xl">{giveaway?.title}</h1>
      </div>
    </div>
  );
};

export default function GiveawayPage({
  testID = "giveaway",
}: Readonly<Partial<Common.ComponentProps>>) {
  return (
    <RecoilRoot>
      <ProtectedRoute>
        <GiveawaySection testID={testID} />
      </ProtectedRoute>
    </RecoilRoot>
  );
}
