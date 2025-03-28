import { ThemeState } from "@/Atoms/ThemeState";
import { Circle, Eraser, Hand, Minus, MousePointer2, Pencil, Square, TypeOutlineIcon } from "lucide-react"
import { useRecoilValue } from "recoil";


export const ToolBar = () => {

    const theme_state = useRecoilValue(ThemeState);
    const theme = (theme_state.mode == 'light') ? theme_state.light : theme_state.dark;

    function mouseEnter(e: React.MouseEvent) {
        if (e.currentTarget) {
            (e.currentTarget as HTMLElement).style.backgroundColor = '#3F5EFF30';
        }
    }

    function mouseLeave(e: React.MouseEvent) {
        if (e.currentTarget) {
            (e.currentTarget as HTMLElement).style.backgroundColor = '';
        }
    }

    return <div className="relative flex justify-center">
        <div className="h-[50px] w-auto fixed top-[115px] rounded-lg border shadow-sm flex justify-around items-center px-3 gap-3 backdrop-blur-xl"
            style={{
                backgroundColor: `${theme.card_bg}50`,
                borderColor: theme.font_color
            }}
        >
        {[Hand, MousePointer2, Square, Circle, Minus, Pencil, TypeOutlineIcon, Eraser].map((Icon, index) => (
            <div
                key={index}
                className="p-2 transition-colors duration-300 ease-in-out rounded-sm cursor-pointer"
                onMouseEnter={(e) => mouseEnter(e)}
                onMouseLeave={(e) => mouseLeave(e)}
            >
                <Icon size="18" />
            </div>
        ))}
            
        </div>
    </div>
}