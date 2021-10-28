import { useState } from "react"
import "./App.css"
import Game from "./components/Game"

function App() {
  const [speed, setSpeed] = useState(0)
  return (
    <div
      className="App"
      style={{
        height: "100vh",
        width: "100vw",
      }}
    >
      <h1>Conways game of life</h1>
      <Game size={50} speed={speed} />
      Speed: <input type="number" value={speed} onChange={event => setSpeed(parseInt(event.target.value))} />
    </div>
  )
}

export default App
