"use client";

import { useMembership } from "@/src/hooks/useMembership";

export const MemberUpSell = ({
  testID = "upsell",
  ...props
}: Partial<Common.ComponentProps> & { onClick: (amount: number) => void }) => {
  return (
    <div className="col-content p-9">
      <h1>Virgins need Lambos</h1>
    </div>
  );
};

export default function ProtectedRoute({
  children,
}: Readonly<React.PropsWithChildren>) {
  const { loading, isAuthorized } = useMembership();
  if (loading) return <div>Loading...</div>;

  console.log(isAuthorized);

  const purchaseMembershipAmount = (amount: number) => {
    console.log("Purchase membership amount", amount);
  };

  if (!isAuthorized) {
    return <MemberUpSell onClick={purchaseMembershipAmount} />;
  }

  return children;
}
