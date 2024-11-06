import { Section } from "@/src/components/Section/Section";
import { SubmissionForm } from "@/src/components/SubmissionForm/SubmissionForm";
import { useTranslations } from "next-intl";

const isSubmissionsEnabled = false;

export default function LocaleSubmissionsPage() {
  const t = useTranslations("Submissions");

  return (
    <Section testID="submissions" id={"submissions"}>
      <div className="col-content flex flex-col gap-5 justify-center">
        <h2 className="font-headline text-5xl">{t("Heading")}</h2>
        <p>{t("Directions.Description")}</p>
        <ul role="list" className="instruct">
          <li>{t("Directions.Steps.Who")}</li>
          <li>{t("Directions.Steps.Why")}</li>
          <li data-icon="🦄">{t("Directions.Steps.What")}</li>
        </ul>
        <p>{t("Directions.Footnote")}</p>
      </div>
      <div
        data-testid={`waterfall`}
        className="col-gutter-right bg-texture-lambo bg-no-repeat bg-left"
      />
      {isSubmissionsEnabled && <SubmissionForm testID={"form"} />}
    </Section>
  );
}
