import "./Blocks.css";

import { useRecoilValue } from "recoil";
import { ThemeState } from "../../../../../Atoms/ThemeState";

interface PlusBlockProps {
    onAddBlock: () => void;
}

export function PlusBlock({ onAddBlock }: PlusBlockProps) {

    const theme_state = useRecoilValue(ThemeState);
    const theme = (theme_state.mode == 'light') ? theme_state.light : theme_state.dark;

    return <button className = "addButton"
    style={{ backgroundColor: theme.light_panel_47, color: theme.font_color }}
    onClick = {onAddBlock}>
        +
    </button>
}