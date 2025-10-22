import s from "../../styles/ServicePage.module.css";

export function FeatureGrid({ items }: { items: { title: string; text: string }[] }) {
  return (
    <div className={s["benefits-grid"]}>
      {items.map((i) => (
        <div key={i.title} className={s["benefit-item"]}>
          <h4 dangerouslySetInnerHTML={{__html:i.title}}></h4>
          <p>{i.text}</p>
        </div>
      ))}
    </div>
  );
}
