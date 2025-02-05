// import { SearchButton } from "./SearchButton";
import { Members } from "./Members";

import { useRecoilValue } from "recoil";
import { ThemeState } from "../../../../Atoms/ThemeState";

export function SidePanel() {


    const themeState = useRecoilValue(ThemeState);
    const theme = (themeState.mode == 'light') ? themeState.light : themeState.dark;


    return <div className = "h-[77.4vh] w-[28%] border rounded-[14px] p-[20px] m-[15px] "
        style={{
            backgroundColor: theme.dark_border,
            borderColor: theme.gray_border,
        }}
    >
        {/* <SearchButton/> */}
        <Members/>
    </div>
}