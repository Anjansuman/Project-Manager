

export const MessageBox = ({ text }: { text: string }) => {
    return <div className="bg-white p-2 max-w-[50%] inline-block rounded-r-md rounded-bl-md">
        {text}
    </div>
}