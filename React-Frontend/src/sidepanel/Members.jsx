import { useRecoilValue } from "recoil";
import { Theme_State } from "../Atoms/Theme_State";
import "./InsideSidePanel.css";

export function Members() {


    const theme_state = useRecoilValue(Theme_State);
    const theme = (theme_state.mode == 'light') ? theme_state.light : theme_state.dark;


    return <div>
        <div className = "members"
                style={{ backgroundColor: theme.light_panel_47 }}
            >
            <div className = "profile"
                style={{ backgroundColor: theme.light_panel_47 }}
            ></div>
            <div className = "MemberName"
                style={{
                    backgroundColor: theme.light_panel_47,
                    color: theme.font_color,
                }}
            >
                Anjan Suman
            </div>
            <div className = "active"></div> {/*this is for showing if the member is involved in any project or not*/}
        </div>
    </div>
}