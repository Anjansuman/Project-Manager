import { useRecoilValue } from "recoil";
import { ThemeState } from "../../../../../Atoms/ThemeState";
import { Input } from "@/Components/ui/Customs/Input";
import { UserData } from "./UserData/UserData";
import { useParams } from "react-router-dom";


export const OrgMembers = () => {

    const { organization } = useParams();

    const theme_state = useRecoilValue(ThemeState);
    const theme = (theme_state.mode == 'light') ? theme_state.light : theme_state.dark;

    return <div className="h-[80vh] w-[65%] mt-5 px-4 flex flex-col items-center overflow-y-scroll [::-webkit-scrollbar]:hidden [scrollbar-width:none] ">

        <div className="h-14 w-[60%] border-2 border-white rounded-xl mb-3 shadow-sm "
            style={{
                borderColor: theme.card_img
            }}
        >
            <Input placeholder="Search..." bg={theme.nav_bg} />
        </div>

        <div className="max-h-[85%] w-[60%] border border-x-2 border-white rounded-xl overflow-x-hidden overflow-y-scroll [::-webkit-scrollbar]:hidden [scrollbar-width:none] shadow-sm "
            style={{
                borderColor: theme.card_img
            }}
        >
            {Array.from({ length: 30 }).map((_, i) => (
                <UserData name={'Anjan Suman'} username={'ancient'} role={'Blockchain Developer'} commits={2} />
            ))}
        </div>

    </div>
}