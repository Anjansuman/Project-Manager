
interface HomeButtonProps {
    height: string,
}

export const HomeButton = ({ height }: HomeButtonProps) => {
    return <div>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className=""
            style={{ height: height }}
        >
            <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
        </svg>
    </div>

}

/*

<div>
        <svg height={`${height}`} viewBox="0 0 181 178" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M90.5 0L179.805 68H180V68.1482L180.134 68.25H180V82C180 84.2091 178.209 86 176 86H163V91V153C163 166.807 151.807 178 138 178H105V128H76V178H42C28.1928 178 17 166.807 17 153V91V86H4.99996C2.79082 86 0.999962 84.2091 0.999962 82V68.4738V68.25H0.866333L0.999962 68.1483V68H1.19466L90.5 0Z" fill="#653AD890"/>
        </svg>
    </div>
*/