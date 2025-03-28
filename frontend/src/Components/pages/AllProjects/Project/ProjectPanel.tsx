import { useRecoilValue } from "recoil";
import { ThemeState } from "../../../../Atoms/ThemeState";
// import { BarGraph } from "./Bar-Graph/BarGraph";
// import { BottomMenu } from "./BottomMenu/BottomMenu";
// import { ProjectFile } from "../../../ui/Customs/ProjectFile";

import gsap from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { useEffect, useRef, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
// import { ClockIcon } from "@/Components/ui/SVGs/ClockIcon";
import { BackArrowIcon } from "@/Components/ui/SVGs/BackArrowIcon";
import { LastCommit } from "./FilesList/LastCommit";
import { File } from "./FilesList/File";
import { Link } from "react-router-dom";
import { TriangleIcon } from "@/Components/ui/SVGs/TriangleIcon";
import { QuickAccess } from "./QuickAccess/QuickAccess";
import { ProjectData } from "./ProjectData/ProjectData";

gsap.registerPlugin(TextPlugin);

interface FileProps {
    type: 'File' | 'Folder',
    title: string,
    commit: string,
    time: string,
}

export const ProjectPanel = () => {

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
    
    

    return <div className="h-[80vh] w-[65%] mt-5 px-4 flex flex-col items-center  "
        style={{
            color: theme.font_color
        }}
    >
        <Outlet />
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
