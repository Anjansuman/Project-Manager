
import { useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { Input } from "../../ui/Customs/Input";
import { PanelDesign } from "./PanelDesign";
import { Button } from "../../ui/Customs/Button";

const backend = import.meta.env.VITE_BACKEND_URL;

export const Signup = () => {

    const [isVerified, SetIsVerified] = useState(false);
    const email = useRef<String>(null);

    function verified() {
        SetIsVerified(true);
    }

    return <div className="h-screen bg-black px-50 py-20">
        <div className="h-full bg-[#03061C] font-[code] rounded-2xl border border-[#1D1D3B] flex overflow-hidden ">
            <div className="w-[50%] ">
               <div className="h-full flex flex-col items-center justify-center text-white">
                    <div className="text-3xl font-bold text-white mb-3">
                        Sign-up
                    </div>
                    
                    { !isVerified && <Verification verified={verified}  /> }
                    { isVerified && <FinalSignup /> }

               </div>
            </div>
            <div className="w-[50%] h-full bg-[#653AD8] ">
                <PanelDesign />
            </div>
        </div>
    </div>
}

interface VerificationProps {
    verified: () => void;
    email?: string;
}

function Verification({ verified, email }: VerificationProps) {

    const emailRef = useRef<HTMLInputElement>(null);
    const otpRef = useRef<HTMLInputElement>(null);

    const [otpPanel, setOtpPanel] = useState<[boolean, string, () => void]>([false, 'Send OTP', send]);

    async function send() {
        setOtpPanel([true, "Verify", verify]);

        const email = emailRef.current?.value.trim();

        const backend = import.meta.env.VITE_BACKEND_URL;
        const response = await axios.post(`${backend}/eject/v1/signup/send-OTP`, {
            email: email
        });

        const data = await response.data;

        // otp logic calling from the backend
    }

    function verify() {
        alert("verified");
        verified();
        if(emailRef.current === null || emailRef.current.value === "") {
            // display logic for email can't be empty
            console.log("email can't be empty");
            return;
        }
        email = emailRef.current.value;
        // verification logic from the backend
    }

    return <div>
        <div className="mb-3">
            Email:
            <Input placeholder={"example@gmail.com"} inputRef={emailRef} h={'45px'} w={'350px'} />
        </div>
        {otpPanel[0] && <div className="mb-6">
            OTP:
            <Input placeholder={"One Time Password"} inputRef={otpRef} h={'45px'} w={'350px'} />
        </div>}
        <div>
            <Button text={otpPanel[1]} onClick={otpPanel[2]} size={'md'} w={'200px'} rounded={true} />
        </div>
    </div>
}

function FinalSignup() {


    const nameRef = useRef<HTMLInputElement>(null);
    const usernameRef = useRef<HTMLInputElement>(null);
    const roleRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const navigate = useNavigate();

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
        const data = await response.data;
        // const userName = data.username;
        const jwt = data.token;
        localStorage.setItem("token", jwt);
        alert("Signed-up");
        //navigate to home-page
        navigate(`/eject/${username}`);
    }


    return <div>
        <div className="mb-3">
            Name:
            <Input placeholder="Name" inputRef={nameRef} h={'45px'} w={"350px"} />
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
}


/*

                    <div className="mb-3">
                        Email:
                        <Input placeholder={"example@gmail.com"} inputRef={emailRef} h={'45px'} w={"350px"} />
                    </div>
                    <div className="mb-8">
                        OTP:
                        <Input placeholder={"One Time Password"} inputRef={passwordRef} h={'45px'} w={"350px"} />
                    </div>
                    <div>
                        <Button text={"Sign-up"} onClick={signup} size={'md'} w={'200px'} rounded={true} />
                    </div>

*/


/*

                    <div className="mb-3">
                        Name:
                        <Input placeholder="Name" inputRef={nameRef} h={'45px'} w={"350px"} />
                    </div>
                    <div className="mb-3">
                        Username:
                        <Input placeholder="Username" inputRef={usernameRef} h={'45px'} w={"350px"} />
                    </div>
                    <div className="mb-3">
                        Role:
                        <Input placeholder="Role" inputRef={roleRef} h={'45px'} w={"350px"} />
                    </div>

                    <div className="mb-8">
                        Password:
                        <Input placeholder={"Enter your password"} inputRef={passwordRef} h={'45px'} w={"350px"} />
                    </div>

*/