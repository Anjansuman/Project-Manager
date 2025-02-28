import { ThemeState } from "@/Atoms/ThemeState"
import { useRecoilValue } from "recoil";


export const MessageBox = ({ text, time, me }: { text: string, time: string, me: boolean }) => {

    const theme_state = useRecoilValue(ThemeState);
    const theme = (theme_state.mode == 'light') ? theme_state.light : theme_state.dark;
    const theme2 = (theme_state.mode == 'light') ? theme_state.dark : theme_state.light;

    return <div className={`bg-white p-2 pr-11 pb-5 max-w-[70%] inline-block shadow-sm ${me ? 'rounded-l-md rounded-br-md' : 'rounded-r-md rounded-bl-md'} relative`}
        style={{
            backgroundColor: !me ? theme.card_img : theme2.card_img,
            color: !me ? theme.font_color: theme2.font_color
        }}
    >
        <p className="break-words">{text}</p>
        <span className="absolute bottom-1 right-2 text-[8px] text-gray-500">{time}</span>
    </div>
}