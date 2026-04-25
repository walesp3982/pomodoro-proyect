import { useEffect, useState } from "react";

export function useTimer(start_seconds: number) {
  const [seconds, setSeconds] = useState(start_seconds);

  useEffect(() => {
    
    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return seconds
}