import { useCallback, useEffect } from "react"
import { getMinuteStatePomodoro, getTextPomodoro, usePomodoro } from "./hooks/pomodoro.hook"
import { useTimer } from "./hooks/timer.hook"
import Button from "./component/Button"
import useTheme from "./hooks/Theme"
import Select from "./component/Select"
import { useAlarm } from "./hooks/useAlarm"

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
    <div className="flex flex-col items-center justify-center gap-2 bg-success dark:bg-background rounded-2xl h-full w-full border-success border-2">
      <div className="text-7xl font-bold text-slate-100 dark:text-text ">{formatTime(second)}</div>
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

export default function App() {
  const { seconds, isRunning, action } = useTimer(0)
  const { goNextFase, pomodoro } = usePomodoro()
  const { playAlarm } = useAlarm();

  const next_time = useCallback(() => {
    goNextFase()
    playAlarm(pomodoro.state === "work" ? "work" : "break")
    action.reset()
  }, [goNextFase, action, pomodoro.state, playAlarm])

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
      <div className="mt-5">

      </div>
      <div className="flex flex-col gap-4 items-center px-4">
        <div className="flex flex-row rounded-2xl justify-center items-center border-2 border-orange-500 bg-orange-500 max-w-3xl w-full p-5 dark:bg-transparent dark:border-orange-400">
          <div className="flex flex-row justify-between w-full items-center text-2xl font-bold text-slate-100 dark:text-text">
            <div className="dark:text-orange-400">ETAPA: </div>
            <div>{getTextPomodoro(pomodoro.state)}</div>
          </div>
        </div>
        <div className="w-full max-w-3xl">
          <div className="grid grid-cols-3 gap-3 p-3 min-h-70 max-w-3xl">
            <div className="col-span-2">
              <Time seconds={seconds} />
            </div>
            <div className="col-span-1">
              <div className="flex flex-col justify-between gap-3 h-full">
                <div className="flex flex-col gap-3 ">
                  <Button onClick={next_time}
                    text="Siguiente Fase" />
                  <Button onClick={isRunning ? action.stop : action.start}
                    text={isRunning ? "Pausar" : "Reanudar"}
                    type={isRunning ? "success" : "warning"} />
                </div>
                <div className="rounded-md border-2 border-transparent text-slate-100 font-bold bg-purple-500 p-2 dark:bg-background dark:border-purple-500">
                  <div>Ciclo <br />{pomodoro.cycle} de 4</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>





    </div>
  )
}