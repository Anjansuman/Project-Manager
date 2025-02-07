
import { useRecoilValue } from "recoil";
import { ThemeState } from "../../../Atoms/ThemeState";
import { RefObject } from "react";


interface InputProps {
    inputRef: RefObject<HTMLInputElement>;
    placeholder: string;
    w?: string;
    h?: string;
    bg?: string;
}

export const Input = ({ inputRef, placeholder, w, h, bg }: InputProps) => {

    const theme_state = useRecoilValue(ThemeState);
    const theme = (theme_state.mode === 'light') ? theme_state.light : theme_state.dark;

    return <div>
        <input
            type="text"
            ref={inputRef}
            placeholder={placeholder}
            className={`flex justify-center rounded-md border-none px-3 text-md outline-none text-white`}
            style={{
                backgroundColor: `${bg ? bg : theme.light_panel_47}`,
                height: `${h || '34px'}`,
                width: `${w || '250px'}`
            }}    
        />
    </div>
}