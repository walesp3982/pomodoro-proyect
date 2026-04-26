interface ButtonProps {
  onClick: () => void;
  text: string;
}

export default function Button({ onClick, text }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className="font-bold bg-amber-600 text-white rounded-md px-2 py-1 border-transparent border-2
            hover:text-amber-500 hover:border-amber-500 hover:bg-transparent
            active:text-amber-600 active:border-amber-600 active:bg-transparent
            "
    >
      {text}
    </button>
  );
}
