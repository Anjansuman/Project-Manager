import "./Nav.css";
// import { MenuBar } from "./MenuBar";

import { useRecoilState } from "recoil";
import { ThemeState } from "../../Atoms/ThemeState";
// import { Logo } from "../ui/SVGs/Logo";
// import { HomeIcon } from "../ui/SVGs/HomeIcon";
// import { ProjectButton } from "../ui/SVGs/ProjectButton";
// import { ProfileCircle } from "../ui/Customs/ProfileCircle";
// import { BellIcon } from "../ui/SVGs/BellIcon";
// import { Link } from "react-router-dom";
import { Home, FolderKanban, MessageSquare, Bell } from "lucide-react";
import { Logo } from "../ui/SVGs/Logo";
import { SunIcon } from "../ui/SVGs/SunIcon";
import { MoonIcon } from "../ui/SVGs/MoonIcon";
import { ProfileIcon } from "../ui/SVGs/ProfileIcon";

export function Nav() {

      const [theme_state, setTheme_State] = useRecoilState(ThemeState);
    
      function mode_switch() {
          setTheme_State((prevTheme) => ({
              ...prevTheme,
              mode: prevTheme.mode === 'light' ? 'dark' : 'light',
          }));
      };

    const theme = (theme_state.mode == 'light') ? theme_state.light : theme_state.dark;


    return <div className="bg-red-200 flex items-center justify-around font-semibold border-b-2 p-1 ml-2"
        style={{
            backgroundColor: theme.nav_bg,
            color: theme.font_color,
            borderColor: theme.card_img
        }}
    >

        <div>
            <Logo h="40px" color={theme.font_color} />
        </div>

        <div className="flex">
            <div className={`flex flex-col items-center justify-center transition-colors duration-400 ease-in-out cursor-pointer px-3 py-2 hover:bg-red-100 rounded-lg mr-2`}
                style={{ "--hover-color": theme.card_img } as React.CSSProperties}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = theme.card_img)}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "")}      
            >
                <Home size={18} />
                <span>Home</span>
            </div>
            <div className="flex flex-col items-center justify-center transition-colors duration-400 ease-in-out cursor-pointer px-3 py-2 rounded-lg mr-2"
                style={{ "--hover-color": theme.card_img } as React.CSSProperties}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = theme.card_img)}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "")}      
            >
                <FolderKanban size={18} />
                <span>Projects</span>
            </div>
            <div className="flex flex-col items-center justify-center transition-colors duration-400 ease-in-out cursor-pointer px-3 py-2 rounded-lg mr-2"
                style={{ "--hover-color": theme.card_img } as React.CSSProperties}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = theme.card_img)}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "")}      
            >
                <MessageSquare size={18} />
                <span>Messaging</span>
            </div>
            <div className="flex flex-col items-center justify-center transition-colors duration-400 ease-in-out cursor-pointer px-3 py-2 rounded-lg"
                style={{ "--hover-color": theme.card_img } as React.CSSProperties}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = theme.card_img)}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "")}      
            >
                <Bell size={18} />
                <span>Notifications</span>
            </div>
        </div>

        <div className="flex">
            <div className="transition-colors duration-300 ease-in-out rounded-full mr-2"
                style={{ "--hover-color": theme.card_img } as React.CSSProperties}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = theme.card_img)}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "")}
                onClick={mode_switch}
            >
                { theme_state.mode == 'light' ? <SunIcon height={'30px'} /> : <MoonIcon height={'30px'} /> }
            </div>
            <div className="transition-colors duration-300 ease-in-out rounded-full mr-2"
                style={{ "--hover-color": theme.card_img } as React.CSSProperties}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = theme.card_img)}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "")}
                onClick={mode_switch}
            >
                <ProfileIcon height={'30px'} />
            </div>
        </div>
    </div>
}

/*

<div className = "h-[70px] flex justify-between ">
        <div className = "logoContainer"
            style={{
                backgroundColor: theme.dark_panel,
                borderBottom: '1px solid',
                borderBottomColor: theme.gray_border,
            }}>
            <div className="mr-4">
                <Logo h={'42'} color={theme.font_color} />
            </div>
        </div>
        <div className = "inputContainer"
            style={{
                backgroundColor: theme.dark_panel,
                borderBottom: '1px solid',
                borderBottomColor: theme.gray_border,
            }}>
            <input type="text" placeholder = "Search" className="input"
                style={{ backgroundColor: theme.light_panel_47 }}
            />
        </div>
        <div className = "buttons text-[gray]"
            style={{
                backgroundColor: theme.dark_panel,
                borderBottom: '1px solid',
                borderBottomColor: theme.gray_border,
            }}>
            <div className="button flex flex-col text-xs items-center hover:text-white ">
                <Link to='/'>
                    <HomeButton height={"30px"} />
                    Home
                </Link>
            </div>
            <div className="button flex flex-col text-xs items-center hover:text-white ">
                <Link to='/projects' className="flex flex-col items-center">
                    <ProjectButton height={'30px'} />
                    My Projects
                </Link>
            </div>
            <div className="button hover:text-white ">Messaging</div>
            <div className="button flex flex-col text-xs items-center hover:text-white ">
                <BellIcon color={'#653AD880'} size={'30px'} />
                Notifications
            </div>
            <div className="button flex flex-col text-xs items-center hover:text-white ">
                <ProfileCircle size={'45px'} />
            </div>
        </div>
        <div className="w-[6%] "
            style={{
                backgroundColor: theme.dark_panel,
                borderBottom: '1px solid',
                borderBottomColor: theme.gray_border
            }}
        ></div>
    </div>

*/