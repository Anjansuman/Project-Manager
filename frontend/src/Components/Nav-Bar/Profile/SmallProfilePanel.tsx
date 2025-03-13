import { ThemeState } from "@/Atoms/ThemeState"
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil"

interface SmallProfilePanelProps {
    profileImg: string,
    name: string,
    username: string,
    role: string,
    onClick: () => void 
}

export const SmallProfilePanel = ({profileImg, name, username, role, onClick}: SmallProfilePanelProps) => {

    const wrapperRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
            onClick();
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
        }, []);

    const theme_state = useRecoilValue(ThemeState);
    const theme = (theme_state.mode === 'light') ? theme_state.light : theme_state.dark;

    return <div className="h-auto w-70 absolute z-20 right-42 top-13 rounded-sm shadow-md border px-3 py-2 overflow-hidden backdrop-blur-md"
        style={{
            // backgroundColor: theme.card_bg,
            borderColor: theme.card_img,
            color: theme.font_color
        }}
        ref={wrapperRef}
    >
        <div className="flex items-center">
            <div className="h-10 w-10 rounded-full overflow-hidden mr-3 "
                style={{
                    backgroundColor: theme.card_img
                }}
            >
                <img src={`${profileImg}`} alt="" />
            </div>
            {/* if name is too long then it distorts the profile image, solve it by adding ... */}
            <div>{name}</div>
        </div>

        {/* dividing line */}
        <div className="h-0.5 w-full my-2 " style={{ backgroundColor: theme.card_img }} ></div>

        <div className="flex flex-col items-center justify-center font-normal text-sm  ">
            <div className="mb-3">
                {role}
            </div>
            <Link to={`/eject/${username}`} >
                <div className="border-2 border-[#3F5EFF] px-2 py-1 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-md ">
                    View Profile
                </div>
            </Link>
        </div>

        {/* dividing line */}
        {/* <div className="h-0.5 w-full my-2 " style={{ backgroundColor: theme.card_img }} ></div>

        <div className="flex flex-col items-start justify-center ">
            <div>Quick Access</div>
            <div className="flex flex-col items-start justify-center font-normal text-sm "
                style={{
                    color: 'gray'
                }}
            >
                {['Organizations', 'Help', 'Activity'].map((element) => (
                    <Link to={`/eject/${username}/${element}`} >
                        <div
                            className="cursor-pointer transition-all duration-200 ease-in-out hover:underline"
                            onMouseEnter={(e) => e.currentTarget.style.color = theme.font_color}
                            onMouseLeave={(e) => e.currentTarget.style.color = ''}
                        >
                            {element}
                        </div>
                    </Link>
                ))}
            </div>
        </div> */}

        {/* dividing line */}
        <div className="h-0.5 w-full my-2 " style={{ backgroundColor: theme.card_img }} ></div>

        <div className="flex flex-col items-start justify-center ">
            <div>Account</div>
            <div className="flex flex-col items-start justify-center font-normal text-sm "
                style={{
                    color: 'gray'
                }}
            >
                {['Settings', 'Help', 'Activity'].map((element, key) => (
                    <Link to={`/eject/${username}/${element}`} >
                        <div
                            className="cursor-pointer transition-colors duration-200 ease-in-out hover:underline"
                            onMouseEnter={(e) => e.currentTarget.style.color = theme.font_color}
                            onMouseLeave={(e) => e.currentTarget.style.color = ''}
                            key={key}
                        >
                            {element}
                        </div>
                    </Link>
                ))}
            </div>
        </div>

        {/* dividing line */}
        <div className="h-0.5 w-full my-2 " style={{ backgroundColor: theme.card_img }} ></div>

        <div className="font-normal text-sm text-[gray] hover:underline cursor-pointer transition-all duration-200 ease-in-out "
            onMouseEnter={(e) => e.currentTarget.style.color = 'red'}
            onMouseLeave={(e) => e.currentTarget.style.color = ''}
        >
            Sign-Out
        </div>

    </div>
}

/*

<div
    onMouseEnter={(e) => e.currentTarget.style.color = theme.font_color}
    onMouseLeave={(e) => e.currentTarget.style.color = ''}
    className="cursor-pointer transition-colors duration-200 ease-in-out"
>
    Settings
</div>

*/