import { ThemeState } from "@/Atoms/ThemeState";
import { useRecoilValue } from "recoil";
import { Fullscreen } from "./Components/Fullscreen";
import { ToolBar } from "./Components/ToolBar";
import { RoomCanvas } from "./CanvasStructure/RoomCanvas";



export const Canvas = () => {


    const theme_state = useRecoilValue(ThemeState);
    const theme = (theme_state.mode == 'light') ? theme_state.light : theme_state.dark;

    return <div className="h-[80vh] w-full px-4 flex flex-col items-center">
        <div className="relative h-full w-full rounded-xl border-2 shadow-md overflow-x-auto overflow-y-auto [::-webkit-scrollbar]:hidden [scrollbar-width:none] "
            style={{
                backgroundColor: theme.nav_bg,
                borderColor: theme.card_img
            }}
        >
            <ToolBar />
            {/* <div className="h-[1000px] w-[1000px] bg-red-400 "></div> */}
            <RoomCanvas />
            {/* <Fullscreen /> */}
        </div>
    </div>
}