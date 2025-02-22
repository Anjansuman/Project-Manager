import { useRecoilValue } from "recoil";
import { ThemeState } from "../../../../Atoms/ThemeState";


export const ErrorProject = () => {

    const theme_state = useRecoilValue(ThemeState);
    const theme = (theme_state.mode == 'light') ? theme_state.light : theme_state.dark;

    return <div className = "h-auto w-[70%] border rounded-[14px] p-[25.2px] m-[15px] flex items-center justify-center "
    style = {{
        backgroundColor:  theme.dark_panel,
        borderColor: theme.gray_border
    }}
>
        <div>
            <div className="text-red-500 font-bold text-6xl">
            ERROR 404!
            </div>
            <div className="flex justify-center text-xl"
            style={{ color: theme.font_color }}
            >
            Project not found.
            </div>
        </div>
    </div>
}