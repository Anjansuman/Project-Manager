import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { Socket } from "@/Atoms/socket";


export function useSocket(projectId: string, userId: string) {

    const setSocket = useSetRecoilState(Socket);

    useEffect(() => {

        if(!userId) return;

        const socket = new WebSocket("ws://localhost:3000");
        console.log("socket connected to backend");

        socket.onopen = () => {
            // const auth = {
            //     type: "AUTH",
            //     payload: {
            //         userId: userId
            //     }
            // }

            // socket.send(JSON.stringify(auth));
            const join = {
                type: "join",
                payload: {
                    roomId: projectId,
                    userId: userId
                }
            }
            socket.send(JSON.stringify(join));
            console.log("socket send the join message");
        }


        socket.onclose = () => {
            // socket closed
            console.log("socket closed");
        }

        socket.onerror = (error) => console.log("Error occured!: ", error);

        setSocket(socket);
        console.log("socket value set");

        return () => {
            socket.close();
            setSocket(null);
        }

        // in the dependency array use userId if needed
    }, [userId, projectId, setSocket])

}