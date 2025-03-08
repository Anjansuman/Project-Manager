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


    return <div>
        <Link to={`/eject/${name}/${organization}/${projectTitle}`}>
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
    </div>
}

/*

<div className="h-[213px] w-48 bg-[#653AD847] rounded-3xl mr-2 mb-2 pt-6 cursor-pointer transition-all duration-300 ease-in-out hover:-translate-y-1">
                <div className="flex justify-center mb-4">
                    <div className="h-24 w-24 bg-[#653AD847] rounded-full shadow-lg flex justify-center items-center">
                        <div className="h-[90px] w-[90px] bg-[#653AD847] rounded-full shadow-lg flex justify-center items-center overflow-hidden">
                            
                            {image}
                        </div>
                    </div>
                </div>
                <div className="flex justify-center text-center text-[17px] font-bold mb-4"
                    style={{ color: theme.font_color }}
                >
                    {title}
                </div>
                <div className="flex justify-center">
                    <div className="h-3 w-32 rounded-full overflow-hidden "
                        style={{ backgroundColor: theme.dark_panel }}
                    >
                        <div className="h-[100%] bg-[#653AD8] rounded-full "
                            style={{ width: `${completion}%` || '0' }}
                        ></div>
                    </div>
                </div>
            </div>

*/