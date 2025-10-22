import { useEffect, useState } from "react";

export function useTypingTitle(fullText: string, speed = 100) {
  const [display, setDisplay] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < fullText.length) {
      const t = setTimeout(() => {
        setDisplay((p) => p + fullText[index]);
        setIndex((p) => p + 1);
      }, speed);
      return () => clearTimeout(t);
    }
  }, [index, fullText, speed]);

  return { display, index };
}