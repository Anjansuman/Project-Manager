import { useEffect } from "react";
import { useSetRecoilState, useRecoilState } from "recoil";
import { Socket } from "@/Atoms/socket";


// projectId: string, 
export function useSocket(userId: string) {

    const [newSocket, setNewSocket] = useRecoilState(Socket);

    useEffect(() => {

        if(!userId || newSocket?.readyState === WebSocket.OPEN) return;

        const socket = new WebSocket("ws://localhost:3000");
        console.log("socket connected to backend");

        socket.onopen = () => {
            const auth = {
                type: "AUTH",
                payload: {
                    userId: userId
                }
            }

            socket.send(JSON.stringify(auth));
            // const join = {
            //     type: "join",
            //     payload: {
            //         roomId: projectId,
            //         userId: userId
            //     }
            // }
            // socket.send(JSON.stringify(join));
            // console.log("socket send the join message");
        }


        socket.onclose = () => {
            // socket closed
            console.log("socket closed");
        }

        socket.onerror = (error) => console.log("Error occured!: ", error);

        setNewSocket(socket);
        console.log("socket value set");

        return () => {
            socket.close();
            setNewSocket(null);
        }

        // in the dependency array use userId if needed
    }, [userId, setNewSocket])

}