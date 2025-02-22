
import { useRecoilValue } from "recoil";
import { ThemeState } from "../../../Atoms/ThemeState";
import { RefObject } from "react";


interface InputBoxProps {
    inputRef?: RefObject<HTMLTextAreaElement>;
    placeholder?: string;
    w?: string;
    h?: string;
    bg?: string;
}

export const InputBox = ({ inputRef, placeholder, w, h, bg }: InputBoxProps) => {

    const theme_state = useRecoilValue(ThemeState);
    const theme = (theme_state.mode === 'light') ? theme_state.light : theme_state.dark;

    function onInput(event: React.FormEvent<HTMLTextAreaElement>) {
        const target = event.target as HTMLTextAreaElement;
        target.style.height = "auto";
        target.style.height =`${target.scrollHeight}px`;
    }

    return <div className=""
        style={{ height: h }}
    >
        <textarea
            ref={inputRef}
            placeholder={placeholder}
            className={`h-full rounded-md border-none px-3 text-md outline-none text-white resize-none overflow-y-scroll [::-webkit-scrollbar]:hidden [scrollbar-width:none]`}
            style={{
                backgroundColor: bg ? bg : theme.light_panel_47,
                // height: h || "100%",
                // width: w || "100%",
            }}
            onInput={onInput}
              
        ></textarea>
    </div>
}