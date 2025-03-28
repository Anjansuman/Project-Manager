import { ThemeState } from "@/Atoms/ThemeState";

import { Maximize, Minimize } from "lucide-react"
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";


export const Fullscreen = () => {

    const [toggleButton, setToggleButton] = useState(false);

    const navigate = useNavigate();

    const theme_state = useRecoilValue(ThemeState);
    const theme = (theme_state.mode == 'light') ? theme_state.light : theme_state.dark;
    const invertedTheme = (theme_state.mode == 'light') ? theme_state.dark : theme_state.light;

    return <div className="sticky start-0 z-10 bottom-4 right-14 h-full flex justify-end items-end ">
        { !toggleButton && <Maximize className="cursor-pointer p-1.5 size-10 rounded-sm transition-colors duration-200 ease-in-out"
            onClick={() => {
                navigate("full-screen");
                setToggleButton(true)
            }}
            style={{
                color: theme.font_color
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = `${invertedTheme.card_img}40`}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = ''}
        /> }
        { toggleButton && <Minimize className="cursor-pointer p-1.5 size-10 rounded-sm transition-colors duration-200 ease-in-out"
            onClick={() => {
                navigate(-1);
                setToggleButton(false)
            }}
            style={{
                color: theme.font_color
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = `${invertedTheme.card_img}40`}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = ''}
        /> }
    </div>   
}