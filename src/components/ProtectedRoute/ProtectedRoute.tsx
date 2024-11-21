"use client";

import { useMembership } from "@/src/hooks/useMembership";

export default function ProtectedRoute({
  children,
}: Readonly<React.PropsWithChildren>) {
  const { loading, isAuthorized } = useMembership();
  if (loading) return <div>Loading...</div>;

  console.log(isAuthorized);

  if (!isAuthorized) {
    return (
      <div className="col-content p-9">
        <h2>Automatically receive our member-only bonuses:</h2>
        <div>
          <div>
            <h4>Bonus #1</h4>
            <p>Get free entries into</p>
            <p>Every giveaway!</p>
            <p>(Cars, Houses, & More)</p>
          </div>
          <div>
            <h4>Bonus #2</h4>
            <p>Go into the draw to</p>
            <p>Win a Lambo!</p>
          </div>
        </div>
        <div>
          <p>Become a member for only 1 VIRGIN</p>
        </div>
        <div>
          <div>
            <h3>Virgins</h3>
            <p>10,000 VIRGINS</p>
          </div>
          <div>
            <h3>Giga Chads</h3>
            <p>1 Million VIRGINS</p>
          </div>
        </div>
      </div>
    );
  }

  return children;
}
