import { useEffect, useRef } from "react";

type Keys<T extends string> = Record<T, HTMLButtonElement | null>;

export function useCenteredTabs<T extends string>(active: T, isMobile: boolean) {
  const headerRef = useRef<HTMLDivElement>(null);
  const btnRefs = useRef<Keys<T>>({} as Keys<T>);

  useEffect(() => {
    if (!isMobile || !headerRef.current) return;
    const el = btnRefs.current[active];
    if (!el) return;
    const container = headerRef.current;
    const offset = el.offsetLeft - container.clientWidth / 2 + el.clientWidth / 2;
    container.scrollTo({ left: offset, behavior: "smooth" });
  }, [active, isMobile]);

  return { headerRef, btnRefs } as const;
}