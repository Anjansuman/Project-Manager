import "./Blocks.css";

import { useRecoilValue } from "recoil";
import { Theme_State } from "../../Atoms/Theme_State";

export function PlusBlock({ onAddBlock }) {

    const theme_state = useRecoilValue(Theme_State);
    const theme = (theme_state.mode == 'light') ? theme_state.light : theme_state.dark;

    return <button className = "addButton"
    style={{ backgroundColor: theme.light_panel_47, color: theme.font_color }}
    onClick = {onAddBlock}>
        +
    </button>
}