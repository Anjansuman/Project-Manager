import { MainPanel } from "./MainPanel/MainPanel";
import { SidePanel } from "./SidePanel/SidePanel";
import { Project } from "./Project/ProjectPanel";

import { Outlet, useParams } from "react-router-dom";
import { NewProject } from "./MainPanel/AddNewProject/NewProject";

export function Panels() {

    const { title } = useParams();

    return <div className="flex justify-around mx-[15] mt-[15] ">
        <SidePanel/>
        <Outlet />
        {/* {title ? <Project /> : <MainPanel />} */}
        <NewProject />
    </div>
}