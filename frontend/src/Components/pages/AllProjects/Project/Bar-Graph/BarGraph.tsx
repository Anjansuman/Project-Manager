

interface BarGraphProps {
    color: string,
    percent: string,
    text: string,
}

export const BarGraph = ({ color, percent, text }: BarGraphProps) => {
    return <div className="w-full flex items-center">
        <div className="h-[10px] rounded-xs border "
            style={{
                borderColor: color,
                backgroundColor: `${color}60`,
                width: percent
            }}
        ></div>
        <div className="text-gray-500 text-xs ml-2">
            {text}
        </div>
    </div>
            
}