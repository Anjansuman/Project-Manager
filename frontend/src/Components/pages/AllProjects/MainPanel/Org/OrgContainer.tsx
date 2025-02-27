import { useEffect, useState } from "react";
import { Input } from "../../../../ui/Customs/Input";
import { PlusIcon } from "../../../../ui/SVGs/PlusIcon";

import gsap from "gsap";
import axios from "axios";
import { Link } from "react-router-dom";

export const OrgPanel = () => {

    const [orgs, setOrgs] = useState<string[]>();

    async function orgData() {
        try {
            const backend = import.meta.env.VITE_BACKEND_URL;
            const response = await axios.get(`${backend}/Organization/get-allOrgs`, {
                headers: {
                    "Authorization": localStorage.getItem("token")
                }
            });
            const data = await response.data.organizations;
            setOrgs(data);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        orgData();
        console.log(orgs);
    }, []);

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
            <Link to='/new-organization' >
                <div className="border-2 border-[#03061C] mb-2 p-1 rounded-md flex justify-center items-center cursor-pointer  transition-all duration-200 ease-in-out hover:bg-[#5b2ed6] active:translate-y-0.5">
                    <PlusIcon color={'white'} size={'30px'} />
                </div>
            </Link>
            { (orgs === undefined) ? <div className="flex justify-center items-center text-[#03061C] font-bold">
                No organizations.
            </div> : '' }
            { orgs?.map((org) => 
                <Link to={`${org}`} >
                    <div className="h-[43px] rounded-md text-white px-3 bg-[#03061C] hover:bg-[#131622] transition-colors duration-200 ease-in-out mb-1 flex justify-start items-center cursor-pointer">
                        {org}
                    </div>
                </Link>
            )}
        </div>
    </div>
}