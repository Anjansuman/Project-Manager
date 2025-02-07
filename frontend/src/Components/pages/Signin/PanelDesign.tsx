import { Logo } from "../../ui/SVGs/Logo"
import { Button } from "../../ui/Customs/Button"

import { Link } from "react-router-dom"


export const PanelDesign = () => {

    return <div className="h-full w-full text-white flex flex-col items-center justify-around p-4 ">
        <div className="flex flex-col justify-center items-center ">
            <div className="">
                <Logo h={'180'} />
            </div>
            <div className="text-5xl font-bold ">
                eject
            </div>
        </div>
        <div className="flex flex-col items-center">
            <Link to={'/signup'} >
                <Button text={"Sign-up"} bg={"#03061C"} size="lg" dark={-15} />
            </Link>
            Not registered yet?
        </div>
    </div>
}

/*
        <div>
            make you team to achieve your dream.
        </div>
*/

/*
<svg width="156" height="130" viewBox="0 0 156 130" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M130 0H153C154.657 0 156 1.34315 156 3V23C156 24.6569 154.657 26 153 26H130V0Z" fill="#1D1D3B"/>
<path d="M52 0H75C76.6569 0 78 1.34315 78 3V26H52V0Z" fill="#1D1D3B"/>
<rect x="52" y="52" width="26" height="26" fill="#1D1D3B"/>
<path d="M104 3C104 1.34315 105.343 0 107 0H130V26H104V3Z" fill="#1D1D3B"/>
<path d="M26 3C26 1.34315 27.3431 0 29 0H52V26H26V3Z" fill="#1D1D3B"/>
<rect x="26" y="52" width="26" height="26" fill="#1D1D3B"/>
<rect x="104" y="52" width="26" height="26" fill="#1D1D3B"/>
<path d="M130 52H153C154.657 52 156 53.3431 156 55V75C156 76.6569 154.657 78 153 78H130V52Z" fill="#1D1D3B"/>
<path d="M104 104H130V130H107C105.343 130 104 128.657 104 127V104Z" fill="#1D1D3B"/>
<path d="M130 104H153C154.657 104 156 105.343 156 107V127C156 128.657 154.657 130 153 130H130V104Z" fill="#1D1D3B"/>
<rect x="78" y="26" width="26" height="26" fill="#1D1D3B"/>
<rect x="78" y="26" width="26" height="26" fill="#1D1D3B"/>
<rect x="104" y="26" width="26" height="26" fill="#1D1D3B"/>
<rect x="78" y="52" width="26" height="26" fill="#1D1D3B"/>
<path d="M0 29C0 27.3431 1.34315 26 3 26H26V52H0V29Z" fill="#1D1D3B"/>
<path d="M26 26H52V52H26V26Z" fill="#1D1D3B"/>
<path d="M0 0H26V26H0V0Z" fill="#1D1D3B"/>
<path d="M78 0H104V26H78V0Z" fill="#1D1D3B"/>
<path d="M52 26H78V52H52V26Z" fill="#1D1D3B"/>
<path d="M52 78H78V104H52V78Z" fill="#1D1D3B"/>
<path d="M78 104H104V130H78V104Z" fill="#1D1D3B"/>
<path d="M104 78H130V104H104V78Z" fill="#1D1D3B"/>
<rect y="52" width="26" height="26" fill="#1D1D3B"/>
<rect x="26" y="78" width="26" height="26" fill="#1D1D3B"/>
<path d="M26 81C26 79.3431 27.3431 78 29 78H52V104H26V81Z" fill="#653AD8"/>
<path d="M52 78H75C76.6569 78 78 79.3431 78 81V104H52V78Z" fill="#653AD8"/>
<path d="M78 104H101C102.657 104 104 105.343 104 107V130H78V104Z" fill="#653AD8"/>
<path d="M26 29C26 27.3431 27.3431 26 29 26H52V52H29C27.3431 52 26 50.6569 26 49V29Z" fill="#653AD8"/>
<path d="M104 29C104 27.3431 105.343 26 107 26H130V52H107C105.343 52 104 50.6569 104 49V29Z" fill="#653AD8"/>
<path d="M104 81C104 79.3431 105.343 78 107 78H130V104H107C105.343 104 104 102.657 104 101V81Z" fill="#653AD8"/>
<path d="M0 0H26V23C26 24.6569 24.6569 26 23 26H0V0Z" fill="#653AD8"/>
<path d="M78 0H104V23C104 24.6569 102.657 26 101 26H81C79.3431 26 78 24.6569 78 23V0Z" fill="#653AD8"/>
<path d="M78 55C78 53.3431 79.3431 52 81 52H101C102.657 52 104 53.3431 104 55V75C104 76.6569 102.657 78 101 78H81C79.3431 78 78 76.6569 78 75V55Z" fill="#653AD8"/>
<path d="M52 26H75C76.6569 26 78 27.3431 78 29V49C78 50.6569 76.6569 52 75 52H52V26Z" fill="#653AD8"/>
<rect y="78" width="26" height="26" fill="#1D1D3B"/>
<path d="M0 104H26V127C26 128.657 24.6569 130 23 130H3C1.34315 130 0 128.657 0 127V104Z" fill="#1D1D3B"/>
<path d="M78 78H104V104H81C79.3431 104 78 102.657 78 101V78Z" fill="#1D1D3B"/>
</svg>

*/