import { ThemeState } from "@/Atoms/ThemeState";
import { ReactElement } from "react"
import { useRecoilValue } from "recoil";

interface ElementProps {
    logo: ReactElement,
    name: string,
    rightMargin: string,
}

export const Element = ({ logo, name, rightMargin }: ElementProps) => {

    const theme_state = useRecoilValue(ThemeState);
    const theme = (theme_state.mode == 'light') ? theme_state.light : theme_state.dark;


    return <div className={`flex flex-col items-center justify-center transition-colors duration-300 ease-in-out cursor-pointer px-3 py-2 rounded-lg mr-${rightMargin}`}
    style={{ "--hover-color": theme.card_img } as React.CSSProperties}
    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = theme.card_img)}
    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "")}      
>
    {logo}
    <span>{name}</span>
</div>
}