import { Nav } from "./Components/Nav-Bar/Nav";
import { Panels } from "./Components/pages/AllProjects/Panels";
import { Home } from "./Components/pages/Home/Home";

import { RecoilRoot, useRecoilValue } from "recoil";
import { ThemeState } from "./Atoms/ThemeState";

import { BrowserRouter, Routes, Route, Link, Outlet } from "react-router-dom";

function App() {

  // use outlet to make nav bar stable and not render it on every call

  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>

            <Route path='/' element={<Home/>} />
            <Route path='/projects' element={<Project_Panel/>} />
            <Route path='*' element={<ErrorPage />} />

        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  )
}

function ErrorPage() {


  const theme_state = useRecoilValue(ThemeState);
  const theme = (theme_state.mode == 'light') ? theme_state.light : theme_state.dark;

  // make the theme and font according to theme_state

  return <div className="h-[100vh] w-[100%] flex justify-center items-center "
      style={{ backgroundColor: theme.background }}
  >
      <div>
        <div className="text-red-500 font-semibold text-6xl">
          ERROR 404!
        </div>
        <div className="flex justify-center text-xl"
          style={{ color: theme.font_color }}
        >
          Page not found.
        </div>
      </div>
  </div>
}

function Project_Panel() {


  const theme_state = useRecoilValue(ThemeState);
  const theme = (theme_state.mode == 'light') ? theme_state.light : theme_state.dark;


  return <div className='h-[100vh] w-[100vw] fixed top-0 left-0 'style = {{ backgroundColor: theme.background }}>
    
    <div style = {{marginBottom : 10}}>
      <Nav/>
    </div>
    <Panels/>
  </div>
}

export default App

