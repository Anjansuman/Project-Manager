import "./MenuBar.css";

import { useRecoilValue } from "recoil";
import { Theme_State } from "../Atoms/Theme_State";

export function MenuBarPanel({ AddMember }) {


    const theme_state = useRecoilValue(Theme_State);
    const theme = (theme_state.mode == 'light') ? theme_state.light : theme_state.dark;


    return <>
        <div className="menuBarPanel"
            style={{
                backgroundColor: theme.dark_panel,
                border: '1px solid',
                borderColor: theme.light_border
            }}>
            <div className = "menuButton" onClick={AddMember}
                style={{
                    backgroundColor: theme.light_panel_47,
                    color: theme.font_color
                }}>
                    Add Member</div>
            <div className = "menuButton"
                style={{
                    backgroundColor: theme.light_panel_47,
                    color: theme.font_color
                }}>
                    Meeting</div>
        </div>
    </>
}