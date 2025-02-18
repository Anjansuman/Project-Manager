

export const MessageBox = ({ text, time }: { text: string, time: string }) => {
    return <div className="bg-white p-2 pr-5 pb-3 max-w-[70%] inline-block rounded-r-md rounded-bl-md relative">
        <p className="break-words">{text}</p>
        <span className="absolute bottom-1 right-2 text-[8px] text-gray-500">{time}</span>
    </div>
}