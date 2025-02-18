import { MainPanel } from "./MainPanel/MainPanel";
import { SidePanel } from "./SidePanel/SidePanel";
import { Project } from "./Project/ProjectPanel";

import { useLocation } from "react-router-dom";

export function Panels() {

    const style = {
        display: "flex",
        justifyContent: "space-around",
        MarginTop: 15,
        MarginLeft: 15,
        Marginright: 15,
    }

    const location = useLocation();
    const isProjectPanel = location.pathname.startsWith("/projects/");

    return <div style = {style}>
        <SidePanel/>
        {isProjectPanel ? <Project /> : <MainPanel />}
    </div>
}