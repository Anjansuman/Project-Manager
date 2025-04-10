
import { ThemeState } from "@/Atoms/ThemeState"
import { CameraIcon } from "@/Components/ui/SVGs/CameraIcon";
import { PenIcon2 } from "@/Components/ui/SVGs/PenIcon2";
import { TeamIcon } from "@/Components/ui/SVGs/TeamIcon";
import { useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil"

interface QuickAccessProps {
    onClick: () => void 
}

export const QuickAccess = ({ onClick }: QuickAccessProps) => {

    const { name, organization } = useParams();

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

    return <div className="relative ">
            <div className="h-auto w-70 absolute z-20 top-3 right-1 rounded-sm shadow-md border px-3 py-2 overflow-hidden backdrop-blur-md "
            style={{
                // backgroundColor: theme.card_bg,
                borderColor: theme.card_img,
                color: theme.font_color
            }}
            ref={wrapperRef}
        >

            <div className="w-full flex flex-col justify-center items-start text-sm ">
                {['Edit Organization', 'Meeting', 'Members'].map((element, index, array) => (
                    <div className="w-full hover:underline cursor-pointer ">
                        <Link to={`/eject/${name}/${organization}/${element}`} >
                            <div className="flex items-center">
                                <DivLogo type={element} />
                                <div className="ml-2">
                                    {element}
                                </div>
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

    if(type === 'Edit Organization') {
        return <PenIcon2 size={'15px'} />
    } else if(type === 'Meeting') {
        return <CameraIcon size={'15px'} color={theme.font_color} />
    } else if(type === 'Members') {
        return <TeamIcon size={'15px'} />
    }
}