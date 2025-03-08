import { ThemeState } from "@/Atoms/ThemeState";
import { BackArrowIcon } from "@/Components/ui/SVGs/BackArrowIcon";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";


export const FileData = () => {

    const { name, organization, projectTitle, fileTitle } = useParams();
    const navigate = useNavigate();

    const theme_state = useRecoilValue(ThemeState);
    const theme = (theme_state.mode == 'light') ? theme_state.light : theme_state.dark;

    return <div className="h-[80vh] w-[65%] mt-5 px-4 flex flex-col items-center "
        style={{
            color: theme.font_color
        }}
    >
    <div className="w-full text-2xl font-semibold mb-2 flex justify-between items-center ">
        <div className={`flex justify-start items-center transition-all duration-300 ease-in-out pr-2 rounded-md cursor-pointer hover:shadow-sm `}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = theme.nav_bg)}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "")}
                onClick={() => navigate(-1)}
            >
                <div className="mr-2 rounded-l-md cursor-pointer py-2 px-1">
                    <BackArrowIcon />
                </div>
                <div className="relative bottom-[3px] pr-2 ">
                    {`${name}/${organization}/${projectTitle}/${fileTitle}`}
                </div>
            </div>
        </div>
    </div>
}