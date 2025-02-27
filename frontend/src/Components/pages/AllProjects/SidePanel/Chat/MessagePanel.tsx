import { useState, useRef, useEffect } from "react";

import { MessageBox } from "../../../../ui/Customs/MessageBox"
import { Input } from "../../../../ui/Customs/Input";
import { SendButton } from "../../../../ui/SVGs/SendButton";
import { useRecoilValue } from "recoil";
import { ThemeState } from "@/Atoms/ThemeState";


interface Messages {
    msg: string,
    time: string,
    sender: string | null
}

export const MessagePanel = ({ projectId }: { projectId: string }) => {

    const wsRef = useRef<WebSocket | null>();
    const [messages, setMessages] = useState<Messages[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        getUserId();
        const ws = new WebSocket("ws://localhost:3000");
        wsRef.current = ws;

        ws.onmessage = (event) => {
            try {
                const receivedData = JSON.parse(event.data);
                
                if(receivedData.message && receivedData.time) {
                    setMessages((m) => [...m, {
                        msg: receivedData.message,
                        time: receivedData.time,
                        sender: userId
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
                    roomId: 'hell'
                }
            }))
        }

        return () => {
            ws.close();
            wsRef.current = null;
        }

    }, [projectId]);

    function getUserId() {
        try {
            const jwt = localStorage.getItem("token");
            if (!jwt) return;
    
            const payload = JSON.parse(atob(jwt.split(".")[1]));
    
            if (payload?.userId) {
                setUserId(payload.userId);
            } else {
                console.warn("User ID not found in token payload");
            }
        } catch (error) {
            console.error("Invalid token:", error);
        }
    }
    

    function sendMessage() {
        const input = inputRef.current?.value.trim();
        if (!input || !wsRef.current) return;

        const messageData = {
            type: "chat",
            payload: {
                message: input,
                time: getTime(),
                sender: userId
            }
        };

        wsRef.current.send(JSON.stringify(messageData));

        // setMessages((m) => [...m, {
        //     msg: input,
        //     time: getTime(),
        //     sender: userId
        // }])

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

    const theme_state = useRecoilValue(ThemeState);
    const theme = (theme_state.mode == 'light') ? theme_state.light : theme_state.dark;
    
    return <div className="h-full w-full ">
        <div className="h-[88%] w-full rounded-t-[14px] p-2 overflow-y-scroll [::-webkit-scrollbar]:hidden [scrollbar-width:none] ">
            {messages.map((m, key) => <div className={`w-full mb-2 flex ${m.sender == userId ? 'justify-end': ''}`}>
                <MessageBox key={key} text={m.msg} time={m.time} me={m.sender == userId ? true : false} />
            </div>)}
        </div>
        <div className="border"
            style={{ borderColor: theme.card_img }}
        ></div>
        <div className="h-[12%] w-full rounded-b-[14px] ">
            <div className="h-full w-full pr-2 rounded-lg flex items-center justify-between shadow-lg ">
                <Input
                    placeholder={"Type a message..."}
                    bg={'transparent'}
                    inputRef={inputRef}
                    onKeyDown={handleOnKeyDown}
                />
                <SendButton onClick={sendMessage} size={'35'} color={theme.font_color} hoverBG={theme.card_img} />
            </div>
        </div>
    </div>
}


/*

<div className="h-full w-full">
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

*/

/*
            <div className="bg-white rounded-full pl-1 p-1 pr-1 flex justify-center items-center">
                <SendButton onClick={sendMessage} size={'40'} color={"red"} />
            </div>
*/

{/* <Button text={'Send'} bg={'#03061C'} onClick={sendMessage} /> */}
