
import { ThemeState } from "@/Atoms/ThemeState"
import { CalenderIcon } from "@/Components/ui/SVGs/CalenderIcon";
import { CameraIcon } from "@/Components/ui/SVGs/CameraIcon";
import { ChatIcon } from "@/Components/ui/SVGs/ChatIcon";
import { CLiIcon } from "@/Components/ui/SVGs/CLiIcon";
import { PageIcon } from "@/Components/ui/SVGs/PageIcon";
import { PenIcon } from "@/Components/ui/SVGs/PenIcon";
import { TeamIcon } from "@/Components/ui/SVGs/TeamIcon";
import { useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil"

interface QuickAccessProps {
    onClick: () => void 
}

export const QuickAccess = ({ onClick }: QuickAccessProps) => {

    const { name, organization, projectTitle } = useParams();

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
    const InvertedTheme = (theme_state.mode === 'light') ? theme_state.dark : theme_state.light;

    return <div className="relative">
        <div className="h-auto w-70 absolute z-20 top-3 right-1 rounded-sm shadow-md border px-3 py-2 overflow-hidden backdrop-blur-md"
            style={{
                // backgroundColor: theme.card_bg,
                borderColor: theme.card_img,
                color: theme.font_color
            }}
            ref={wrapperRef}
        >

            <div className="w-full flex flex-col justify-center items-start text-sm ">
                {['Description', 'Commits', 'Messaging', 'Meeting', 'Members', 'Canvas', 'Events'].map((element, index, array) => (
                    <div className="w-full cursor-pointer hover:underline ">
                        <Link to={`/eject/${name}/${organization}/${projectTitle}/${element.toLowerCase()}`} >
                            <div className="flex items-center">
                                <div className="mr-2">
                                    <DivLogo type={element} />
                                </div>
                                <div>{element}</div>
                            </div>
                        </Link>
                        { (index !== array.length - 1) ? (
                            // dividing line
                            <div className="h-0.5 w-full my-1 " style={{ backgroundColor: theme.card_img }} ></div>
                        ) : ''}
                    </div>

                ))}
            </div>

        </div>
    </div>
}

function DivLogo({ type }: { type: string }) {

    const theme_state = useRecoilValue(ThemeState);
    const theme = (theme_state.mode === 'light') ? theme_state.light : theme_state.dark;

    if(type === 'Commits') {
        return <CLiIcon size={'15px'} />
    } else if(type === 'Meeting') {
        return <CameraIcon size={'15px'} color={theme.font_color} />
    } else if(type === 'Members') {
        return <TeamIcon size={'15px'} />
    } else if(type === 'Messaging') {
        return <ChatIcon size={'15px'} color={theme.font_color} />
    } else if(type === 'Canvas') {
        return <PenIcon size={'15px'} />
    } else if(type === 'Events') {
        return <CalenderIcon size={'15px'} />
    } else if(type === 'Description') {
        return <PageIcon size={'15px'} />
    }
}