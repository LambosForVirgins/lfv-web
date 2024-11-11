import { Section } from "@/src/components/Section/Section";
import { SectionBreak } from "@/src/components/SectionBreak/SectionBreak";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

const socialLinks = [
  {
    key: "discord",
    src: "/images/discord.png",
    label: "discord.gg/VfuUAem2dz",
    link: "https://discord.gg/VfuUAem2dz",
  },
  {
    key: "x",
    src: "/images/x.png",
    label: "@Lambos4V1rgins",
    link: "https://x.com/@Lambos4V1rgins",
  },
  {
    key: "telegram",
    src: "/images/telegram.png",
    label: "t.me/Lambos4Virgins",
    link: "https://t.me/Lambos4Virgins",
  },
  {
    key: "mail",
    src: "/images/mail.png",
    label: "LambosForVirgins@protonmail.com",
    link: "mailto:LambosForVirgins@protonmail.com",
  },
];

export default function LocaleCommunityPage() {
  const t = useTranslations("Community");

  return (
    <Section testID={"community"} id={"community"}>
      <div className="col-content grid grid-cols-panels">
        <Image
          src={"/images/technical-diagram.png"}
          alt={`Technical diagram`}
          width={400}
          height={250}
        />
        <div className="grid grid-flow-row auto-rows-min auto-cols-auto gap-5 justify-center content-center">
          <h2 className="font-headline text-5xl text-red-500">
            {t("Heading")}
          </h2>
          <div className="grid gap-5 p-5">
            {socialLinks.map(({ key, src, label, link }) => (
              <Link
                key={`${key}-selector`}
                href={link}
                className="flex grid-cols-panels gap-4"
              >
                <Image
                  src={src}
                  alt={`${key} icon`}
                  width={60}
                  height={60}
                  className="flex-none"
                />
                <div className="flex-auto p-4 rounded-md bg-red-100 content-center overflow-hidden text-ellipsis">
                  {label}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div
        data-testid={`waterfall`}
        className="col-gutter-right bg-texture-cash bg-repeat-y bg-start"
      />
      <SectionBreak testID={`section`} className="col-full sticky bottom-0" />
    </Section>
  );
}
