import { MainPanel } from "./mainpanel/MainPanel";

export function Panels() {

    const style = {
        display: "flex",
        justifyContent: "space-around",
        MarginTop: 15,
        MarginLeft: 15,
        Marginright: 15,
    }

    return <div style = {style}>
        <MainPanel/>
    </div>
}