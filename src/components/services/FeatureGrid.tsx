import s from "../../styles/ServicePage.module.css";

export function FeatureGrid({ items }: { items: { title: string; text: string }[] }) {
  return (
    <div className={s["benefits-grid"]}>
      {items.map((i) => (
        <div key={i.title} className="">
          <h4 className="h3 tCaps" dangerouslySetInnerHTML={{__html:i.title}}></h4>
          <p className="text  tBlue">{i.text}</p>
        </div>
      ))}
    </div>
  );
}
