import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { Socket } from "@/Atoms/socket";

interface useProjectSocketProps {
    projectId: string,
    userId: string,
    onMessage?: (msg: any) => void,
    onNewMessage?: () => void
}

export const useProjectSocket = ({ userId, onMessage, onNewMessage }: useProjectSocketProps) => {

    const socket = useRecoilValue(Socket);
    console.log(socket ? "connected to socket" : "disconnected to socket");


    useEffect(() => {

        if(!socket || socket.readyState !== WebSocket.OPEN || !userId) return;

        // const sendJoin = () => {
        //     const join = {
        //         type: "join",
        //         payload: {
        //             roomId: projectId
        //         }
        //     };
            
        //     (socket.readyState === WebSocket.OPEN) ? socket.send(JSON.stringify(join)) : setTimeout(sendJoin, 100);
        // }

        // sendJoin();

        const handleMessage = (event: MessageEvent) => {
            try {
                const data = JSON.parse(event.data);

                console.log("message came");

                if(data.message && data.time) {
                    onMessage?.({
                        msg: data.message,
                        time: data.time,
                        sender: data.sender
                    });

                    if(data.sender !== userId) {
                        onNewMessage?.();
                    }
                }

            } catch (error) {
                console.log("Error while sending messages");
            }
        }

        socket.addEventListener("message", handleMessage);

        // return () => {
        //     socket.removeEventListener("message", handleMessage);
        //     // optionally leave room
        //     socket.send(JSON.stringify({
        //       type: "leave",
        //       payload: { roomId: projectId }
        //     }));
        // }

    }, [userId, onMessage, onNewMessage]);


}