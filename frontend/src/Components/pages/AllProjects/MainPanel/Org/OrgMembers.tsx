import { useRecoilValue } from "recoil";
import { ThemeState } from "../../../../../Atoms/ThemeState";
import { Input } from "@/Components/ui/Customs/Input";
import { UserData } from "./UserData/UserData";
import { useNavigate, useParams } from "react-router-dom";
import { BackArrowIcon } from "@/Components/ui/SVGs/BackArrowIcon";
import { TriangleIcon } from "../../../../ui/SVGs/TriangleIcon";
import { useState } from "react";


export const OrgMembers = () => {

    const { organization } = useParams();
    const navigate = useNavigate();

    const [visibleQuickAccess, setVisibleQuickAccess] = useState(false);

    const theme_state = useRecoilValue(ThemeState);
    const theme = (theme_state.mode == 'light') ? theme_state.light : theme_state.dark;

    return <div className="h-[80vh] w-[65%] mt-5 px-4 flex flex-col items-center overflow-y-scroll [::-webkit-scrollbar]:hidden [scrollbar-width:none] ">

        <div className="h-14 w-full mb-3 flex items-center justify-between ">
            <div className={`flex justify-start items-center transition-all duration-300 ease-in-out pr-2 rounded-md cursor-pointer hover:shadow-sm text-2xl font-semibold `}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = theme.nav_bg)}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "")}
                    onClick={() => navigate(-1)}
                >
                <div className="mr-2 rounded-l-md cursor-pointer py-2 px-1">
                    <BackArrowIcon color={theme.font_color} />
                </div>
                <div className="relative bottom-[3px] pr-2 "
                    style={{
                        color: theme.font_color
                    }}
                >
                    { organization !== 'my-secret-project' ? <div>my projects</div> : organization }
                </div>
            </div>
            <div className="min-w-[30$] w-[40%] border rounded-3xl overflow-hidden shadow-md transition-all duration-300 ease-in-out hover:scale-105 active:scale-105 focus:scale-105 "
                style={{
                    borderColor: theme.card_img
                }}
            >
                <Input placeholder="Search..." bg={theme.nav_bg} h={'35px'} />
            </div>
            {/* quick access menu */}
            <div className="font-semibold flex items-center justify-center py-1.5 px-3 rounded-3xl cursor-pointer border shadow-md transition-all duration-300 ease-in-out hover:scale-105 "
                style={{
                    backgroundColor: theme.nav_bg,
                    borderColor: theme.card_img,
                    color: theme.font_color
                }}
                onClick={() => setVisibleQuickAccess((prev) => !prev)}
            >
                <div>Quick access</div>
                <div className="ml-1.5">
                    <TriangleIcon color={theme.font_color} size={'5'} onClick={() => setVisibleQuickAccess((prev) => !prev)} dynamicallyClicked={visibleQuickAccess} />
                </div>
            </div>
        </div>

        <div className="max-h-[85%] w-full border border-x-2 border-white rounded-xl overflow-x-hidden overflow-y-scroll [::-webkit-scrollbar]:hidden [scrollbar-width:none] shadow-sm "
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