import { Main_Element } from "./Main_Element/Main_Element";
import { Right_Element } from "./Right_Element";

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