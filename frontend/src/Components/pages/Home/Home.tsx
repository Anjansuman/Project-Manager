import { Main_Element } from "./MainElement/MainElement";

import { useRecoilValue } from "recoil";
import { ThemeState } from "../../../Atoms/ThemeState";

export function Home() {

    const theme_state = useRecoilValue(ThemeState);
    const theme_mode = theme_state.mode;
    const theme = (theme_mode == 'light') ? theme_state.light : theme_state.dark;

    return <div className={`h-screen font-[sans]`}
        style={{ backgroundColor: theme.background }}
    >
        <Main_Element />
    </div>
}

// try adding grid for making your home page look good
// like use total grid-cols-4
// and for left and right panels use grid-1
// and for middle panel use grid-2
// and and and make the grid as a variable and pass it down to main-element and side-element from the home-page

// [value, setVAlue]