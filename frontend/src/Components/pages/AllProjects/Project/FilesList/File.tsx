import { ThemeState } from "@/Atoms/ThemeState";
import { FileIcon } from "@/Components/ui/SVGs/FileIcon";
import { FolderIcon } from "@/Components/ui/SVGs/FolderIcon";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";

interface FileProps {
    type: 'File' | 'Folder',
    title: string,
    commit: string,
    time: string,
    onClick: () => void
}

export const File = ({ type, title, commit, time, onClick }: FileProps) => {

    const { name, organization, projectTitle } = useParams();

    const isFolder = type === "Folder"; // Check if it's a folder
    const navigate = useNavigate();

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        if (isFolder) {
            e.preventDefault(); // Stop navigation for folders
            navigate(`/eject/${name}/${organization}/${projectTitle}/${title}`);
        }
    };

    const theme_state = useRecoilValue(ThemeState);
    const theme = (theme_state.mode == 'light') ? theme_state.light : theme_state.dark;

    return <div className="w-full flex px-4 py-2 border-b-2 cursor-pointer "
            style={{
                borderColor: theme.card_img
            }}
            onClick={onClick}
        >
            <div className="w-[40%] flex items-center justify-start ">
                <div className="mr-2">
                    {TypeIcon({ type })}
                </div>
                <div>
                    {title}
                </div>
            </div>
            <div className="w-[60%] flex justify-between ">
                <div className="text-[gray] ">
                    {commit}
                </div>
                <div className="text-[gray] ">
                    {time}
                </div>
            </div>
        </div>
}


const TypeIcon = ({ type }: { type: string }) => {
    if(type === 'File') {
        return <div>
            <FileIcon color={'gray'} size={'20px'} />
        </div>
    } else {
        return <div>
            <FolderIcon color={'gray'} size={'20px'} />
        </div>
    }
}