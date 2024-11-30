"use client";

import ProtectedRoute from "@/src/components/ProtectedRoute/ProtectedRoute";
import { MemberSection } from "@/src/sections/MemberSection/MemberSection";
import { RecoilRoot } from "recoil";

export default function MembersPage({
  testID = "members",
}: Readonly<Partial<Common.ComponentProps>>) {
  return (
    <RecoilRoot>
      <ProtectedRoute>
        <MemberSection testID={testID} />
      </ProtectedRoute>
    </RecoilRoot>
  );
}
