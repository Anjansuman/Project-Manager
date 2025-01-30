import { useRecoilValue } from "recoil";
import { Theme_State } from "../../../../../Atoms/Theme_State";


export const Notification_Tile = () => {


    const theme_state = useRecoilValue(Theme_State);
    const theme = (theme_state.mode == 'light') ? theme_state.light : theme_state.dark;


    return <div className="h-20 w-[100%] bg-[#653AD847] shadow-2xl mb-0.5 p-3 rounded-lg flex items-center cursor-pointer overflow-hidden transition-all duration-300" 
        style={{ color: theme.font_color }}
    >
        <div className="h-16 w-16 mr-3 bg-[#653AD847] rounded-full shadow-lg flex justify-center items-center">
            <div className="h-14 w-14 bg-[#653AD847] rounded-full shadow-lg flex justify-center items-center"></div>
        </div>
        <div>
            <div className="text-lg font-bold">Anjan</div>
            <div className="text-xs">sent a message.</div>
        </div>
    </div>
}