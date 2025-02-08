
import { useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { Input } from "../../ui/Customs/Input";
import { PanelDesign } from "./PanelDesign";
import { Button } from "../../ui/Customs/Button";

const backend = import.meta.env.VITE_BACKEND_URL;

export const Signin = () => {

    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const [err, setErr] = useState(false);

    const navigate = useNavigate();

    async function signin() {
        try {
            const email = emailRef.current?.value;
            const password = passwordRef.current?.value;
    
            const response = await axios.post(`${backend}/signin`, { email, password });
    
            if (response.status === 200) {  // Check if the response was successful
                const jwt = response.data.token;
                localStorage.setItem("token", jwt);
                alert("Signed in successfully");
                // Navigate to home-page 
                navigate("/");
            } else {
                alert("Sign-in failed. Please try again.");
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setErr(true);
                // alert(error.response?.data?.message);
            } else {
                alert("Something went wrong. Please check your connection.");
            }
        }
    }


    return <div className="h-screen bg-black px-50 py-20">
        <div className="h-full bg-[#03061C] font-[code] rounded-2xl border border-[#1D1D3B] flex overflow-hidden ">
            <div className="w-[50%] ">
               <div className="h-full flex flex-col items-center justify-center text-white">
                    <div className="text-3xl font-bold text-white mb-3">
                        Sign-in
                    </div>
                    <div className="mb-3" onFocus={() => setErr(false)}>
                        Email:
                        <Input placeholder={"example@gmail.com"} inputRef={emailRef} h={'45px'} w={"350px"} />
                    </div>
                    <div className="mb-8" onFocus={() => setErr(false)} >
                        Password:
                        <Input placeholder={"Enter your password"} inputRef={passwordRef} h={'45px'} w={"350px"} />
                    </div>
                    <div>
                        <Button text={"Sign-in"} onClick={signin} size={'md'} w={'200px'} rounded={true} />
                    </div>
                    <div className="text-[red] ">
                        {err && "User doesn't exist."}
                    </div>
               </div>
            </div>
            <div className="w-[50%] h-full bg-[#653AD8] ">
                <PanelDesign />
            </div>
        </div>
    </div>
}