import { useCallback, useEffect, useState } from "react"
import { getMinuteStatePomodoro, usePomodoro } from "./hooks/pomodoro.hook"
import { useTimer } from "./hooks/timer.hook"
import Button from "./component/Button"
import useTheme from "./hooks/Theme"
import Select from "./component/Select"

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

const themes = ["light", "dark", "system"] as const

function SelectTheme() {
  const { theme, toggleTheme } = useTheme()

  return <Select
    value={theme}
    onChange={toggleTheme}
    option={[...themes]}
    label="Tema"
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
  const [modeDark, setModeDark] = useState<boolean>(false);

  const changeMode = () => {
    setModeDark(prev => !prev)
  }

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
    <BackgroundApp>
      <div className="block" data-theme={modeDark && "dark"}>
        <Button onClick={changeMode} text="Cambiar Modo" type="warning" />
        <Title text="Pomodoro" />
        <Time seconds={seconds} />
        <div>Estado: {pomodoro.state}</div>
        <div>Ciclo: {pomodoro.cycle}</div>
        <div className="flex flex-row gap-2">
          <Button onClick={next_time}
            text="Siguiente Fase" />
          <Button onClick={isRunning ? action.stop : action.start}
            text={isRunning ? "Pausar" : "Reanudar"} />
        </div>
        <div>
          <SelectTheme />
        </div>

      </div>
    </BackgroundApp>)
}