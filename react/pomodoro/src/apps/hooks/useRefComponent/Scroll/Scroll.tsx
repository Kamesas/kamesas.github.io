import React, { FC, useEffect, useRef, useState } from "react";
import "./Scroll.scss";

interface iScrollProps {
  [key: string]: any;
}

export const Scroll: FC<iScrollProps> = () => {
  const [blocks, setBlocks] = useState<number>(0);
  const refScroll = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    console.log("refScroll", refScroll.current);
    refScroll.current?.addEventListener("scroll", (e) => {
      console.log("scroll");
    });
  }, []);

  console.log("blocks", blocks);

  return (
    <div className="Scroll" ref={refScroll}>
      <h1>Scroll ref</h1>
      <button onClick={() => setBlocks((prev) => prev + 1)}>Add block</button>

      {Array(blocks)
        .fill(true)
        .map((_, i) => {
          return (
            <div key={i} className="Scroll-block">
              {i}
            </div>
          );
        })}
    </div>
  );
};
