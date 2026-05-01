import { useCallback, useEffect } from "react"
import { getMinuteStatePomodoro, usePomodoro } from "./hooks/pomodoro.hook"
import { useTimer } from "./hooks/timer.hook"
import Button from "./component/Button"
import useTheme from "./hooks/Theme"
import Select from "./component/Select"

interface TitleProps {
  text: string
  children?: React.ReactNode
}

export function Title({ text, children }: TitleProps) {
  return (
    <div className="flex flex-row items-center justify-between bg-primary px-4">
      <h1 className="font-bold text-2xl bg-primary p-2">{text}</h1>
      {children}
    </div>
  )
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

const themes = ["light", "dark", "system"] as const

function SelectTheme() {
  const { theme, toggleTheme } = useTheme()

  return <Select
    value={theme}
    onChange={toggleTheme}
    option={[...themes]}
  />
}

interface BackgroundAppProps {
  children: React.ReactNode
}
export function BackgroundApp({ children }: BackgroundAppProps) {
  return <div className="bg-[--color-bg]">
    {children}
  </div>
}

export default function App() {
  const { seconds, isRunning, action } = useTimer(0)
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
  return (
    <div className="block">
      <Title text="Pomodoro" >
        <SelectTheme />
      </Title>
      <Time seconds={seconds} />
      <div>Estado: {pomodoro.state}</div>
      <div>Ciclo: {pomodoro.cycle}</div>
      <div className="flex flex-row gap-2">
        <Button onClick={next_time}
          text="Siguiente Fase" />
        <Button onClick={isRunning ? action.stop : action.start}
          text={isRunning ? "Pausar" : "Reanudar"} />
      </div>
    </div>
  )
}