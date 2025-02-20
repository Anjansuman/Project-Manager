
interface SendButton {
    onClick: () => void,
    size: string,
    color: string,

}

export const SendButton = ({ onClick, size, color }: SendButton) => {
    return <div>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
            stroke={`${color}`}
            className="hover:bg-[#1e2136] p-1 rounded-sm cursor-pointer transition-colors duration-200 ease-in-out"
            onClick={onClick}
            height={`${size}`}
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                className=""
            />
        </svg>
    </div>
}