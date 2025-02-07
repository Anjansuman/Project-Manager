
import { useRef } from "react";
import axios from "axios";

import { Input } from "../../ui/Customs/Input";
import { PanelDesign } from "./PanelDesign";
import { Button } from "../../ui/Customs/Button";

const backend = import.meta.env.VITE_BACKEND_URL;

export const Signup = () => {

    const nameRef = useRef<HTMLInputElement>(null);
    const usernameRef = useRef<HTMLInputElement>(null);
    const roleRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    async function signup() {
        const name = nameRef.current?.value;
        const username = usernameRef.current?.value;
        const role = roleRef.current?.value;
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;

        const response = await axios.post(`${backend}/signup`, {
            name,
            username,
            role,
            email,
            password
        });
        const jwt = response.data.token;
        localStorage.setItem("token", jwt);
        alert("Signed-up");
        //navigate to home-page
    }


    return <div className="h-screen bg-black px-50 py-20">
        <div className="h-full bg-[#03061C] font-[code] rounded-2xl border border-[#1D1D3B] flex overflow-hidden ">
            <div className="w-[50%] ">
               <div className="h-full flex flex-col items-center justify-center text-white">
                    <div className="text-3xl font-bold text-white mb-3">
                        Sign-up
                    </div>
                    <div className="mb-3">
                        Name:
                        <Input placeholder="Name" inputRef={nameRef} h={'45px'} w={"350px"} />
                        {/* <Input placeholder="Name" /> */}
                    </div>
                    <div className="mb-3">
                        Username:
                        <Input placeholder="Username" inputRef={usernameRef} h={'45px'} w={"350px"} />
                    </div>
                    <div className="mb-3">
                        Role:
                        <Input placeholder="Role" inputRef={roleRef} h={'45px'} w={"350px"} />
                    </div>
                    <div className="mb-3">
                        Email:
                        <Input placeholder={"example@gmail.com"} inputRef={emailRef} h={'45px'} w={"350px"} />
                    </div>
                    <div className="mb-8">
                        Password:
                        <Input placeholder={"Enter your password"} inputRef={passwordRef} h={'45px'} w={"350px"} />
                    </div>
                    <div>
                        <Button text={"Sign-up"} onClick={signup} size={'md'} w={'200px'} rounded={true} />
                    </div>
               </div>
            </div>
            <div className="w-[50%] h-full bg-[#653AD8] ">
                <PanelDesign />
            </div>
        </div>
    </div>
}