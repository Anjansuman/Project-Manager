
interface LogoProps {
    h: string;
    color?: string;
}

export const Logo = ({ h, color = "#03061C" }: LogoProps) => {
    return <div>
                <svg height={h} viewBox="0 0 156 130" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M130 0H153C154.657 0 156 1.34315 156 3V23C156 24.6569 154.657 26 153 26H130V0Z" fill={color} />
                    <path d="M52 0H75C76.6569 0 78 1.34315 78 3V26H52V0Z" fill={color} />
                    <rect x="52" y="52" width="26" height="26" fill={color} />
                    <path d="M104 3C104 1.34315 105.343 0 107 0H130V26H104V3Z" fill={color} />
                    <path d="M26 3C26 1.34315 27.3431 0 29 0H52V26H26V3Z" fill={color} />
                    <rect x="26" y="52" width="26" height="26" fill={color} />
                    <rect y="34" width="26" height="90" fill={color} />
                    <rect x="10" y="78" width="26" height="65" transform="rotate(-90 10 78)" fill={color} />
                    <rect x="32" y="26" width="26" height="40" transform="rotate(-90 32 26)" fill={color} />
                    <rect x="110" y="26" width="26" height="40" transform="rotate(-90 110 26)" fill={color} />
                    <rect x="110" y="78" width="26" height="40" transform="rotate(-90 110 78)" fill={color} />
                    <rect x="110" y="130" width="26" height="40" transform="rotate(-90 110 130)" fill={color} />
                    <rect x="104" y="52" width="26" height="26" fill={color} />
                    <path d="M130 52H153C154.657 52 156 53.3431 156 55V75C156 76.6569 154.657 78 153 78H130V52Z" fill={color} />
                    <path d="M104 104H130V130H107C105.343 130 104 128.657 104 127V104Z" fill={color} />
                    <path d="M130 104H153C154.657 104 156 105.343 156 107V127C156 128.657 154.657 130 153 130H130V104Z" fill={color} />
                    <rect x="78" y="26" width="26" height="26" fill={color} />
                    <rect x="78" y="26" width="26" height="26" fill={color} />
                    <path d="M0 29C0 27.3431 1.34315 26 3 26H26V52H0V29Z" fill={color} />
                    <rect y="52" width="26" height="26" fill={color} />
                    <path fillRule="evenodd" clipRule="evenodd" d="M29 78H26V81C26 79.3431 27.3431 78 29 78Z" fill={color} />
                    <path fillRule="evenodd" clipRule="evenodd" d="M78 78H75C76.6569 78 78 79.3431 78 81V78Z" fill={color} />
                    <path fillRule="evenodd" clipRule="evenodd" d="M104 104H101C102.657 104 104 105.343 104 107V104Z" fill={color} />
                    <path fillRule="evenodd" clipRule="evenodd" d="M29 26H26V29C26 27.3431 27.3431 26 29 26ZM29 52C27.3431 52 26 50.6569 26 49V52H29Z" fill={color} />
                    <path fillRule="evenodd" clipRule="evenodd" d="M107 26H104V29C104 27.3431 105.343 26 107 26ZM107 52C105.343 52 104 50.6569 104 49V52H107Z" fill={color} />
                    <path fillRule="evenodd" clipRule="evenodd" d="M107 78H104V81C104 79.3431 105.343 78 107 78ZM107 104C105.343 104 104 102.657 104 101V104H107Z" fill={color} />
                    <path fillRule="evenodd" clipRule="evenodd" d="M26 26V23C26 24.6569 24.6569 26 23 26H26Z" fill={color} />
                    <path fillRule="evenodd" clipRule="evenodd" d="M104 26V23C104 24.6569 102.657 26 101 26H104ZM81 26C79.3431 26 78 24.6569 78 23V26H81Z" fill={color} />
                    <path fillRule="evenodd" clipRule="evenodd" d="M81 52H78V55C78 53.3431 79.3431 52 81 52ZM101 52C102.657 52 104 53.3431 104 55V52H101ZM104 75C104 76.6569 102.657 78 101 78H104V75ZM81 78C79.3431 78 78 76.6569 78 75V78H81Z" fill={color} />
                    <path fillRule="evenodd" clipRule="evenodd" d="M78 26H75C76.6569 26 78 27.3431 78 29V26ZM78 49C78 50.6569 76.6569 52 75 52H78V49Z" fill={color} />
                    <rect y="78" width="26" height="26" fill={color} />
                    <path d="M0 104H26V127C26 128.657 24.6569 130 23 130H3C1.34315 130 0 128.657 0 127V104Z" fill={color} />
                    <path d="M78 78H104V104H81C79.3431 104 78 102.657 78 101V78Z" fill={color} />
                </svg>
    </div>
}