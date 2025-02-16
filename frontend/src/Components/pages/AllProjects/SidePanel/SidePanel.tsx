// import { SearchButton } from "./SearchButton";
import { Members } from "./Members";
import { MessagePanel } from "./Chat/MessagePanel";
import { Input } from "../../../ui/Customs/Input";

import { useRecoilValue } from "recoil";
import { ThemeState } from "../../../../Atoms/ThemeState";
import { Button } from "../../../ui/Customs/Button";

export function SidePanel() {


    const themeState = useRecoilValue(ThemeState);
    const theme = (themeState.mode == 'light') ? themeState.light : themeState.dark;


    return <div className = "h-[77.4vh] w-[28%] border rounded-[14px] p-[20px] m-[15px] "
        style={{
            backgroundColor: theme.light_panel,
            borderColor: theme.gray_border,
        }}
    >
        {/* <SearchButton/> */}
        {/* <Members/> */}
        
        <div className="h-[5%] text-white text-xl flex items-center">
            Project name
        </div>

        <div className="h-[85%] w-full flex items-center justify-center ">
            <MessagePanel />
        </div>
        <div className="h-[10%] flex items-center justify-between ">
            <Input placeholder={"Enter a message..."} bg={'#03061C'} h={'40px'} />
            <Button text={'Send'} bg={'#03061C'} />
        </div>

    </div>
}