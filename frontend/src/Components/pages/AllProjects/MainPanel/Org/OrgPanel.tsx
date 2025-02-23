import { useEffect } from "react";
import { Input } from "../../../../ui/Customs/Input";
import { PlusIcon } from "../../../../ui/SVGs/PlusIcon";

import gsap from "gsap";

export const OrgPanel = () => {


    useEffect(() => {
        gsap.to('.panel', {
            height: 'auto',
            duration: 0.5
        });
    }, []);

    return <div className="panel h-0 w-70 absolute z-30 top-50 right-11 bg-[#653AD8] rounded-lg p-4 pb-2 overflow-hidden">
        <div className="mb-2">
            <Input placeholder='Search' bg={'#03061C'} h={'43px'} />
        </div>
        
        <div className="max-h-[300px] overflow-y-scroll [::-webkit-scrollbar]:hidden [scrollbar-width:none] ">
            <div className="border-2 border-[#03061C] mb-2 p-1 rounded-md flex justify-center items-center cursor-pointer ">
                <PlusIcon color={'white'} size={'30px'} />
            </div>
            <div className="h-[43px] rounded-md text-white px-3 bg-[#03061C] hover:bg-[#131622] transition-colors duration-200 ease-in-out mb-1 flex justify-start items-center cursor-pointer">
                Super
            </div>
            <div className="h-[43px] rounded-md text-white px-3 bg-[#03061C] hover:bg-[#131622] transition-colors duration-200 ease-in-out mb-1 flex justify-start items-center cursor-pointer">
                Super
            </div>
            <div className="h-[43px] rounded-md text-white px-3 bg-[#03061C] hover:bg-[#131622] transition-colors duration-200 ease-in-out mb-1 flex justify-start items-center cursor-pointer">
                Super
            </div>
            <div className="h-[43px] rounded-md text-white px-3 bg-[#03061C] hover:bg-[#131622] transition-colors duration-200 ease-in-out mb-1 flex justify-start items-center cursor-pointer">
                Super
            </div>
            <div className="h-[43px] rounded-md text-white px-3 bg-[#03061C] hover:bg-[#131622] transition-colors duration-200 ease-in-out mb-1 flex justify-start items-center cursor-pointer">
                Super
            </div>
            <div className="h-[43px] rounded-md text-white px-3 bg-[#03061C] hover:bg-[#131622] transition-colors duration-200 ease-in-out mb-1 flex justify-start items-center cursor-pointer">
                Super
            </div>
            <div className="h-[43px] rounded-md text-white px-3 bg-[#03061C] hover:bg-[#131622] transition-colors duration-200 ease-in-out mb-1 flex justify-start items-center cursor-pointer">
                Super
            </div>
            <div className="h-[43px] rounded-md text-white px-3 bg-[#03061C] hover:bg-[#131622] transition-colors duration-200 ease-in-out mb-1 flex justify-start items-center cursor-pointer">
                Super
            </div>
        </div>
    </div>
}