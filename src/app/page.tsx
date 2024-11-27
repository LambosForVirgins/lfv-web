import { Brand } from "@/src/utils/config/Brand";
import { getTranslations } from "next-intl/server";
import { SectionBreak } from "../components/SectionBreak/SectionBreak";
import { CommunitySection } from "../sections/CommunitySection/CommunitySection";
import { MembershipSection } from "../sections/MembershipSection/MembershipSection";
import { PurchaseSection } from "../sections/PurchaseSection/PurchaseSection";
import { AboutSection } from "../sections/AboutSection/AboutSection";
import { SubmissionSection } from "../sections/SubmissionSection/SubmissionSection";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: t("Token.DisplayName"),
    description: t("Token.Slogan"),
    keywords: ["meme", "coin", "crypto", "lamborghini", "meme coin", "trade"],
    openGraph: {
      title: t("Token.DisplayName"),
      description: t("Token.Slogan"),
      type: "website",
      locale: locale,
      siteName: t("Token.DisplayName"),
      images: [
        // TODO: SEO Images
        {
          url: "/images/logo-stamp.png",
          width: 400,
          height: 250,
          alt: `${Brand.tokenSymbol} stamp logo`,
        },
      ],
    },
  };
}

export default function LandingPage() {
  return (
    <>
      <MembershipSection testID={"membership"} />
      <SectionBreak testID={`section`} className="col-full sticky bottom-0" />
      <PurchaseSection testID={`purchase`} />
      <SectionBreak testID={`section`} className="col-full sticky bottom-0" />
      <AboutSection testID={`about`} />
      <SectionBreak testID={`section`} className="col-full sticky bottom-0" />
      <CommunitySection testID={"community"} />
      <SectionBreak testID={`section`} className="col-full sticky bottom-0" />
      <SubmissionSection testID={"submission"} />
    </>
  );
}
