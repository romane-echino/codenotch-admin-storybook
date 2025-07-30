
interface ButtonProps {
  text: string
  onClick: () => void
}

function Button({ text, onClick }: ButtonProps) {
  return <button className="bg-blue-500 text-white p-2 rounded-md" onClick={onClick}>{text}</button>
}

export default Button
