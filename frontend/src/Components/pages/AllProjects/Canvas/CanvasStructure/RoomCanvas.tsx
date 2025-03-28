

interface RoomCanvasProps {
    projectId: string,
    socket: WebSocket
}

export const RoomCanvas = () => {



    return <div className="h-full w-full ">
        <canvas height={"500"} width={"500"} className="bg-red-200"></canvas>
    </div>
}