import { Home } from "./Home_Page/Home_Page";
import { Nav } from "./navBar/Nav";
import { Panels } from "./Panels";

import { RecoilRoot } from "recoil";

function App() {
  return <RecoilRoot>
    <Home />
  </RecoilRoot>
}

export default App


// function App() {

//   return <div style = {{height: "100vh", width: "100vw", backgroundColor: "black", position: "fixed", top: 0, left: 0}}>
//     <div style = {{marginBottom: 10}}>
//       <Nav/>
//     </div>
//     <Panels/>
//   </div>
// }