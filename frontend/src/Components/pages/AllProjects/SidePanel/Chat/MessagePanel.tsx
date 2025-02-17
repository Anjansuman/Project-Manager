import { useState, useRef, useEffect } from "react";

import { MessageBox } from "../../../../ui/Customs/MessageBox"
import { Input } from "../../../../ui/Customs/Input";
import { Button } from "../../../../ui/Customs/Button";


export const MessagePanel = ({ projectId }: { projectId: string }) => {

    const wsRef = useRef<WebSocket>();
    const [messages, setMessages] = useState<string[]>(["hellow"]);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const ws = new WebSocket("ws://localhost:8080");
        wsRef.current = ws;

        ws.onmessage = (event) => {
            setMessages(m => [...m, event.data])
        }

        ws.onopen = () => {
            ws.send(JSON.stringify({
                type: "join",
                payload: {
                    roomId: projectId
                }
            }))
        }

        return () => {
            ws.close();
        }

    }, []);

    function sendMessage() {
        const input = inputRef.current?.value.trim();

        wsRef.current?.send(JSON.stringify({
            type: "chat",
            payload: {
                message: input
            }
        }))

        if(inputRef.current) {
            inputRef.current.value = "";
        }
    }

    
    return <div className="h-full w-full">
            <div className="h-full w-full bg-[#03061C69] p-1 rounded-xl mb-3">
            <div className="h-full w-full bg-[#03061C] rounded-xl p-3 overflow-y-scroll [::-webkit-scrollbar]:hidden [scrollbar-width:none]">
                {messages.map((m) => <div className="w-full mb-2">
                    <MessageBox text={m} />
                </div>)
                }
            </div>
        </div>
        <div className="h-[10%] flex items-center justify-between ">
            <Input placeholder={"Type a message..."} bg={'#03061C'} h={'40px'} inputRef={inputRef} />
            <Button text={'Send'} bg={'#03061C'} onClick={sendMessage} />
        </div>
    </div>
}