
interface HeadingBaseProps {
    text: string,
}

export const HeadingBase = ({ text }: HeadingBaseProps) => {
    return (
        <div className="flex">
            <svg width="155" height="30" viewBox="0 0 155 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.8294 3.96322C21.5811 3.02365 21.9569 2.55386 22.3762 2.16116C23.5713 1.04174 25.0812 0.316046 26.702 0.0820778C27.2705 0 27.8722 0 29.0754 0H125.925C127.128 0 127.729 0 128.298 0.0820778C129.919 0.316046 131.429 1.04174 132.624 2.16116C133.043 2.55386 133.419 3.02365 134.171 3.96322L155 30H0L20.8294 3.96322Z" fill="#653AD8" fillOpacity="0.278431"/>
                <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="#FFFFFF" fontSize="14" className="font-bold tracking-wide">{text}</text>
            </svg>
            
        </div>
    );
}
