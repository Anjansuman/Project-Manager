
interface DownArrowIconProps {
    color?: string,
    rotate?: string,
    size: string,
}

export const DownArrowIcon = ({ color, rotate, size }: DownArrowIconProps) => {
    return <div
        style={{
            transform: `rotate(${rotate}deg)`
        }}
    >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke={`${color|| 'currentcolor'}`} className=""
            style={{
                width: size,
                height: size,
            }}
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
        </svg>
    </div>
}