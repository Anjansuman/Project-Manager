import { ThemeState } from "@/Atoms/ThemeState";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import gsap from "gsap";


interface UserDataProps {
    name: string,
    role: string,
    commits: number,
    username: string
}

export const UserData = ({ name, role, commits, username }: UserDataProps) => {

    const theme_state = useRecoilValue(ThemeState);
    const theme = (theme_state.mode == 'light') ? theme_state.light : theme_state.dark;

    const [hoveredName, setHoveredName] = useState(false);
    const [hoveredRole, setHoveredRole] = useState(false);
    const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent) => {
        setCursorPos({ x: e.pageX, y: e.pageY });
    };

    return <div
        className="relative overflow-visible" // Makes sure HoverUsername is positioned correctly
        >
        {/* Show the username tooltip on hover */}
        {hoveredName && <HoverUsername username={username} coords={cursorPos} />}
        {hoveredRole && <HoverUsername username={role} coords={cursorPos} />}

        <div
            className="w-full border-b border-t px-4 py-3 flex justify-between"
            style={{
                color: theme.font_color,
                backgroundColor: theme.nav_bg,
                borderColor: theme.card_img,
            }}
        >
            <div className="w-[35%] cursor-pointer hover:text-[#1f6feb] overflow-hidden"
                onMouseEnter={() => setHoveredName(true)}
                onMouseMove={handleMouseMove} // Track cursor position
                onMouseLeave={() => setHoveredName(false)}
            >
                {name}
            </div>
            <div className="w-[80%] flex justify-between">
                <div className="w-[65%] text-gray-500 cursor-pointer hover:text-[#1f6feb] overflow-hidden"
                    onMouseEnter={() => setHoveredRole(true)}
                    onMouseMove={handleMouseMove} // Track cursor position
                    onMouseLeave={() => setHoveredRole(false)}
                >
                    {role}
                </div>
                <div className="text-gray-500 hover:text-[#1f6feb] cursor-pointer flex justify-center items-center">
                    {commits} commits
                </div>
            </div>
        </div>
    </div>
}

interface HoverUsernameProps {
    username: string;
    coords: { x: number; y: number };
}

const HoverUsername = ({ username, coords }: HoverUsernameProps) => {

    useEffect(() => {
        gsap.to(".container", {
            opacity: 1,
            duration: 0.3,
            delay: 1
        })
    }, [])

    const theme_state = useRecoilValue(ThemeState);
    const theme = (theme_state.mode === 'light') ? theme_state.light : theme_state.dark;
    const InvertTheme = (theme_state.mode === 'light') ? theme_state.dark : theme_state.light;

    return <div className="container opacity-0 border fixed z-50 px-2 py-1 w-auto rounded shadow-md"
        style={{
            left: `${coords.x + 10}px`, // Adjust tooltip position to left of element
            top: `${coords.y + 15}px`,
            color: InvertTheme.font_color,
            borderColor: InvertTheme.card_img,
            backgroundColor: InvertTheme.card_bg
        }}
    >
        {username}
    </div>
}