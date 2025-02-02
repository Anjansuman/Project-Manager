import { Main_Element } from "./Main_Element/Main_Element";

import { useRecoilValue } from "recoil";
import { Theme_State } from "../Atoms/Theme_State";

export function Home() {

    const theme_state = useRecoilValue(Theme_State);
    const theme_mode = theme_state.mode;
    const theme = (theme_mode == 'light') ? theme_state.light : theme_state.dark;

    return <div className={`h-screen`}
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