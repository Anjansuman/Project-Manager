import { ThemeState } from "@/Atoms/ThemeState"
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil"

interface SmallProfilePanelProps {
    profileImg: string,
    name: string,
    username: string,
    role: string,
}

export const SmallProfilePanel = ({profileImg, name, username, role}: SmallProfilePanelProps) => {

    const theme_state = useRecoilValue(ThemeState);
    const theme = (theme_state.mode === 'light') ? theme_state.light : theme_state.dark;

    return <div className="h-auto w-70 absolute z-10 right-42 top-13 rounded-sm shadow-md border px-3 py-2 overflow-hidden"
        style={{
            backgroundColor: theme.card_bg,
            borderColor: theme.card_img,
            color: theme.font_color
        }}
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

        <div className="flex flex-col items-center justify-center ">
            <div className="mb-3">
                {role}
            </div>
            <Link to={`/eject/${username}`} >
                <div className="font-normal text-sm border-2 border-[#3F5EFF] px-2 py-1 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-md ">
                    View Profile
                </div>
            </Link>
        </div>

        {/* dividing line */}
        <div className="h-0.5 w-full my-2 " style={{ backgroundColor: theme.card_img }} ></div>

        <div className="flex flex-col items-start justify-center ">
            <div>Account</div>
            <div className="flex flex-col items-start justify-center font-normal text-sm "
                style={{
                    color: 'gray'
                }}
            >
                <div
                    style={{ "--hover-color": theme.font_color } as React.CSSProperties}
                >Settings</div>
            </div>
        </div>

    </div>
}