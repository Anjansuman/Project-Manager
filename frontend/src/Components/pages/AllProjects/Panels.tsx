import { MainPanel } from "./MainPanel/MainPanel";
import { SidePanel } from "./SidePanel/SidePanel";

export function Panels() {

    const style = {
        display: "flex",
        justifyContent: "space-around",
        MarginTop: 15,
        MarginLeft: 15,
        Marginright: 15,
    }

    return <div style = {style}>
        <SidePanel/>
        <MainPanel/>
    </div>
}