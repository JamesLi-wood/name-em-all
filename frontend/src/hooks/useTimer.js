import { useState, useEffect, useRef } from "react";

export default function useTimer() {
  const [time, setTime] = useState(0);
  const intervalRef = useRef(null);

  const formatTime = () => {
    const hours = Math.floor(time / 3600)
      .toString()
      .padStart(2, "0");
    const minutes = Math.floor((time % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (time % 60).toString().padStart(2, "0");

    return `${hours}:${minutes}:${seconds}`;
  };

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTime((prevState) => prevState + 1);
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, []);

  const endTimer = () => {
    clearInterval(intervalRef.current);
  };

  return [formatTime, endTimer];
}
