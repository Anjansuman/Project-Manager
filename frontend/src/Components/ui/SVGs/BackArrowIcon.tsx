

interface BackArrowIconProps {
    color?: string,
    rotate?: string,
}

export const BackArrowIcon = ({ color, rotate }: BackArrowIconProps) => {
    return <div
        style={{
            transform: `rotate(${rotate}deg)`
        }}
    >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke={`${color || 'currentcolor'}`} className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>
    </div>
}