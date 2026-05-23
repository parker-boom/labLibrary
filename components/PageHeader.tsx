import type { ReactNode } from "react";

type PageHeaderProps = {
  eyebrow: string;
  title: string;
  children?: ReactNode;
};

export function PageHeader({ eyebrow, title, children }: PageHeaderProps) {
  return (
    <section className="page-header">
      <p className="micro-label">{eyebrow}</p>
      <h1>{title}</h1>
      {children ? <div className="page-header__copy">{children}</div> : null}
    </section>
  );
}
