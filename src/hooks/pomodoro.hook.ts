import { useState } from "react"

type PomodoroState = "work" | "break" | "long_break"

export function getMinuteStatePomodoro(state: PomodoroState): number {
    switch (state) {
        case "break":
            return 5
        case "long_break":
            return 15
        case "work":
            return 25
    }
}

function next_pomodoro(state: PomodoroState, cycle: number): PomodoroState {
    if (state == "break" || state == "long_break") {
        return "work"
    }
    if (cycle == 4) {
        return "long_break"
    }
    return "break"
}
export type PomodoroType = {
    state: PomodoroState,
    cycle: number,
}
export function usePomodoro() {
  const [pomodoro, setPomodoro] = useState<PomodoroType>({
    cycle:1,
    state:"work",
  })

  const goNextFase = () => {
    setPomodoro( prev => {
        const nextState = next_pomodoro(prev.state, prev.cycle)
        let nextCycle = prev.cycle

        if (prev.state != "work") {
            if (prev.cycle >= 4) nextCycle = 1
            else nextCycle = nextCycle + 1
        }

        return {
            cycle: nextCycle,
            state: nextState
        }
    })
  }


  return {pomodoro, goNextFase}

}