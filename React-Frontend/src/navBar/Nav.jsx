import "./Nav.css";

export function Nav() {

    return <div className = "nav">
        <div className = "logoContainer">
            LOGO |
        </div>
        <div className = "inputContainer">
            <input type="text" placeholder = "Search" className = "input"/>
        </div>
        <div className = "buttons"> {/* this div is for storing buttons*/}
            <div className="button">Home</div>
            <div className="button">My Projects</div>
            <div className="button">Messaging</div>
            <div className="button">Notifications</div>
            <div className="button">Me</div>
        </div>
        <div className = "hamburger"></div>
    </div>
}