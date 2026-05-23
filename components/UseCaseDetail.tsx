import { AddToTrayButton } from "@/components/AddToTrayButton";
import { DetailShell } from "@/components/DetailShell";
import type { UseCase } from "@/lib/content";
import { spriteForUseCase } from "@/lib/sprites";

type UseCaseDetailProps = {
  useCase: UseCase;
};

export function UseCaseDetail({ useCase }: UseCaseDetailProps) {
  return (
    <DetailShell
      action={
        <AddToTrayButton
          item={{
            id: useCase.id,
            type: "useCase",
            title: useCase.title,
            label: useCase.featureLabel,
            detail: useCase.school
          }}
        />
      }
      backHref="/use-cases"
      backLabel="Use cases"
      eyebrow={`${useCase.featureLabel} / ${useCase.sharedBy}`}
      sprite={spriteForUseCase(useCase.id)}
      title={useCase.title}
    >
      <div className="detail-grid detail-grid--use-case">
        <section className="chat-panel">
          <p className="micro-label">Reconstructed chat</p>
          <div className="chat-panel__screen">
            {useCase.chatExample?.map((turn, index) => (
              <div className={`chat-turn chat-turn--${turn.role}`} key={`${turn.role}-${index}`}>
                <span>{turn.role === "user" ? "Student" : "ChatGPT"}</span>
                <p>{turn.text}</p>
              </div>
            ))}
          </div>
        </section>

        <aside className="detail-stack">
          <section className="info-panel">
            <p className="micro-label">Process</p>
            <ol className="number-list">
              {useCase.process?.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </section>
          <section className="info-panel info-panel--dark">
            <p className="micro-label">Result</p>
            <h2>{useCase.result}</h2>
          </section>
          <section className="info-panel">
            <p className="micro-label">Event remix</p>
            <p>{useCase.eventRemix}</p>
          </section>
        </aside>
      </div>
    </DetailShell>
  );
}
