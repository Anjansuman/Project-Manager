import "./Nav.css";

export function Nav() {

    return <div className = "nav">
        <div className = "logoContainer">
            LOGO |
        </div>
        <div className = "inputContainer">
            <input type="text" placeholder = "Search" className = "input"/>
        </div>
        <div className = "buttons">
            <div>Home</div>
            <div>My Projects</div>
            <div>Messaging</div>
            <div>Notifications</div>
            <div>Me</div>
        </div>
        <div className = "hamburger"></div>
    </div>
}