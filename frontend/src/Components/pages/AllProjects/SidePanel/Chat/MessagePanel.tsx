import { useState, useRef, useEffect } from "react";

import { MessageBox } from "../../../../ui/Customs/MessageBox"
import { Input } from "../../../../ui/Customs/Input";
import { SendButton } from "../../../../ui/SVGs/SendButton";


interface Messages {
    msg: string,
    time: string
}

export const MessagePanel = ({ projectId }: { projectId: string }) => {

    const wsRef = useRef<WebSocket | null>();
    const [messages, setMessages] = useState<Messages[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const ws = new WebSocket("ws://localhost:3000");
        wsRef.current = ws;

        ws.onmessage = (event) => {
            try {
                const receivedData = JSON.parse(event.data);
                
                if(receivedData.message && receivedData.time) {
                    setMessages((m) => [...m, {
                        msg: receivedData.message,
                        time: receivedData.time
                    }]);
                }

            } catch (error) {
                console.log("Error parsing msg or time: ", error);
            }
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
            wsRef.current = null;
        }

    }, [projectId]);

    function sendMessage() {
        const input = inputRef.current?.value.trim();
        if (!input || !wsRef.current) return;

        const messageData = {
            type: "chat",
            payload: {
                message: input,
                time: getTime()
                //sender: userId
            }
        };

        wsRef.current.send(JSON.stringify(messageData));

        setMessages((m) => [...m, {
            msg: input,
            time: getTime()
        }])

        if(inputRef.current) {
            inputRef.current.value = "";
        }
    }

    function handleOnKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
        if(event.key === "Enter") {
            sendMessage();
        }
    }

    const getTime = () => {
        return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
    };

    
    return <div className="h-full w-full">
        <div className="h-[89%] w-full bg-[#03061C69] p-[3px] rounded-xl mb-3 shadow-lg">
            <div className="h-full w-full bg-[#03061C] rounded-xl p-3 overflow-y-scroll overflow-x-hidden [::-webkit-scrollbar]:hidden [scrollbar-width:none] shadow-lg">
                {messages.map((m, key) => <div className="w-full mb-2 shadow-sm flex">
                    <MessageBox key={key} text={m.msg} time={m.time} />
                </div>)}
            </div>
        </div>
        <div className="h-[10%] bg-[#03061C69] rounded-lg p-0.5 flex items-center justify-center shadow-lg ">
            <div className="h-full w-full bg-[#03061C] pr-2 rounded-lg flex items-center justify-between shadow-lg ">
                <Input placeholder={"Type a message..."} bg={'#03061C'}  inputRef={inputRef} onKeyDown={handleOnKeyDown} />
                <SendButton onClick={sendMessage} size={'30'} color={"#6f49d6"} />
            </div>
        </div>
    </div>
}

/*
            <div className="bg-white rounded-full pl-1 p-1 pr-1 flex justify-center items-center">
                <SendButton onClick={sendMessage} size={'40'} color={"red"} />
            </div>
*/

{/* <Button text={'Send'} bg={'#03061C'} onClick={sendMessage} /> */}
