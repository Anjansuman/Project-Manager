import "./InsideSidePanel.css";

export function Members() {
    return <div>
        <div className = "members">
            <div className = "profile"></div>
            <div className = "MemberName"></div>
            <div className = "active"></div> {/*this is for showing if the member is involved in any project or not*/}
        </div>
    </div>
}