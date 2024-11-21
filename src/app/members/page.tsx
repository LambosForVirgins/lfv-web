"use client";

import ProtectedRoute from "@/src/components/ProtectedRoute/ProtectedRoute";
import { SubmissionForm } from "@/src/components/SubmissionForm/SubmissionForm";
import { useTranslations } from "next-intl";

export default function MembersPage({
  testID = "members",
}: Readonly<Partial<Common.ComponentProps>>) {
  const t = useTranslations("Members");

  return (
    <ProtectedRoute>
      <section data-testid={testID} className="col-content p-5">
        <SubmissionForm testID={"form"} className="col-content" />
      </section>
    </ProtectedRoute>
  );
}
