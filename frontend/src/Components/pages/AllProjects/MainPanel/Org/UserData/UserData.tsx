import { ThemeState } from "@/Atoms/ThemeState";
import { useRecoilValue } from "recoil";


interface UserDataProps {
    name: string,
    role: string,
    commits: number
}

export const UserData = ({ name, role, commits }: UserDataProps) => {

    const theme_state = useRecoilValue(ThemeState);
    const theme = (theme_state.mode == 'light') ? theme_state.light : theme_state.dark;

    return <div className="border-b border-t px-4 py-3 flex justify-between "
    style={{
        color: theme.font_color,
        backgroundColor: theme.nav_bg,
        borderColor: theme.card_img
    }}
>
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