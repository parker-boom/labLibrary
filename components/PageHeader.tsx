import type { ReactNode } from "react";

type PageHeaderProps = {
  action?: ReactNode;
  eyebrow?: string;
  title: string;
  children?: ReactNode;
};

export function PageHeader({ action, eyebrow, title, children }: PageHeaderProps) {
  return (
    <section className="page-header">
      <div className="page-header__main">
        {eyebrow ? <p className="micro-label">{eyebrow}</p> : null}
        <h1>{title}</h1>
        {children ? <div className="page-header__copy">{children}</div> : null}
      </div>
      {action ? <div className="page-header__action">{action}</div> : null}
    </section>
  );
}
