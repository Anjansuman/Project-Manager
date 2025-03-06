import { ThemeState } from "@/Atoms/ThemeState";
import { FileIcon } from "@/Components/ui/SVGs/FileIcon";
import { FolderIcon } from "@/Components/ui/SVGs/FolderIcon";
import { useRecoilValue } from "recoil";

interface FileProps {
    type: 'File' | 'Folder',
    name: string,
    commit: string,
    time: string,
}

export const File = ({ type, name, commit, time }: FileProps) => {


        const theme_state = useRecoilValue(ThemeState);
        const theme = (theme_state.mode == 'light') ? theme_state.light : theme_state.dark;

    return <div className="w-full flex px-4 py-2 border-b-2 "
        style={{
            borderColor: theme.card_img
        }}
    >
        <div className="w-[40%] flex items-center justify-start ">
            <div className="mr-2">
                {TypeIcon({ type })}
            </div>
            <div>
                {name}
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