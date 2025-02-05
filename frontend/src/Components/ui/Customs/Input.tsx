
import { useRecoilValue } from "recoil";
import { ThemeState } from "../../../Atoms/ThemeState";


interface InputProps {
    inputRef: () => void;
    placeholder: string;
}

export const Input = ({ inputRef, placeholder }: InputProps) => {

    const theme_state = useRecoilValue(ThemeState);
    const theme = (theme_state.mode === 'light') ? theme_state.light : theme_state.dark;

    return <div>
        <input
            type="text"
            ref={inputRef}
            placeholder={placeholder}
            className="h-[34px] w-[250px] flex justify-center bg-[#38434f] rounded-md border-none px-2 text-sm outline-none text-white"
            style={{
                backgroundColor: theme.light_panel_47
            }}    
        />
    </div>
}