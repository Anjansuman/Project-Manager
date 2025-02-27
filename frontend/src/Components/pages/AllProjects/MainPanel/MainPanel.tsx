// import { useState } from "react";
// import { Blocks } from "./Block/Blocks";
// import { PlusBlockPanel } from "./Block/ProjectPanel/PlusBlockPanel";

import { useRecoilValue, useRecoilValueLoadable } from "recoil";


import { ThemeState } from "../../../../Atoms/ThemeState";
import { Project } from "../../../../Atoms/Project";
import { ProjectTile } from "../../../ui/Customs/ProjectTile";
import { BottomMenu } from "./BottomMenu/BottomMenu";
import { NoProjectIcon } from "../../../ui/SVGs/NoProjectIcon";
import { TriangleIcon } from "../../../ui/SVGs/TriangleIcon";
import { useState } from "react";
import { OrgPanel } from "./Org/OrgContainer";
import { PlusIcon } from "lucide-react";


interface ProjectData {
    title: string,
    projectImg: string,
    completion: string
}

export function MainPanel() {

    const pro = useRecoilValueLoadable(Project);

    const [visibleOrg, setVisibleOrg] = useState(false);


    const theme_state = useRecoilValue(ThemeState);
    const theme = (theme_state.mode == 'light') ? theme_state.light : theme_state.dark;



    return <div className = "h-[80vh] w-[65%] mt-5 px-4 flex flex-col items-center overflow-y-scroll [::-webkit-scrollbar]:hidden [scrollbar-width:none] ">
        <div className="w-full flex items-center justify-between pb-5"
            style={{ color: theme.font_color }}
        >
            <div className="font-semibold flex items-center justify-center bg-red-200 py-1.5 px-3 rounded-3xl cursor-pointer border shadow-sm transition-all duration-300 ease-in-out hover:scale-105 "
                style={{
                    backgroundColor: theme.nav_bg,
                    borderColor: theme.card_img
                }}
                onClick={() => setVisibleOrg((prev) => !prev)}
            >
                <div>Projects</div>
                <div className="ml-1.5">
                    <TriangleIcon color={theme.font_color} size={'5'} onClick={() => setVisibleOrg((prev) => !prev)} dynamicallyClicked={visibleOrg} />
                </div>
            </div>
            <div className="font-semibold flex items-center justify-center bg-red-200 rounded-3xl py-1.5 px-3 cursor-pointer border shadow-sm transition-all duration-300 ease-in-out hover:scale-105"
                style={{
                    backgroundColor: '#3F5EFF',
                    borderColor: theme.card_img
                }}
            >
                <div className="mr-1.5"><PlusIcon size={'18'} /></div>
                <div>New Project</div>
            </div>
        </div>
        { visibleOrg && <OrgPanel /> }
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto pb-4 
        [::-webkit-scrollbar]:hidden [scrollbar-width:none] pl-3 ">
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
