import { Nav } from "./Components/Nav-Bar/Nav";
import { Panels } from "./Components/pages/AllProjects/Panels";
import { Home } from "./Components/pages/Home/Home";
import { Signup } from "./Components/pages/Signup/Signup";
import { Signin } from "./Components/pages/Signin/Signin";
import { Project } from "./Components/pages/AllProjects/Project/ProjectPanel";

import { ThemeState } from "./Atoms/ThemeState";

import { RecoilRoot, useRecoilValue } from "recoil";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

function App() {

  // use outlet to make nav bar stable and not render it on every call

  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>

            <Route path='/' element={<Home/>} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/signin' element={<Signin />} />

            <Route path='/projects/*' element={<ProjectLayout />} />

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
        <div className="text-red-500 font-bold text-6xl">
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

function ProjectLayout() {


  const theme_state = useRecoilValue(ThemeState);
  const theme = (theme_state.mode == 'light') ? theme_state.light : theme_state.dark;


  return <div className='h-[100vh] w-[100vw] fixed top-0 left-0 'style = {{ backgroundColor: theme.background }}>
    
    <div style = {{marginBottom : 10}}>
      <Nav/>
    </div>
    <Routes>
      <Route path="/" element={<Panels />} />
      <Route path=":title" element={<Panels />} />
    </Routes>
  </div>
}

export default App

