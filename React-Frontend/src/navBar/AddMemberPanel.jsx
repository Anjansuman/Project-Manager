import "./AddMemberPanel.css";
import { ImageInput } from "./ImageInput";

export function AddMemberPanel({ Done, Cancel }) {
    return <div className = "AddMemberPanel">
        <div className="member-panel-cross" onClick={Cancel}>
            x
        </div>
        <div className="profileImageContainer">
            <ImageInput/>
        </div>
        <div className="nameInput">
            Name
            <input type="text" placeholder="Name" className="input-member"/>
        </div>
        <div className = "domain">
            Domain
            <input type="text" placeholder="Domain" className = "input-member"/>
        </div>
        <div>
            Description
            <textarea placeholder="Description" className="Description"></textarea>
        </div>
        <div style = {{display: "flex", justifyContent: "center"}}>
            <button className="submit-button" onClick={Done}>
                Done
            </button>
        </div>
    </div>
}