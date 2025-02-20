import { useEffect, useRef } from "react";
import gsap from "gsap";


interface BarGraphProps {
    color: string,
    percent: string,
    text: string,
}

export const BarGraph = ({ color, percent, text }: BarGraphProps) => {

    const barRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if(barRef.current) {
            gsap.to(barRef.current, {
                width: `${percent}`,
                duration: 2,
                ease: 'power2.out'
            })
        }
    }, [percent]);

    return <div className="w-full flex items-center">
        <div className="bar h-[10px] rounded-xs border "
            ref={barRef}
            style={{
                borderColor: color,
                backgroundColor: `${color}60`,
                width: 0
            }}
        ></div>
        <div className="text-gray-500 text-xs ml-2">
            {text}
        </div>
    </div>
            
}