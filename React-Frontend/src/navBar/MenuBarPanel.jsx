import "./MenuBar.css";

export function MenuBarPanel({ AddMember }) {

    return <>
        <div className="menuBarPanel">
            <div className = "menuButton" onClick={AddMember}>Add Member</div>
            <div className = "menuButton">Meeting</div>
        </div>
    </>
}