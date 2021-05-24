import "./App.css"
import Game from "./components/Game"

function App() {
  return (
    <div className="App">
      <h1>Conways game of life</h1>
      <Game size={100} speed={1000} />
    </div>
  )
}

export default App
