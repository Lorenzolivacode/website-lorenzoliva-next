"use client";

import React from "react";
import { IDescriptionPData } from "../../../Interface/IPortfolioProject";
import { useLocale } from "next-intl";

interface ParagraphProps {
  description: IDescriptionPData;
  maxHeight?: string;
}

function ParagraphList({ description, maxHeight = "50" }: ParagraphProps) {
  const locale = useLocale();
  return (
    <p className={`overflow-auto grow-1 max-h-${maxHeight}p`}>
      {locale === "it" ? description.italian : description.english}
    </p>
  );
}

export default ParagraphList;
