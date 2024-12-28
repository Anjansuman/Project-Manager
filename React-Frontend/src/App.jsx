import { Nav } from "./navBar/Nav";
import { Panels } from "./Panels";

function App() {

  return <div style = {{height: "100vh", width: "100vw", backgroundColor: "black", position: "fixed", top: 0, left: 0}}>
    <div style = {{marginBottom: 10}}>
      <Nav/>
    </div>
    <Panels/>
  </div>
}

export default App
