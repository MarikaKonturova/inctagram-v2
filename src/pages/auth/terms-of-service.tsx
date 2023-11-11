import { GetServerSidePropsContext } from "next";
import { getTranslations } from "shared/lib/i18n";
import { useTranslation } from "next-i18next";
import { getAuthLayout } from "layouts/Layout/AuthLayout/AuthLayout";
import { LegalContent } from "entities/LegalContent/ui/LegalContent";

export default function TermsOfService() {
  const { t } = useTranslation("terms-of-use");

  return (
    <LegalContent
      label={t("backToSignUp")}
      title={t("title")}
      content={t("content")}
    />
  );
}

export const getStaticProps = async (ctx: GetServerSidePropsContext) => ({
  props: await getTranslations(ctx.locale, ["terms-of-use"]),
});

TermsOfService.getLayout = getAuthLayout;
