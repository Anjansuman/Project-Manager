import { useRecoilValue } from "recoil";
import { ThemeState } from "../../../Atoms/ThemeState";

import { Link, useParams } from "react-router-dom";

interface ProjectTileProps {
    projectTitle: string,
    image: string,
    completion: string,
}


export const ProjectTile = ({ projectTitle, image, completion }: ProjectTileProps) => {

    const { name, organization } = useParams();

    const theme_state = useRecoilValue(ThemeState);
    const theme = (theme_state.mode == 'light') ? theme_state.light : theme_state.dark;


    return <Link to={`/eject/${name}/${organization}/${projectTitle}`} >
        <div className="h-90 w-68 border-2 border-[#202B44] mr-3 mt-3 rounded-2xl p-4 shadow-md transition-all duration-400 ease-in-out hover:-translate-y-1 hover:shadow-xl "
            style={{
                backgroundColor: theme.card_bg,
                borderColor: theme.card_img
            }}
        >
            <div className="w-full h-[75%] rounded-2xl shadow-sm overflow-hidden"
                style={{
                    backgroundColor: theme.card_img
                }}
            >
                <img src={`${image}`} alt="" />
            </div>
            <div className="mt-3 font-semibold text-lg ml-1 mb-5 "
                style={{
                    color: theme.font_color
                }}
            >
                {projectTitle}
            </div>
            <div className="h-1 w-full rounded-3xl bg-red-200 overflow-hidden"
                style={{
                    backgroundColor: theme.card_img
                }}
            >
                <div className="h-1 bg-red-100 "
                    style={{
                        width: `${completion}%` || '0'
                    }}
                >

                </div>
            </div>
        </div>
    </Link>
}

