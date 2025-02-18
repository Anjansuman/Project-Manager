

export const MessageBox = ({ text }: { text: string }) => {
    return <div className="bg-white p-2 pr-5 pb-3 max-w-[50%] inline-block rounded-r-md rounded-bl-md relative">
        <p className="leading-tight">{text}</p>
        <span className="absolute bottom-1 right-2 text-[8px] text-gray-500">01:23</span>
    </div>
}