import { useCallback, useEffect } from "react"
import { getMinuteStatePomodoro, usePomodoro } from "./hooks/pomodoro.hook"
import { useTimer } from "./hooks/timer.hook"

interface TitleProps {
  text: string
}

export function Title({ text }: TitleProps) {
  return <h1 className="font-bold text-2xl bg-blue-200 p-2">{text}</h1>
}


interface TimeProps {
  seconds: number
}

function formatTime(second: number) {
  const minutes = Math.floor(second / 60)
  const seconds = second % 60
  const secondsString = seconds < 10 ? `0${seconds}` : seconds

  return `${minutes}:${secondsString}`
}

export function Time({ seconds: second }: TimeProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 mt-4 text-4xl font-bold text-gray-700 bg-gray-200 p-4 rounded-lg w-48">
      <div>{formatTime(second)}</div>
    </div>
  )
}


export default function App() {
  const { seconds, action } = useTimer(0)
  const { goNextFase, pomodoro } = usePomodoro()

  const next_time = useCallback(() => {
    goNextFase()
    action.reset()
  }, [goNextFase, action])

  useEffect(
    () => {
      if (seconds > getMinuteStatePomodoro(pomodoro.state) * 60) {
        next_time()
      }
    }
    , [seconds, pomodoro.state, next_time])
  return (<div className="block">
    <Title text="Pomodoro" />
    <Time seconds={seconds} />
    <div>Estado: {pomodoro.state}</div>
    <div>Ciclo: {pomodoro.cycle}</div> 
  </div>)
}