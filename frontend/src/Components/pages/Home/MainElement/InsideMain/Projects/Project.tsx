// import { Project_Tile } from "./Project_Tiles/ProjectTile";
import { ProjectTile } from "../../../../../ui/Customs/ProjectTile"

import { useRecoilValue } from "recoil";
import { ThemeState } from "../../../../../../Atoms/ThemeState";

import { Link } from "react-router-dom";

interface ProjectProps {
    project: { title: string, projectImg: string, completion: string }[]
}

export const Project = ({ project }: ProjectProps) => {


    const theme_state = useRecoilValue(ThemeState);
    const theme = (theme_state.mode == 'light') ? theme_state.light : theme_state.dark;


    return <div className="h-[100%] w-[100%] border-2 border-[#653AD8] rounded-3xl p-2 ">

        <div className="h-[15%] text-2xl font-bold p-4 flex items-center"
            style={{ color: theme.font_color }}
        >
            <Link to='/projects'>Projects</Link>
        </div>
        <div className="h-[1%] w-[30%] ml-3 bg-[#653AD847] mb-3 rounded-full"></div>
        <div className="h-[80%] flex flex-wrap pl-3 pb-2">
            
            {project.map((details) => {
                return <ProjectTile title={details.title} image={details.projectImg} completion={details.completion} />
            })}

            <div className="flex items-center ml-11">
                <Link to='/projects'>
                    <div className="h-20 w-20 bg-[#653AD847] rounded-full flex justify-center items-center shadow-lg cursor-pointer">
                        <div className="h-16 w-16 bg-[#653AD847] rounded-full flex justify-center items-center shadow-lg hover:bg-[#653AD880] "
                            style = {{
                                transition: 'background-color 0.4s ease'
                            }}
                        >
                            <div>
                                <div className="h-1 w-2.5 bg-white rotate-45"></div>
                                <div className="h-1 w-2.5 bg-white -rotate-45"></div>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    </div>
}

/*

I can do something like,
-> if no. of projects is 0 => Show an empty image or can show Contribution graph,
-> if no. of projects is 1 => Show that project into the complete space,
-> if no. of projects is greater than 1 => Show like project tiles.

*/