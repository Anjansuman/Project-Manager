import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { Socket } from "@/Atoms/socket";

interface useProjectSocketProps {
    projectId: string,
    userId: string,
    onMessage?: (msg: any) => void,
    onNewMessage?: () => void
}

export const useProjectSocket = ({ projectId, userId, onMessage, onNewMessage }: useProjectSocketProps) => {

    const socket = useRecoilValue(Socket);


    useEffect(() => {

        if(!socket || !userId) return;

        const join = {
            type: "join",
            payload: {
                roomId: projectId
            }
        };
        socket.send(JSON.stringify(join));

        const handleMessage = (event: MessageEvent) => {
            try {
                const data = JSON.parse(event.data);

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

        return () => {
            socket.removeEventListener("message", handleMessage);
            // optionally leave room
            socket.send(JSON.stringify({
              type: "leave",
              payload: { roomId: projectId }
            }));
        }

    }, [userId, projectId, onMessage, onNewMessage]);


}