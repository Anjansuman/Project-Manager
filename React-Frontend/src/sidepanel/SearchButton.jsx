import { useRecoilValue } from "recoil";

import { Theme_State } from "../Atoms/Theme_State";
import "./InsideSidePanel.css";

export function SearchButton() {


    const theme_state = useRecoilValue(Theme_State);
    const theme = (theme_state.mode == 'light') ? theme_state.light : theme_state.dark;


    return <div>
        <input type="text" placeholder="Search" className="searchBar"
            style={{ backgroundColor: theme.light_panel_47 }}
        />
    </div>
}