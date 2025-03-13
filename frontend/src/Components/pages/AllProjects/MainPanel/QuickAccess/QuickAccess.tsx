
import { ThemeState } from "@/Atoms/ThemeState"
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

    return <div className="h-auto w-70 absolute z-20 right-43 top-36 rounded-sm shadow-md border px-3 py-2 overflow-hidden backdrop-blur-md "
        style={{
            // backgroundColor: theme.card_bg,
            borderColor: theme.card_img,
            color: theme.font_color
        }}
        ref={wrapperRef}
    >

        <div className="w-full flex flex-col justify-center items-start ">
            {['Meeting', 'Members'].map((element, index, array) => (
                <div className="w-full hover:underline cursor-pointer ">
                    <Link to={`/eject/${name}/${organization}/${element}`} >
                        <div>
                            {element}
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
}