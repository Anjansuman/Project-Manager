
interface HomeButtonProps {
    height: string,
}

export const HomeButton = ({ height }: HomeButtonProps) => {
    return <div>
        <svg height={`${height}`} viewBox="0 0 181 178" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M90.5 0L179.805 68H180V68.1482L180.134 68.25H180V82C180 84.2091 178.209 86 176 86H163V91V153C163 166.807 151.807 178 138 178H105V128H76V178H42C28.1928 178 17 166.807 17 153V91V86H4.99996C2.79082 86 0.999962 84.2091 0.999962 82V68.4738V68.25H0.866333L0.999962 68.1483V68H1.19466L90.5 0Z" fill="#808080"/>
        </svg>
    </div>
}