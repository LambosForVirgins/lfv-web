import { Section } from "@/src/components/Section/Section";
import { useTranslations } from "next-intl";

export default function SubmissionsPage() {
  const t = useTranslations("Submissions");

  return (
    <Section testID="submissions" id={"submissions"}>
      <div className="col-content flex flex-col gap-5 justify-center">
        <h2 className="font-headline text-5xl">{t("Heading")}</h2>
        <p>{t("Directions.Description")}</p>
        <ul role="list" className="instruct">
          <li>{t("Directions.Steps.Who")}</li>
          <li>{t("Directions.Steps.Why")}</li>
          <li>{t("Directions.Steps.What")}</li>
        </ul>
        <p>{t("Directions.Footnote")}</p>
      </div>
      <div
        data-testid={`waterfall`}
        className="col-gutter-right bg-texture-lambo bg-no-repeat bg-left"
      />
    </Section>
  );
}
