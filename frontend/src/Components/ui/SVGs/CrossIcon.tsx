
interface CrossIconProps {
    color: string,
    size: string,
    onClick?: () => void
}

export const CrossIcon = ({ color, size, onClick }: CrossIconProps) => {
    return <div>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke={`${color}`} className={`size-10 cursor-pointer`} onClick={onClick} >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
    </div>
}