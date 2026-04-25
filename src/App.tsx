import { useTimer } from "./hooks/timer.hook"

interface TitleProps {
  text: string
}

export function Title({text}: TitleProps) {
  return <h1 className="font-bold text-2xl">{text}</h1>
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

export function Time({seconds: second}: TimeProps) {
  return <div>
    <p>{formatTime(second)}</p>
  </div>
}

export default function App() {
  const seconds = useTimer(0)
  
  return (<div>
    <Title text="Pomodoro" />
    <Time seconds={seconds} />
  </div>)
}