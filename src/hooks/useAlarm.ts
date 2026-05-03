import { useCallback, useRef } from "react";

export function useAlarm() {
    const ctxRef = useRef<AudioContext | null>(null);
    const getCtx = () => {
        if (!ctxRef.current || ctxRef.current.state === "closed") {
            ctxRef.current = new AudioContext();
        }
        return ctxRef.current;
    }

    const playAlarm = useCallback((type: "work"|"break" = "work") => {
        const ctx = getCtx();
        ctx.resume().then(() => {
            const config = {
                work: {freq: 880, beeps: 10, interval: 0.2},
                break: {freq: 440, beeps: 5, interval: 0.4}
            }[type];

            Array.from({length: config.beeps}).forEach((_, i) => {
                const osc = ctx.createOscillator();
                const offset = i * config.interval;
                const gain = ctx.createGain();

                osc.connect(gain);
                gain.connect(ctx.destination);

                osc.type = "sine";
                osc.frequency.value = config.freq;

                gain.gain.setValueAtTime(0.8, ctx.currentTime + offset);
                gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + offset + 0.3);
                osc.start(ctx.currentTime + offset);
                osc.stop(ctx.currentTime + offset + 0.3);
            })
        })
    }, []);

    return {playAlarm};
}