import "./Blocks.css";

export function Blocks() {
    
    return  <button className="block">
        <div style = {{display: "flex", justifyContent: "center"}}>
            <div className="image"></div>
        </div>
        <div className="insideBlock"></div>
    </button>
}