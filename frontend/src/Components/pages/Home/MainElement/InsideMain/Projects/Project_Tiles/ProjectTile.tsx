import { useRecoilValue } from "recoil";
import { ThemeState } from "../../../../../../../Atoms/ThemeState";


export const Project_Tile = () => {


        const theme_state = useRecoilValue(ThemeState);
    const theme = (theme_state.mode == 'light') ? theme_state.light : theme_state.dark;


    return <div>
        <div className="h-[100%] w-48 bg-[#653AD847] rounded-3xl mr-2 pt-6 cursor-pointer">
            <div className="flex justify-center mb-4">
                <div className="h-24 w-24 bg-[#653AD847] rounded-full shadow-lg flex justify-center items-center">
                    <div className="h-[90px] w-[90px] bg-[#653AD847] rounded-full shadow-lg flex justify-center items-center"></div>
                </div>
            </div>
            <div className="flex justify-center text-center text-[17px] font-bold mb-4"
                style={{ color: theme.font_color }}
            >
                Creative Thinking
            </div>
            <div className="flex justify-center">
                <div className="h-3 w-32 rounded-full"
                    style={{ backgroundColor: theme.dark_panel }}
                >
                    {/* here, make width length as variable and take input from the project details to show the completion bar */}
                    <div className="h-[100%] w-[40%] bg-[#653AD8] rounded-full "></div>
                </div>
            </div>
        </div>
    </div>
}