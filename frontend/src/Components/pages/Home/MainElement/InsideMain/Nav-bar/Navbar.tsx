import { Button_Container } from "./Buttons/ButtonContainer";

import { useRecoilValue } from "recoil";
import { ThemeState } from "../../../../../../Atoms/ThemeState";

export const Navbar = () => {


    const theme_state = useRecoilValue(ThemeState);
    const theme = (theme_state.mode == 'light') ? theme_state.light : theme_state.dark;


    return <div className="h-[100%] w-[100%] border-2 border-[#653AD8] rounded-3xl"
        style={{
            borderColor: theme.light_border,
            color: theme.default_font_color,
        }}
    >
        <Button_Container/>

    </div>
}