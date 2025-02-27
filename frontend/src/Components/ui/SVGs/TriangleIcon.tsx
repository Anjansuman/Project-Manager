
interface TriangleIconProps {
    color: string,
    size: string,
    onClick?: () => void,
    dynamicallyClicked?: boolean
}

export const TriangleIcon = ({ color, size, dynamicallyClicked }: TriangleIconProps) => {

    return <div>
        <svg height={`${size}`} viewBox="0 0 120 61" fill="none" xmlns="http://www.w3.org/2000/svg"
            className={`cursor-pointer transition-all duration-200 ease-in-out ${dynamicallyClicked ? 'rotate-180' : ''} `}
        >
            <path d="M65.7732 58.1727C62.4315 60.9669 57.5685 60.9669 54.2268 58.1727L3.67645 15.9044C-2.77547 10.5095 1.03944 0 9.44965 0L110.55 0C118.961 0 122.775 10.5095 116.324 15.9044L65.7732 58.1727Z" fill={`${color}`} />
        </svg>
    </div>
}