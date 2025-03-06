import { ThemeState } from "@/Atoms/ThemeState";
import { ClockIcon } from "lucide-react";
import { useRecoilValue } from "recoil";


export const LastCommit = () => {

    const theme_state = useRecoilValue(ThemeState);
    const theme = (theme_state.mode == 'light') ? theme_state.light : theme_state.dark;

    return <div className="w-full flex justify-between px-4 py-3 border-b-2 "
        style={{
            backgroundColor: theme.nav_bg,
            borderColor: theme.card_img
        }}
    >
        <div className="flex ">
            <div className="mr-5">
                Anjan Suman
            </div>
            <div className="text-[gray] ">
                last commit message
            </div>
        </div>
        <div className="flex">
            <div className="text-[gray] mr-5 ">
                time
            </div>
            <div className="flex justify-center items-center rounded-md hover:bg-[gray] px-2 cursor-pointer ">
                <div className="relative top-[1px] ">
                    <ClockIcon size={'16px'} color={theme.font_color} />
                </div>
                <div className="ml-1">
                    20 commits
                </div>
            </div>
        </div>
    </div>
}