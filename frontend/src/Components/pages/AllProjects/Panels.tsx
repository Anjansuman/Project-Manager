import { MainPanel } from "./MainPanel/MainPanel";
import { SidePanel } from "./SidePanel/SidePanel";
import { Project } from "./Project/ProjectPanel";

import { useParams } from "react-router-dom";

export function Panels() {

    const { title } = useParams();

    return <div className="flex justify-around mx-[15] mt-[15] ">
        <SidePanel/>
        {title ? <Project /> : <MainPanel />}
    </div>
}