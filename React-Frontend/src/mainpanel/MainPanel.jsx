import "./MainPanel.css";
import { Blocks } from "./Blocks";

export function MainPanel() {
    return <div className="panel">
        <div className="title">
            Projects
        </div>
        <div>
            <Blocks/>
        </div>
    </div>
}