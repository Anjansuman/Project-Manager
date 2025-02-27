import { ThemeState } from "@/Atoms/ThemeState"
import { useRecoilValue } from "recoil";


export const MessageBox = ({ text, time }: { text: string, time: string }) => {

    const theme_state = useRecoilValue(ThemeState);
    const theme = (theme_state.mode == 'light') ? theme_state.light : theme_state.dark;

    return <div className="bg-white p-2 pr-5 pb-3 max-w-[70%] inline-block shadow-sm rounded-r-md rounded-bl-md relative"
        style={{
            backgroundColor: theme.card_img
        }}
    >
        <p className="break-words">{text}</p>
        <span className="absolute bottom-1 right-2 text-[8px] text-gray-500">{time}</span>
    </div>
}