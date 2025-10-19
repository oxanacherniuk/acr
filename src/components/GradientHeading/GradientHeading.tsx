import React, { useEffect, useRef } from "react";
import "./style.css";

type Track = "element" | "viewport";
type Theme = "onWhite" | "onDark";

export type GradientHeadingProps = {
  as?: keyof React.JSX.IntrinsicElements;
  theme?: Theme;
  track?: Track;
  className?: string;
  children: React.ReactNode;

  // металл/лампа
  baseAngle?: number;    // базовый угол металла (deg, без 'deg' в значении)
  intensity?: number;    // 0..1 — общая яркость
  lampSize?: number;     // 0.12..0.6 — доля диагонали → радиус ядра
  haloScale?: number;    // 1.2..3 — ореол больше ядра
  safeMargin?: number;   // 0..0.5 — не подпускать к краям

  // недостающие из эффекта:
  specular?: number;     // сила ядра (множитель)
  halo?: number;         // сила ореола (множитель)
  blueBoost?: number;    // оттенок в ореоле 0..1
  waveShiftFactor?: number; // px — фазовый сдвиг «волн» (мы переводим в %)
};

export default function GradientHeadingLite({
  as = "h1",
  theme = "onDark",
  track = "element",
  className,
  children,

  baseAngle = 0,
  intensity = 0.85,
  lampSize = 0.32,
  haloScale = 2.0,
  safeMargin = 0.06,

  // добавлены дефолты
  specular = 1.0,
  halo = 0.6,
  blueBoost = 1.0,
  waveShiftFactor = 140,
}: GradientHeadingProps) {
  const Tag = as as any;
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof window === "undefined") return; // на всякий случай для SSR

    // --- helpers ---
    const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
    const clampSafe = (v: number) => clamp(v, safeMargin, 1 - safeMargin);
    const pct = (v: number) => `${(v * 100).toFixed(2)}%`;

    // --- размеры из геометрии ---
    const updateSizes = () => {
      const r = el.getBoundingClientRect();
      const diag = Math.hypot(r.width, r.height);

      const coreR = diag * clamp(lampSize, 0.12, 0.6);
      const haloR = coreR * clamp(haloScale, 1.2, 3);

      el.style.setProperty("--lampR", `${coreR.toFixed(1)}px`);
      el.style.setProperty("--lampR2", `${haloR.toFixed(1)}px`);

      // если используешь где-то шаг
      const stepPx = Math.max(12, Math.min(28, r.height * 0.12));
      el.style.setProperty("--wStep", `${stepPx.toFixed(1)}px`);
    };
    updateSizes();
    const ro = new ResizeObserver(updateSizes);
    ro.observe(el);

    // --- статические ручки ---
    el.style.setProperty("--angle", `${baseAngle}`);
    el.style.setProperty("--lintSpec", `${intensity * specular}`);
    el.style.setProperty("--lintHalo", `${intensity * halo}`);
    el.style.setProperty("--blue", `${blueBoost}`);

    // старт — центр
    const resetCenter = () => {
      el.style.setProperty("--posX", `50%`);
      el.style.setProperty("--posY", `50%`);
      el.style.setProperty("--posX2", `50%`);
      el.style.setProperty("--posY2", `50%`);
      el.style.setProperty("--posX3", `50%`);
      el.style.setProperty("--posY3", `50%`);
      el.style.setProperty("--shiftX", `0%`);
    };
    resetCenter();

    // px → %
    const pxToPctX = (px: number) => {
      const w = Math.max(1, el.getBoundingClientRect().width);
      return `${((px / w) * 100).toFixed(2)}%`;
    };
    const pxToPctY = (px: number) => {
      const h = Math.max(1, el.getBoundingClientRect().height);
      return `${((px / h) * 100).toFixed(2)}%`;
    };

    // применить позицию
    const applyAt = (x01: number, y01: number) => {
      const x = clampSafe(x01);
      const y = clampSafe(y01);

      // базовая лампа
      el.style.setProperty("--posX", pct(x));
      el.style.setProperty("--posY", pct(y));

      // «волны» — просто мягкие дымки со сдвигом (не repeating!)
      const phase = (x - 0.5) * waveShiftFactor + (y - 0.5) * (waveShiftFactor * 0.35);

      // волна 1
      el.style.setProperty("--posX2", `calc(${pct(x)} + ${pxToPctX(phase)})`);
      el.style.setProperty("--posY2", `calc(${pct(y)} + ${pxToPctY(phase * 0.20)})`);

      // волна 2
      el.style.setProperty("--posX3", `calc(${pct(x)} - ${pxToPctX(phase * 0.35)})`);
      el.style.setProperty("--posY3", `calc(${pct(y)} + ${pxToPctY(phase * 0.50)})`);

      // металл: лёгкий сдвиг + опциональный поворот
      const shift = (x - 0.5) * 26;
      el.style.setProperty("--shiftX", `${shift}%`);

      const angle = baseAngle + (x - 0.5) * 28;
      el.style.setProperty("--angle", `${angle}`);
    };

    // --- обработчики ---
    const onMoveViewport = (e: MouseEvent | TouchEvent) => {
      if (e instanceof MouseEvent) {
        applyAt(e.clientX / window.innerWidth, e.clientY / window.innerHeight);
      } else if ("touches" in e && e.touches?.[0]) {
        const t = e.touches[0];
        applyAt(t.clientX / window.innerWidth, t.clientY / window.innerHeight);
      }
    };

    const onMoveElement = (e: MouseEvent | TouchEvent) => {
      const r = el.getBoundingClientRect();
      if (e instanceof MouseEvent) {
        applyAt((e.clientX - r.left) / r.width, (e.clientY - r.top) / r.height);
      } else if ("touches" in e && e.touches?.[0]) {
        const t = e.touches[0];
        applyAt((t.clientX - r.left) / r.width, (t.clientY - r.top) / r.height);
      }
    };

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const opts = { passive: true } as AddEventListenerOptions;

    if (track === "viewport") {
      window.addEventListener("mousemove", onMoveViewport as any, opts);
      window.addEventListener("touchmove", onMoveViewport as any, opts);
      window.addEventListener("mouseout", resetCenter as any, opts);
    } else {
      el.addEventListener("mousemove", onMoveElement as any, opts);
      el.addEventListener("touchmove", onMoveElement as any, opts);
      el.addEventListener("mouseleave", resetCenter as any, opts);
    }

    if (prefersReduced) {
      resetCenter();
      el.style.setProperty("--lintSpec", `${0.5 * intensity}`);
      el.style.setProperty("--lintHalo", `${0.35 * intensity}`);
    }

    return () => {
      ro.disconnect();
      if (track === "viewport") {
        window.removeEventListener("mousemove", onMoveViewport as any);
        window.removeEventListener("touchmove", onMoveViewport as any);
        window.removeEventListener("mouseout", resetCenter as any);
      } else {
        el.removeEventListener("mousemove", onMoveElement as any);
        el.removeEventListener("touchmove", onMoveElement as any);
        el.removeEventListener("mouseleave", resetCenter as any);
      }
    };
  }, [
    track,
    baseAngle,
    blueBoost,
    intensity,
    lampSize,
    haloScale,
    safeMargin,
    specular,
    halo,
    waveShiftFactor,
    theme,
  ]);

  const themeClass = theme === "onDark" ? "text-silver-blue-dark" : "text-logo-on-white";

  return (
    <Tag ref={ref as any} className={`glossy-lite ${themeClass} ${className ?? ""}`}>
      {children}
    </Tag>
  );
}
