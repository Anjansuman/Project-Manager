import React, { useState } from "react";
import axios from "axios";


export const Input = ({ placeholder }) => {


    const [input, setInput] = useState("");

    function fetchData() {
        const response = axios.get("http://localhost:300/eject/v1/orgmembers", {
            
        });

    }

    function handleChange(value) {

    }

    return <input
        type="text"
        className="h-[34px] w-[450px] bg-[#38434f] rounded-[7px] border-none px-[10px] mr-[20px] font-[14px] outline-none text-white transition-all duration-200 "
        placeholder={placeholder}
        value={input}
        onChange={e => handleChange(e.target.value)}
    />
}