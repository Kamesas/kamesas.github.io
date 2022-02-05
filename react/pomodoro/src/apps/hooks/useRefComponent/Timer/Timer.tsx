import React, { FC, useEffect, useRef, useState } from "react";

interface iTimerProps {
  [key: string]: any;
}

export const Timer: FC<iTimerProps> = () => {
  const [time, setTime] = useState<number>();
  const timer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    timer.current = setTimeout(() => {
      setTime((prev) => prev);
    }, 1000);
  }, []);

  const getTime = (timeStamp: number) => {
    var timestamp = 9462;
    var hours = Math.floor(timestamp / 60 / 60);
    var minutes = Math.floor(timestamp / 60) - hours * 60;
    var seconds = timestamp % 60;
    return (
      hours.toString().padStart(2, "0") +
      ":" +
      minutes.toString().padStart(2, "0") +
      ":" +
      seconds.toString().padStart(2, "0")
    );
  };

  return (
    <div>
      <input type="time" onChange={(e) => setTime(e.timeStamp)} />
    </div>
  );
};
