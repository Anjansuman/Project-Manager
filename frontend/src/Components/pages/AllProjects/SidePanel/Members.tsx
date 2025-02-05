import { useRecoilValue } from "recoil";
import { ThemeState } from "../../../../Atoms/ThemeState";

export const Members = () => {


    const theme_state = useRecoilValue(ThemeState);
    const theme = (theme_state.mode == 'light') ? theme_state.light : theme_state.dark;


    return <div>
        <div className = "h-12 w-99 p-3 bg-transparent rounded-lg flex items-center cursor-pointer"
                style={{ backgroundColor: theme.light_panel_47 }}
            >
            <div className = "h-8 w-8 rounded-full bg-gray-500 mx-3"
                style={{ backgroundColor: theme.light_panel_47 }}
            ></div>
            <div className = "h-[30px] w-[70%] rounded-lg px-2.5 mr-4 flex items-center text-left"
                style={{
                    backgroundColor: theme.light_panel_47,
                    color: theme.font_color,
                }}
            >
                Anjan Suman
            </div>
            <div className = "h-[10px] w-[10px] rounded-full bg-red-500"></div> {/*this is for showing if the member is involved in any project or not*/}
        </div>
    </div>
}