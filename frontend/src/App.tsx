import { Nav } from "./Components/Nav-Bar/Nav";
// import { Panels } from "./Components/pages/AllProjects/Panels";
import { Home } from "./Components/pages/Home/Home";
import { Signup } from "./Components/pages/Signup/Signup";
import { Signin } from "./Components/pages/Signin/Signin";
import { ProjectPanel } from "./Components/pages/AllProjects/Project/ProjectPanel";

import { ThemeState } from "./Atoms/ThemeState";

import { RecoilRoot, useRecoilValue } from "recoil";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { MainPanel } from "./Components/pages/AllProjects/MainPanel/MainPanel";
import { SidePanel } from "./Components/pages/AllProjects/SidePanel/SidePanel";
import { NewProject } from "./Components/pages/AllProjects/MainPanel/AddNewProject/NewProject";
import { ErrorProject } from "./Components/pages/AllProjects/ErrorProject/ErrorProject";
import { NewOrg } from "./Components/pages/AllProjects/MainPanel/Org/NewOrg";
import { OrgMembers } from "./Components/pages/AllProjects/MainPanel/Org/OrgMembers";
import { FileData } from "./Components/pages/AllProjects/Project/FileData/FileData";
import { Canvas } from "./Components/pages/AllProjects/Canvas/Canvas";
import { ProjectData } from "./Components/pages/AllProjects/Project/ProjectData/ProjectData";

function App() {


  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
            <Route index path="eject/:name" element={<Home />} />
            <Route path="eject/signup" element={<Signup />} />
            <Route path="eject/signin" element={<Signin />} />

            {/* Group project-related routes under ProjectLayout */}
            <Route path="eject/:name/:organization/*" element={<MainLayout />}>
                <Route index element={<MainPanel />} />
                <Route path=":projectTitle/*" element={<ProjectPanel />} >
                  <Route index element={<ProjectData />} />
                  <Route path=":fileTitle/*" element={<ProjectData />} />
                  <Route path="canvas" element={<Canvas />} />
                </Route>
                <Route path="members" element={<OrgMembers />} />
                <Route path="new-project" element={<NewProject />} />
                <Route path="*" element={<ErrorProject />} />
            </Route>

            <Route path="eject/:name/new-organization" element={<NewOrganization />} />

            <Route path="*" element={<ErrorPage />} />
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

function NewOrganization() {

  const theme_state = useRecoilValue(ThemeState);
  const theme = theme_state.mode === "light" ? theme_state.light : theme_state.dark;

  return <div className="h-[100vh] w-[100vw] overflow-hidden" style={{ backgroundColor: theme.background }}>
      <div style={{ marginBottom: 10 }}>
        <Nav />
      </div>
      <div className="flex justify-around mx-[15] mt-[15]">
        <NewOrg />
      </div>
  </div>
}

export function MainLayout() {

  const theme_state = useRecoilValue(ThemeState);
  const theme = theme_state.mode === "light" ? theme_state.light : theme_state.dark;

  
  return (
      <div className="h-[100vh] w-[100vw] overflow-hidden" style={{ backgroundColor: theme.background }}>
          <div style={{ marginBottom: 10 }}>
              <Nav />
          </div>

          <div className="flex justify-around mx-[15] mt-[15]">
              {/* <SidePanel /> */}
              <Outlet /> {/* Dynamically render the correct component here */}
          </div>
      </div>
  );
}

export function ProjectLayout() {

  const theme_state = useRecoilValue(ThemeState);
  const theme = theme_state.mode === "light" ? theme_state.light : theme_state.dark;

  return <div className="h-full w-full overflow-hidden" style={{ backgroundColor: theme.background }}>
    <div className="mb-[10px] "></div>
    <div className="flex justify-around mx-[15] mt-[15] ">
      <SidePanel />
      <Outlet />
    </div>
  </div>
}


export default App

