import { motion } from "framer-motion";

import { useRecoilValue } from "recoil";
import { ThemeState } from "../../../Atoms/ThemeState";

interface ButtonProps {
    text: string;
    onClick?: () => void;
    bg?: string;
    h?: string;
    w?: string;
    size?: 'sm' | 'md' | 'lg';
    rounded?: boolean;
    dark?: number;
}

const sizeStyles = {
    "sm": "text-sm px-2 py-1",
    "md": "text-md px-4 py-2",
    "lg": "text-xl px-6 py-2"
}

export const Button = ({ text, onClick, bg, w, h, size = 'md', rounded, dark }: ButtonProps) => {

    const theme_state = useRecoilValue(ThemeState);
    const theme = (theme_state.mode === 'light') ? theme_state.light : theme_state.dark;

    const darkenColor = (color: string, percent: number) => {
        let num = parseInt(color.replace("#", ""), 16),
            amt = Math.round(2.55 * percent),
            r = (num >> 16) - amt,
            g = ((num >> 8) & 0x00ff) - amt,
            b = (num & 0x0000ff) - amt;
    
        return `rgb(${Math.max(r, 0)}, ${Math.max(g, 0)}, ${Math.max(b, 0)})`;
    };

    return <div className="flex justify-center items-center">
        <motion.button
            whileHover={{ backgroundColor: darkenColor(bg || theme.light_panel, dark || 15) }}
            className={`flex justify-center items-center rounded-md cursor-pointer ${sizeStyles[size]} overflow-hidden `}
            style={{
                backgroundColor: `${bg || theme.light_panel}`,
                height: `${h || ""}`,
                width: `${w || ""}`,
                borderRadius: `${rounded ? '50px' : ''}`,
                color: theme.font_color
            }}
            onClick={onClick}
        >
            {text}
        </motion.button>
    </div>
}