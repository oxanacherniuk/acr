import React, { useEffect, useRef } from "react";
import type { JSX } from "react/jsx-runtime";
import "./scss/style.scss";
interface TextEffectProps {
  text: string;
  className?: string;
}

const TextEffect: React.FC<TextEffectProps> = ({ text, className }) => {
  const divRef = useRef<HTMLDivElement>(null);

    // Функция для удаления HTML-тегов
  const stripHtmlTags = (html: string): string => {
    return html.replace(/<[^>]*>/g, '');
  };

   const createLetterArray = (str: string): string[] => stripHtmlTags(str).split('');

  const createLetterLayers = (array: string[]): JSX.Element[][] => {
    return array.map((letter) => {
      const layers: JSX.Element[] = [];
      for (let i = 1; i <= 2; i++) {
        layers.push(
          <span key={i} className={`letter-${i}`}>
            {letter}
          </span>,
        );
      }
      return layers;
    });
  };

  const createLetterContainers = (arrays: JSX.Element[][]): JSX.Element[] => {
    return arrays.map((layers, index) => (
      <div key={index} className="wrapper">
        {layers}
      </div>
    ));
  };

  const createWordContainers = (text: string): JSX.Element[] => {
    const words = text.split(" ");
    return words
      .map((word, wordIndex) => {
        if (!word) return null;
        const letterArrays = createLetterArray(word);
        const layers = createLetterLayers(letterArrays);
        const containers = createLetterContainers(layers);
        return (
          <div key={wordIndex} className="word">
            {containers}
          </div>
        );
      })
      .filter((item): item is JSX.Element => Boolean(item));
  };

  const containers = createWordContainers(text);

  useEffect(() => {
    if (divRef.current) {
      // Set widths and heights
      const spans = divRef.current.querySelectorAll("span");
      spans.forEach((span) => {
        const parent = span.parentElement;
        if (parent) {
          parent.style.width = `${span.offsetWidth}px`;
          parent.style.height = `${span.offsetHeight}px`;
        }
      });

      // Apply kerning adjustments
      const fontStyle = window.getComputedStyle(divRef.current);
      const fontFamily = fontStyle.fontFamily;
      const fontSize = fontStyle.fontSize;
      const fontWeight = fontStyle.fontWeight;

      const measurer = document.createElement("span");
      measurer.style.position = "absolute";
      measurer.style.visibility = "hidden";
      measurer.style.whiteSpace = "nowrap";
      measurer.style.fontFamily = fontFamily;
      measurer.style.fontSize = fontSize;
      measurer.style.fontWeight = fontWeight;
      measurer.style.lineHeight = "1em"; // Match line-height
      document.body.appendChild(measurer);

      const words = divRef.current.querySelectorAll(".word");
      words.forEach((wordElem) => {
        const wrappers = Array.from(wordElem.querySelectorAll(".wrapper"));
        if (wrappers.length < 2) return;

        for (let i = 0; i < wrappers.length - 1; i++) {
          const letter1 =
            wrappers[i].querySelector(".letter-1")?.textContent || "";
          const letter2 =
            wrappers[i + 1].querySelector(".letter-1")?.textContent || "";

          measurer.textContent = letter1 + letter2;
          const pairWidth = measurer.offsetWidth;

          measurer.textContent = letter1;
          const w1 = measurer.offsetWidth;

          measurer.textContent = letter2;
          const w2 = measurer.offsetWidth;

          const kerning = pairWidth - w1 - w2;
          (wrappers[i + 1] as HTMLElement).style.marginLeft = `${kerning}px`;
        }
      });

      document.body.removeChild(measurer);

      // Animate
      const wrappers = divRef.current.querySelectorAll(".wrapper");
      let time = 250;
      wrappers.forEach((wrapper) => {
        time += 75;
        setTimeout(() => {
          wrapper.classList.add("visible");
        }, time);
      });
    }
  }, [text]);
  return (
    <>
      <div ref={divRef} className={`text-effect ${className || ""}`}>
        {containers}
      </div>
    </>
  );
};

export default TextEffect;
