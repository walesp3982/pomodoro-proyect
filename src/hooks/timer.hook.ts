import { useEffect, useState } from "react";

interface UseTimerReturn {
    seconds: number
    isRunning: boolean

    action: {
        start: () => void,
        reset: () => void,
        stop: () => void,
    }
}
export function useTimer(start_seconds: number = 0): UseTimerReturn {
    const [seconds, setSeconds] = useState(start_seconds);
    const [running, setRunning] = useState<boolean>(true);


    useEffect(() => {
        if (!running) return
        const interval = setInterval(() => {
            setSeconds((prev) => prev + 1)
        }, 1000)

        return () => clearInterval(interval)
    }, [running])

    return {
        seconds: seconds,
        isRunning: running,

        action: {
            start: () => setRunning(true),
            stop: () => setRunning(false),
            reset: () => setSeconds(0),
        }
    }
}