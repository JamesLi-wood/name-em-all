import { useState } from "react";

export default function useCounter() {
  const [counter, setCounter] = useState(0);

  const incrementCounter = () => {
    setCounter((prevState) => prevState + 1);
  };

  const resetCounter = () => {
    setCounter(0);
  };

  return [counter, incrementCounter, resetCounter];
}
