import { CrossIcon } from "../SVGs/CrossIcon"

interface SelectMemberCardProps {
    text?: string,
}

export const SelectMemberCard = ({ text }: SelectMemberCardProps) => {
    return <div className="h-10 flex rounded-lg mb-1 mr-1 shadow-md cursor-pointer group">
        <div className="h-full bg-[#653AD847] border border-r-0 border-transparent rounded-l-lg p-2 flex items-center justify-center mr-0.5 group-hover:border-white transition-colors duration-300 ease-in-out shadow-md ">
            {text}
        </div>
        <div className="h-full w-10 bg-[#653AD847] border border-l-0 border-transparent rounded-r-lg flex items-center justify-center group-hover:border-[#e03131] hover:bg-[#e0313147] transition-colors duration-300 ease-in-out">
            <CrossIcon color={'white'} size={'20px'} />
        </div>
    </div>
}