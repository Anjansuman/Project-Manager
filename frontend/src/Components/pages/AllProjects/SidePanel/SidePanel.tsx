// import { SearchButton } from "./SearchButton";
// import { Members } from "./Members";
import { MessagePanel } from "./Chat/MessagePanel";

import { useRecoilValue } from "recoil";
import { ThemeState } from "../../../../Atoms/ThemeState";

export function SidePanel() {


    const themeState = useRecoilValue(ThemeState);
    const theme = (themeState.mode == 'light') ? themeState.light : themeState.dark;


    return <div className = "h-[80vh] w-[35%] ml-5 mt-5 border-2 rounded-[14px] overflow-hidden shadow-lg "
        style={{
            backgroundColor: theme.nav_bg,
            borderColor: theme.card_img,
        }}
    >
        {/* <SearchButton/> */}
        {/* <Members/> */}
        
        {/* <div className="h-[5%] text-white text-xl flex items-center">
            Project name
        </div> */}

        <div className="h-full w-full flex items-center justify-center ">
            <MessagePanel projectId={"red"} />
        </div>

    </div>
}