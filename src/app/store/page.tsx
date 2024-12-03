"use client";

import ProtectedRoute from "@/src/components/ProtectedRoute/ProtectedRoute";
import { RecoilRoot } from "recoil";

export default function StorePage({
  testID = "store",
}: Readonly<Partial<Common.ComponentProps>>) {
  return (
    <RecoilRoot>
      <ProtectedRoute>
        <h1>Store</h1>
      </ProtectedRoute>
    </RecoilRoot>
  );
}
