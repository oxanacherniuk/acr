import React from "react";
import style from "./PrivacyPolicy.module.css";
// Вспомогательные компоненты
interface SectionProps {
  title: string;
  children: React.ReactNode;
}

export const Section: React.FC<SectionProps> = ({ title, children }) => {
  return (
    <section className={style["policy-section"]}>
      <h2>{title}</h2>
      {children}
    </section>
  );
};

interface SubsectionProps {
  title: string;
  children: React.ReactNode;
}

export const Subsection: React.FC<SubsectionProps> = ({ title, children }) => {
  return (
    <div className={style["subsection"]}>
      <h3>{title}</h3>
      {children}
    </div>
  );
};

interface DefinitionListProps {
  children: React.ReactNode;
}

export const DefinitionList: React.FC<DefinitionListProps> = ({ children }) => {
  return (
    <dl className={style["definition-list"]}>
      {children}
    </dl>
  );
};

interface DefinitionItemProps {
  term: string;
  definition: string;
}

export const DefinitionItem: React.FC<DefinitionItemProps> = ({ term, definition }) => {
  return (
    <div className={style["definition-item"]}>
      <dt>{term}</dt>
      <dd>{definition}</dd>
    </div>
  );
};
