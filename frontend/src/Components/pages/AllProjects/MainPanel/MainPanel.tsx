import { useState } from "react";
// import { Blocks } from "./Block/Blocks";
import { PlusBlockPanel } from "./Block/ProjectPanel/PlusBlockPanel";

import { useRecoilValue, useRecoilValueLoadable } from "recoil";


import { ThemeState } from "../../../../Atoms/ThemeState";
import { Project } from "../../../../Atoms/Project";
import { ProjectTile } from "../../../ui/Customs/ProjectTile";
import { BottomMenu } from "./BottomMenu/BottomMenu";
import { NoProjectIcon } from "../../../ui/SVGs/NoProjectIcon";


interface ProjectData {
    title: string,
    projectImg: string,
    completion: string
}

export function MainPanel() {

    const pro = useRecoilValueLoadable(Project);


    const theme_state = useRecoilValue(ThemeState);
    const theme = (theme_state.mode == 'light') ? theme_state.light : theme_state.dark;



    return <div className = "h-[80vh] w-[70%] border rounded-[14px] p-[25.2px] m-[15px] "
        style = {{
            backgroundColor:  theme.dark_panel,
            borderColor: theme.gray_border
        }}
    >
        <div className = "h-[10vh] w[99.74%] border bg-[#653AD8] border-[#653AD8] rounded-[14px] mb-[25.2px] flex justify-around items-center text-white text-[30px] font-calibri cursor-pointer ">
            <div>Projects</div>
        </div>
        <div className="flex">
            {(pro.state === "loading") ? 
                <div className="text-white"> Loading...</div> : ''
            }
            {/* as plus panel gets visible set the text bar to focus to make it more clean */}
            {/* {renderBlock} */}
            
            {pro.state === 'hasValue' && pro.contents.length === 0 ? <NoProjectIcon /> : '' }

            {pro.state === 'hasValue' && pro.contents.map((details: ProjectData, key: number) => (
                <ProjectTile key={key} title={details.title} image={details.projectImg} completion={details.completion} />
            ))}
        </div>
        <div>
            <BottomMenu />
        </div>
    </div>
}
