const TypeButton = {  
  danger: "bg-red-500 hover:bg-red-700 active:bg-red-900",
  primary: "bg-blue-500 hover:bg-blue-700 active:bg-blue-900",
  success: "bg-green-500 hover:bg-green-700 active:bg-green-900",
  warning: "bg-yellow-500 hover:bg-yellow-700 active:bg-yellow-900",
} as const

interface ButtonProps {
  onClick: () => void;
  text: string;
  type?: keyof typeof TypeButton;
}

export default function Button({ onClick, text, type="primary" }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`${TypeButton[type]} font-bold rounded-md px-2 py-1 border-2 border-transparent text-white`}
    >
      {text}
    </button>
  );
}
