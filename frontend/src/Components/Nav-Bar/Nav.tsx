import "./Nav.css";
// import { MenuBar } from "./MenuBar";

import { useRecoilValue } from "recoil";
import { ThemeState } from "../../Atoms/ThemeState";
import { Logo } from "../ui/SVGs/Logo";

export function Nav() {


    const theme_state = useRecoilValue(ThemeState);
    const theme = (theme_state.mode == 'light') ? theme_state.light : theme_state.dark;


    return <div className = "h-[63px] flex justify-between ">
        <div className = "logoContainer"
            style={{
                backgroundColor: theme.dark_panel,
                borderBottom: '1px solid',
                borderBottomColor: theme.gray_border,
            }}> {/* this div is for storing logo*/}
            <div className="mr-4">
                <Logo h={'42'} color={theme.font_color} />
            </div>
        </div>
        <div className = "inputContainer"
            style={{
                backgroundColor: theme.dark_panel,
                borderBottom: '1px solid',
                borderBottomColor: theme.gray_border,
            }}> {/* this div is for storing search bar*/}
            <input type="text" placeholder = "Search" className="input"
                style={{ backgroundColor: theme.light_panel_47 }}
            />
        </div>
        <div className = "buttons"
            style={{
                backgroundColor: theme.dark_panel,
                color: theme.font_color,
                borderBottom: '1px solid',
                borderBottomColor: theme.gray_border,
            }}> {/* this div is for storing buttons*/}
            <div className="button">Home</div>
            <div className="button">My Projects</div>
            <div className="button">Messaging</div>
            <div className="button">Notifications</div>
            <div className="button">Me</div>
        </div>
        <div className="w-[6%] "
            style={{
                backgroundColor: theme.dark_panel,
                borderBottom: '1px solid',
                borderBottomColor: theme.gray_border
            }}
        ></div>
        {/* <MenuBar/> */}
    </div>
}
