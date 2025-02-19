
interface HomeButtonProps {
    height: string,
}

export const HomeButton = ({ height }: HomeButtonProps) => {
    return <div>
        <svg height={`${height}`} viewBox="0 0 181 178" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M90.4999 0L179.805 68H180V68.1482L180.134 68.25H180V82C180 84.2091 178.209 86 176 86H163V91V153C163 166.807 151.807 178 138 178H105V128H75.9999V178H41.9999C28.1928 178 16.9999 166.807 16.9999 153V91V86H4.99988C2.79074 86 0.999878 84.2091 0.999878 82V68.4738V68.25H0.866249L0.999878 68.1483V68H1.19458L90.4999 0Z" fill="#653AD8" fill-opacity="0.278431"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M176.683 67.7978L90.5 4L4.31689 67.7978H4.129V67.9368L4.00004 68.0323H4.129V68.2423V80.6854C4.129 82.8945 5.91985 84.6854 8.12899 84.6854H19.5696V89.1292V146C19.5696 159.807 30.7625 171 44.5696 171H74V124H107V171H135.465C149.272 171 160.465 159.807 160.465 146V89.1292V84.6854H172.871C175.08 84.6854 176.871 82.8945 176.871 80.6854V68.0323H177L176.871 67.9368V67.7978H176.683Z" fill="#653AD8" fill-opacity="0.278431"/>
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