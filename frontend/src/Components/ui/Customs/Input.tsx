
import { useRecoilValue } from "recoil";
import { ThemeState } from "../../../Atoms/ThemeState";
import { RefObject } from "react";


interface InputProps {
    inputRef?: RefObject<HTMLInputElement>,
    placeholder: string,
    w?: string,
    h?: string,
    bg?: string,
    onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>
    inputType?: string
}

export const Input = ({ inputRef, placeholder, w, h, bg, onKeyDown, inputType }: InputProps) => {

    const theme_state = useRecoilValue(ThemeState);
    const theme = (theme_state.mode === 'light') ? theme_state.light : theme_state.dark;

    return <div className="h-full w-full">
        <input
            type={`${inputType}` || 'text'}
            ref={inputRef}
            placeholder={placeholder}
            className={`flex justify-center rounded-md border-none px-3 text-md outline-none text-white overflow-y-auto`}
            style={{
                backgroundColor: `${bg ? bg : theme.light_panel_47}`,
                height: `${h || '100%'}`,
                width: `${w || '100%'}`
            }}
            onKeyDown={onKeyDown}
        />
    </div>
}