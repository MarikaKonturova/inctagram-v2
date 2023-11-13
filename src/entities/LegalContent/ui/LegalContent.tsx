import React, { FC } from "react";
import { Button } from "shared/ui";
import ArrowBackOutlineIcon from "shared/assets/icons/outline/arrow-back-outline.svg";
import cls from "./LegalContent.module.scss";
import { useRouter } from "next/router";
import { AppRoutes } from "shared/constants/path";

interface PropsType {
  label: string;
  title: string;
  content: string;
}

export const LegalContent: FC<PropsType> = ({ label, title, content }) => {
  const router = useRouter();
  const goToBack = () => router.push(AppRoutes.AUTH.REGISTRATION);

  return (
    <div className={cls.rootContainer}>
      <Button
        type="button"
        theme="clear"
        className={cls.button}
        onClick={goToBack}
      >
        <ArrowBackOutlineIcon className={cls.icon} />
        {label}
      </Button>
      <div className={cls.main}>
        <h1 className={cls.title}>{title}</h1>
        <div className={cls.contentContainer}>
          <p className={cls.paragraph}>{content}</p>
        </div>
      </div>
    </div>
  );
};
