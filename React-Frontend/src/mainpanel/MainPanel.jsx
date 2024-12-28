import "./MainPanel.css";

export function MainPanel() {
    return <div className="panel">
        <div className="title">
            Projects
        </div>
        <div>
            <button className="block">
                <div style = {{display: "flex", justifyContent: "center"}}>
                    <div className="image"></div>
                </div>
                <div className="insideBlock"></div>
            </button>
        </div>
    </div>
}