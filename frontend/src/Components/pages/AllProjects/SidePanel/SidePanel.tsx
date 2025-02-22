// import { SearchButton } from "./SearchButton";
// import { Members } from "./Members";
import { MessagePanel } from "./Chat/MessagePanel";

import { useRecoilValue } from "recoil";
import { ThemeState } from "../../../../Atoms/ThemeState";

export function SidePanel() {


    const themeState = useRecoilValue(ThemeState);
    const theme = (themeState.mode == 'light') ? themeState.light : themeState.dark;


    return <div className = "h-[80vh] w-[28%] border rounded-[14px] p-4 m-[15px] "
        style={{
            backgroundColor: theme.light_panel,
            borderColor: theme.gray_border,
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