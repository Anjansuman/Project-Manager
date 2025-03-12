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
import { Element } from "./PanelElements/Element";
import { HomeButton } from "../ui/SVGs/HomeButton";
import { SmallProfilePanel } from "./Profile/SmallProfilePanel";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

export function Nav() {

    const [visibleProfile, setVisibleProfile] = useState(false);
    const profileDetails = useRef<{ name: string, profileImg: string, username: string, role: string }>({ name: '', profileImg: '', username: '', role: '' });
    
    function mode_switch() {
        setTheme_State((prevTheme) => ({
            ...prevTheme,
            mode: prevTheme.mode === 'light' ? 'dark' : 'light',
        }));
    };

    async function fetchProfile() {
        const backend = import.meta.env.VITE_BACKEND_URL;
        const response = await axios.get(`${backend}/dashboard/profile`, {
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        });

        const data = await response.data;
        profileDetails.current.name = data.name;
        profileDetails.current.profileImg = data.profileImg;
        profileDetails.current.username = data.username;
        profileDetails.current.role = data.role;
    }

    useEffect(() => {
        fetchProfile();
    }, []);
    
    const [theme_state, setTheme_State] = useRecoilState(ThemeState);
    const theme = (theme_state.mode == 'light') ? theme_state.light : theme_state.dark;


    return <div className="flex items-center justify-around font-semibold border-b-2 p-1"
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
            <Element logo={<Home size={18} />} name={'Home'} rightMargin={'2'} />
            <Element logo={<FolderKanban size={18} />} name={'Projects'} rightMargin={'2'} />
            <Element logo={<MessageSquare size={18} />} name={'Messaging'} rightMargin={'2'} />
            <Element logo={<Bell size={18} />} name={'Notifications'} rightMargin={'0'} />
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
                onClick={() => setVisibleProfile(val => !val)}
            >
                <ProfileIcon height={'30px'} />
            </div>
            {visibleProfile && (
                <SmallProfilePanel
                    profileImg={profileDetails.current.profileImg}
                    name={profileDetails.current.name}
                    username={profileDetails.current.username}
                    role={profileDetails.current.role}
                    onClick={() => setVisibleProfile(false)}
                />
            )}
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