import { ThemeState } from "@/Atoms/ThemeState";
import { useState } from "react";
import { useRecoilValue } from "recoil";


interface UserDataProps {
    name: string,
    role: string,
    commits: number,
    username: string
}

export const UserData = ({ name, role, commits, username }: UserDataProps) => {

    const theme_state = useRecoilValue(ThemeState);
    const theme = (theme_state.mode == 'light') ? theme_state.light : theme_state.dark;

    const [hovered, setHovered] = useState(false);

    return <div className="border-b border-t px-4 py-3 flex justify-between "
        style={{
            color: theme.font_color,
            backgroundColor: theme.nav_bg,
            borderColor: theme.card_img
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
    >
        { hovered && <HoverUsername username={username} />}
        <div className="cursor-pointer hover:text-[#1f6feb]">
            {name}
        </div>
        <div className="text-[gray] cursor-pointer hover:text-[#1f6feb] ">
            {role}
        </div>
        <div className="text-[gray] hover:text-[#1f6feb] border-white cursor-pointer flex justify-center items-center ">
            {commits} commits
        </div>
    </div>
}

interface hoverUsernameProps {
    username: string
}

const HoverUsername = ({ username }: hoverUsernameProps) => {

    return <div className="relative bottom-15 bg-red-200 px-2 py-1 border border-white">
        {username}
    </div>
}