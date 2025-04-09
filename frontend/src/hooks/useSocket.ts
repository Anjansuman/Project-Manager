import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { Socket } from "@/Atoms/socket";


export function useSocket(projectId: string, userId: string) {

    const setSocket = useSetRecoilState(Socket);

    useEffect(() => {

        const socket = new WebSocket("http://localhost:3000");

        socket.onopen = () => {
            const auth = {
                type: "AUTH",
                payload: {
                    userId: userId
                }
            }

            socket.send(JSON.stringify(auth));
        }


        socket.onclose = () => {
            // socket closed
            console.log("socket closed");
        }

        socket.onerror = () => console.log("Error occured!")

        setSocket(socket);

        return () => {
            socket.close();
            setSocket(null);
        }

        // in the dependency array use userId if needed
    }, [userId, setSocket])

}