// import { useState } from "react";
// import { Blocks } from "./Block/Blocks";
// import { PlusBlockPanel } from "./Block/ProjectPanel/PlusBlockPanel";

import { useRecoilValue, useRecoilValueLoadable } from "recoil";
import { Link, useParams } from "react-router-dom";

import { ThemeState } from "../../../../Atoms/ThemeState";
import { Project } from "../../../../Atoms/Project";
import { ProjectTile } from "../../../ui/Customs/ProjectTile";
import { BottomMenu } from "./BottomMenu/BottomMenu";
import { NoProjectIcon } from "../../../ui/SVGs/NoProjectIcon";
import { TriangleIcon } from "../../../ui/SVGs/TriangleIcon";
import { useState } from "react";
import { OrgContainer } from "./Org/OrgContainer";
import { PlusIcon } from "lucide-react";
import { QuickAccess } from "./QuickAccess/QuickAccess";
import { Input } from "@/Components/ui/Customs/Input";
import { SearchPanel } from "./SearchPanel/SearchPanel";
import { SkeletonLoader } from "@/Components/ui/Customs/SkeletonLoader";


interface ProjectData {
    title: string,
    projectImg: string,
    completion: string
}

export function MainPanel() {

    const { name, organization } = useParams();

    const pro = useRecoilValueLoadable(Project(organization || ""));

    // this is for organization panel
    const [visibleOrg, setVisibleOrg] = useState(false);
    
    // this is for quick access panel
    const [visibleQuickAccess, setVisibleQuickAccess] = useState(false);

    // this is for search panel
    const [visibleSearchPanel, setVisibleSearchPanel] = useState(false);


    const theme_state = useRecoilValue(ThemeState);
    const theme = (theme_state.mode == 'light') ? theme_state.light : theme_state.dark;



    return <div className = "h-[80vh] w-[65%] mt-5 px-4 flex flex-col items-center ">
        <div className="w-full flex items-center justify-between pb-5 gap-5"
            style={{ color: theme.font_color }}
        >
            {/* project button */}
            <div className="font-semibold flex items-center justify-center py-1.5 px-3 rounded-3xl cursor-pointer border shadow-md transition-all duration-300 ease-in-out hover:scale-105 "
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

            <div className="min-w-[30$] w-[40%] border rounded-3xl overflow-hidden shadow-md transition-all duration-300 ease-in-out hover:scale-105 active:scale-105 focus:scale-105 "
                style={{
                    borderColor: theme.card_img
                }}
                onClick={() => setVisibleSearchPanel(prev => !prev)}
            >
                <Input placeholder={'Search...'} h={'35px'} bg={theme.nav_bg}  />
            </div>

            <div className="flex items-center justify-between gap-5 ">
                {/* quick access menu */}
                <div className="font-semibold flex items-center justify-center py-1.5 px-3 rounded-3xl cursor-pointer border shadow-md transition-all duration-300 ease-in-out hover:scale-105 "
                    style={{
                        backgroundColor: theme.nav_bg,
                        borderColor: theme.card_img
                    }}
                    onClick={() => setVisibleQuickAccess((prev) => !prev)}
                >
                    <div>Quick access</div>
                    <div className="ml-1.5">
                        <TriangleIcon color={theme.font_color} size={'5'} onClick={() => setVisibleQuickAccess((prev) => !prev)} dynamicallyClicked={visibleQuickAccess} />
                    </div>
                </div>
                {/* new project button */}
                <Link to={`/eject/${name}/${organization}/new-project`} >
                    <div className="font-semibold flex items-center justify-center rounded-3xl py-1.5 px-3 cursor-pointer border shadow-md transition-all duration-300 ease-in-out hover:scale-105"
                        style={{
                            backgroundColor: '#3F5EFF',
                            borderColor: theme.card_img
                        }}
                    >
                        <div className="mr-1.5"><PlusIcon size={'18'} /></div>
                        <div>New Project</div>
                    </div>
                </Link>
            </div>
        </div>

        {/* for appearing organization panel */}
        { visibleOrg && <OrgContainer onClick={ () => setVisibleOrg(false) } /> }

        {/* for appearing Search panel */}
        { visibleSearchPanel && <SearchPanel
                onClick={() => setVisibleSearchPanel(prev => !prev)}
            />
        }

        {/* for appearing Quick access panel */}
        {visibleQuickAccess && (
            <QuickAccess onClick={() => setVisibleQuickAccess(false)} />
        )}
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto pb-4 
        [::-webkit-scrollbar]:hidden [scrollbar-width:none] pl-3 ">
            {(pro.state === "loading") ? 
                [...Array(9)].map((_, key: number) => (
                    <SkeletonLoader key={key} bg={theme.nav_bg} h={'360px'} w={'272px'} rounded={'16px'} loaderColor={theme.card_img} />
                ))
                : ''
            }
            {/* as plus panel gets visible set the text bar to focus to make it more clean */}
            {/* {renderBlock} */}
            
            {pro.state === 'hasValue' && pro.contents.length === 0 ? <NoProjectIcon /> : '' }
            {/* <div className="text-white"> Loading...</div> */}

            {pro.state === 'hasValue' && pro.contents.map((details: ProjectData, key: number) => (
                <ProjectTile key={key} projectTitle={details.title} image={details.projectImg} completion={details.completion} />
            ))}
        </div>
        {/* <div>
            <BottomMenu />
        </div> */}
    </div>
}
