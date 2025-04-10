import { useRecoilValue } from "recoil";
import { ThemeState } from "../../../../../Atoms/ThemeState";
import { BarGraph } from "../Bar-Graph/BarGraph";
import { BottomMenu } from "../BottomMenu/BottomMenu";
import { ProjectFile } from "../../../../ui/Customs/ProjectFile";

import gsap from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { useEffect, useRef, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { ClockIcon } from "@/Components/ui/SVGs/ClockIcon";
import { BackArrowIcon } from "@/Components/ui/SVGs/BackArrowIcon";
import { LastCommit } from "../FilesList/LastCommit";
import { File } from "../FilesList/File";
import { Link } from "react-router-dom";
import { TriangleIcon } from "@/Components/ui/SVGs/TriangleIcon";
import { QuickAccess } from "../QuickAccess/QuickAccess";

gsap.registerPlugin(TextPlugin);

interface FileProps {
    type: 'File' | 'Folder',
    title: string,
    commit: string,
    time: string,
}

export const ProjectData = () => {

    const { name, organization, projectTitle, fileTitle } = useParams();
    const navigate = useNavigate();

    const theme_state = useRecoilValue(ThemeState);
    const theme = (theme_state.mode == 'light') ? theme_state.light : theme_state.dark;

    const [files, setFiles] = useState<FileProps[]>([]);
    // this is for Quick access menu
    const [visibleQuickAccess, setVisibleQuickAccess] = useState(false);

    // Simulated file structure
    const allFiles = {
        "new project": {
            "Home.tsx": { type: "File", commit: "Created home layout", time: "2 days ago" },
            "Components": {
                "Button.tsx": { type: "File", commit: "Added button", time: "3 days ago" },
                "Navbar.tsx": { type: "File", commit: "Navbar update", time: "1 day ago" },
                "UI": {
                    "SendIcon.tsx": { type: "File", commit: "Made SVG of send icon", time: "3 days ago" },
                    "LogoIcon.tsx": { type: "File", commit: "Logo designed", time: "1 day ago" }
                }
            }
        }
    };
    
    

    useEffect(() => {
        console.log("Raw fileTitle:", fileTitle);
        const decodedFileTitle = fileTitle ? decodeURIComponent(fileTitle) : "";
        console.log("Decoded fileTitle:", decodedFileTitle);
    
        const currentFiles = getFiles(decodedFileTitle || "new project", allFiles);
        console.log("Files found:", currentFiles);
    
        setFiles(currentFiles);
    }, [projectTitle, fileTitle]);
    
    

    return <div className="h-full w-full px-4 flex flex-col items-center  ">
        <div className="w-full mb-2 flex justify-between items-center ">
            <div className={`flex justify-start items-center transition-all duration-300 ease-in-out pr-2 rounded-md cursor-pointer hover:shadow-sm text-2xl font-semibold `}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = theme.nav_bg)}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "")}
                    onClick={() => navigate(-1)}
                >
                <div className="mr-2 rounded-l-md cursor-pointer py-2 px-1">
                    <BackArrowIcon />
                </div>
                <div className="relative bottom-[3px] pr-2 ">
                    {projectTitle}
                </div>
            </div>

            <div className="flex items-center justify-between gap-5">
                {/* quick access menu */}
                {/* add a commit log */}
                <div className="flex flex-col justify-center">
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

                    { visibleQuickAccess && <QuickAccess onClick={() => setVisibleQuickAccess(prev => !prev)} /> }
                </div>

                {/* READEME.md file */}
                <Link to={`/eject/${name}/${organization}/${projectTitle}/README.md`} >
                    <div className="text-lg font-normal hover:shadow-sm transition-all duration-300 ease-in-out rounded-md py-1 px-2 cursor-pointer "
                            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = theme.nav_bg)}
                            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "")}
                        >
                        README.md
                    </div>
                </Link>
            </div>

        </div>
        <div className="h-full w-full flex flex-col border-2 rounded-xl overflow-hidden shadow-md "
            style={{
                borderColor: theme.card_img
            }}
        >
            <LastCommit />
            <div className=" overflow-y-scroll [::-webkit-scrollbar]:hidden [scrollbar-width:none]">
                {/* Display files & folders */}
                {files.map((file, index) => (
                <File 
                    key={index} 
                    {...file} 
                    onClick={() => {
                        const newPath = file.type === "Folder"
                            ? `/eject/${name}/${organization}/${projectTitle}/${fileTitle ? `${fileTitle}/${file.title}` : file.title}`
                            : `/eject/${name}/${organization}/${projectTitle}/${fileTitle ? `${fileTitle}/` : ""}${file.title}`;
                
                        console.log("Navigating to:", newPath);
                        navigate(newPath);
                    }}
                />          
                ))}
            </div>
        </div>
    </div>
}

const getFiles = (path: string, structure: any): FileProps[] => {
    const parts = path.split("/").filter(Boolean); // Split & remove empty parts
    let current = structure;

    for (const part of parts) {
        if (current[part] && typeof current[part] === "object") {
            current = current[part]; // Go deeper into the structure
        } else {
            return []; // Folder not found
        }
    }

    return Object.entries(current).map(([title, details]) => {
        const fileDetails = details as { type?: string; commit?: string; time?: string };

        if (typeof details === "object" && !fileDetails.type) {
            // If it's an object and has no "type", it's a folder
            return {
                title,
                type: "Folder",
                commit: "Folder", // Optional placeholder
                time: "" // No time for folders
            };
        }

        // Otherwise, assume it's a file
        return {
            title,
            type: (fileDetails.type as "File" | "Folder") || "File", // If no type, assume it's a file
            commit: fileDetails.commit || "",
            time: fileDetails.time || ""
        };
    });
};



/*

<div className="h-[80vh] w-[65%] mt-5 px-4 flex flex-col items-center overflow-y-scroll [::-webkit-scrollbar]:hidden [scrollbar-width:none] ">
        <div className=" flex items-center justify-between">
            <div className="flex items-center">
                <div className="h-50 w-50 bg-[#653AD847] p-1 rounded-xl mr-5">
                    <div className="h-full w-full bg-[#653AD847] rounded-xl">
                        
                    </div>
                </div>

                <div className="h-44 w-2 bg-[#653AD847] border border-[#1d1d2b] rounded-xl mr-5">

                </div>

                <div className="h-40 w-40 flex flex-col justify-around ">

                    <BarGraph color={"#e03131"} percent={'40%'} text={'HTML'} />
                    <BarGraph color={"#2f9e44"} percent={'60%'} text={'CSS'} />
                    <BarGraph color={"#1971c2"} percent={'50%'} text={'Solidity'} />
                    <BarGraph color={"#f08c00"} percent={'80%'} text={'Typescript'} />
                    <BarGraph color={"#6741d9"} percent={'20%'} text={'Javascript'} />

                </div>
            </div>
            <div className="w-[50%] text-white text-7xl font-bold tracking-wider flex justify-center items-center">
                <div ref={textRef} className="flex justify-center items-center text-center">
                    
                </div>
            </div>
        </div>

        <div className="flex justify-center items-center">
            <div className="boundry h-[1px] w-0 bg-[gray] rounded-xl flex justify-center my-4"></div>
        </div>

        <div className="w-full text-white rounded-xl flex flex-wrap p-3 pl-0 pb-0 ">
            <ProjectFile />
            <ProjectFile />
            <ProjectFile />
            <ProjectFile />
        </div>

        <BottomMenu />
        
    </div>

*/