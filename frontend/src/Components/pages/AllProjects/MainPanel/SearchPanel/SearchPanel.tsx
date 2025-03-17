import { Project } from "@/Atoms/Project";
import { ThemeState } from "@/Atoms/ThemeState";
import { SkeletonLoader } from "@/Components/ui/Customs/SkeletonLoader";
import { PlusIcon } from "@/Components/ui/SVGs/PlusIcon";
import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useRecoilValue, useRecoilValueLoadable } from "recoil";

interface SearchPanelProps {
    onClick: () => void
}

interface ProjectData {
    title: string,
    projectImg: string,
    completion: string
}

export const SearchPanel = ({ onClick }: SearchPanelProps) => {

    const { organization, name } = useParams<{ organization: string, name: string }>();

    const pro = useRecoilValueLoadable(Project(organization || ""));

    const wrapperRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
            onClick();
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
        }, []);

    const theme_state = useRecoilValue(ThemeState);
    const theme = (theme_state.mode === 'light') ? theme_state.light : theme_state.dark;

    return <div className="h-auto max-h-96 w-83 absolute z-20 right-98 top-36 rounded-sm shadow-md border px-3 py-2 overflow-y-scroll [::-webkit-scrollbar]:hidden [scrollbar-width:none] backdrop-blur-md"
        style={{
            // backgroundColor: theme.card_bg,
            borderColor: theme.card_img,
            color: theme.font_color
        }}
        ref={wrapperRef}
    >

        { pro.state === 'loading' ? 
            ['1', '2', '3', '4'].map((index) => (
                <div key={index} >
                    <SkeletonLoader bg={theme.nav_bg} loaderColor={theme.background} h={'30px'} w={'100%'} rounded={'5px'} />
                    { index !== '4' ? 
                        // dividing line
                        <div className="h-0.5 w-full my-1 " style={{ backgroundColor: theme.card_img }} ></div>
                    : ''}
                </div>
            ))
        : '' }

        { pro.state === 'hasValue' && pro.contents.length === 0 ? 
            <div className="flex flex-col items-center font-semibold">
                <div className="mb-2">
                    No projects yet!
                </div>
                <Link to={`/eject/${name}/${organization}/new-project`} >
                    <div className="border-2 border-[#3F5EFF] px-2.5 py-1 rounded-full flex justify-center items-center transition-colors duration-300 ease-in-out hover:bg-[#3f5fffb5] cursor-pointer shadow-md ">
                        <PlusIcon size={'15px'} color={theme.font_color} />
                        <div className="ml-2 flex justify-center ">
                            Create One
                        </div>
                    </div>
                </Link>
            </div>
        : '' }

        { pro.state === 'hasValue' ?
            pro.contents.map((details: ProjectData, index: number, key: number) => (
                <div key={key} >
                    <Link to={`/eject/${name}/${organization}/${details.title}`} >
                        <div className="transition-all duration-200 ease-in-out hover:underline cursor-pointer " >
                            {details.title}
                        </div>
                    </Link>
                    {index !== pro.contents.length - 1 ? (
                        // dividing line
                        <div className="h-0.5 w-full my-1 " style={{ backgroundColor: theme.card_img }} ></div>
                    ) : 
                        ''
                    }
                </div>
            ))
        : '' }

        {/* { pro.contents.length === 0 ? 
            <div className="flex flex-col items-center font-semibold">
                <div className="mb-2">
                    No projects yet!
                </div>
                <Link to={`/eject/${name}/${organization}/new-project`} >
                    <div className="border-2 border-[#3F5EFF] px-2.5 py-1 rounded-full flex justify-center items-center transition-colors duration-300 ease-in-out hover:bg-[#3f5fffb5] cursor-pointer shadow-md ">
                        <PlusIcon size={'15px'} color={theme.font_color} />
                        <div className="ml-2 flex justify-center ">
                            Create One
                        </div>
                    </div>
                </Link>
            </div> : pro.contents.map((details: ProjectData, index: number, key: number) => (
            <div key={key} >
                <Link to={`/eject/${name}/${organization}/${details.title}`} >
                    <div className="transition-all duration-200 ease-in-out hover:underline cursor-pointer " >
                        {details.title}
                    </div>
                </Link>
                {index !== pro.contents.length - 1 ? (
                    // dividing line
                    <div className="h-0.5 w-full my-1 " style={{ backgroundColor: theme.card_img }} ></div>
                ) : 
                    ''
                }
            </div>
        ))
        }

        {} */}

    </div>
}