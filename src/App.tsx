import Button from "./components/Button"

function App() {

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Button text="Click me" onClick={() => console.log("Button clicked")} />
    </div>
  )
}

export default App
