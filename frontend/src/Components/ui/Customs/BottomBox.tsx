import { ReactElement } from "react"

interface BottomBoxProps {
    color?: string,
    element: ReactElement,
    onClick?: () => void,
    z?: number,
    hoverBG?: string,
}

export const BottomBox = ({ color, element, onClick, z, hoverBG = "" }: BottomBoxProps) => {
    return  <div className="h-[70px] w-[70px] bg-[#653AD847] border border-[#1d1d2b] p-0.5 rounded-full absolute right-12 bottom-28 cursor-pointer "
        style={{
            zIndex: `${z}`
        }}
        onClick={onClick}
    >
        <div className={`h-full w-full bg-[#653AD847] rounded-full text-white flex items-center justify-center `}
            style={{
                backgroundColor: color,
                transition: "background-color 0.3s ease-in-out"
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = hoverBG)}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = color || '#653AD847')}
        >
            {element}
        </div>
    </div>
}

/*
<div className="flex items-baseline justify-center">
                <div className="text-xl font-bold">
                    28
                </div>
                <span className="text-xs text-[gray] ">mins</span>
                </div>
*/

                {/* <div className="text-xs font-semibold relative bottom-1 ">days</div> */}
