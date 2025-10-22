import s from "../../styles/ServicePage.module.css";

export function FAQ({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className={s["faq"]}>
      {items.map((i, idx) => (
        <div key={idx} className={s["faq-item"]}>
          <h4>{i.q}</h4>
          <p>{i.a}</p>
        </div>
      ))}
    </div>
  );
}
