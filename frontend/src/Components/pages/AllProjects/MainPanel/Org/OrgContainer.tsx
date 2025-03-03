import { useEffect, useRef, useState } from "react";
import { Input } from "../../../../ui/Customs/Input";
import { PlusIcon } from "../../../../ui/SVGs/PlusIcon";

import gsap from "gsap";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { ThemeState } from "@/Atoms/ThemeState";
import { useRecoilValue } from "recoil";

export const OrgContainer = ({ onClick }: { onClick: () => void }) => {

    const { name } = useParams();

    const [orgs, setOrgs] = useState<string[]>();
    const wrapperRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
            onClick();
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

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
    }, []);

    useEffect(() => {
        gsap.to('.panel', {
            height: 'auto',
            duration: 0.5
        });
        
    }, []);

    function plusHover() {
        gsap.to('.plus', {
            opacity: 0,
            duration: 0.3
        })
        const tl = gsap.timeline();
        tl.to('.create', {
            y: -38,
            duration: 0.3,
            ease: 'power1.in'
        });
        tl.to('.new', {
            y:-38,
            duration: 0.3,
            ease: 'power1.in'
        });
        tl.to('.org', {
            y: -38,
            duration: 0.3,
            ease: 'power1.in'
        })
    }
    function plusHoverRemoved() {
        const tl = gsap.timeline();
        tl.to('.create', {
            y: 38,
            duration: 0.3,
            ease: 'power1.out'
        });
        tl.to('.new', {
            y: 38,
            duration: 0.3,
            ease: 'power1.out'
        });
        tl.to('.org', {
            y: 38,
            duration: 0.3,
            ease: 'power1.out'
        })
        tl.to('.plus', {
            opacity: 1,
            duration: 0.3
        })
    }

    const theme_state = useRecoilValue(ThemeState);
    const theme = (theme_state.mode == 'light') ? theme_state.light : theme_state.dark;

    return <div className="main absolute top-0 left-0 "
        style={{
            color: theme.font_color
        }}
    >
        <div className="h-screen w-screen absolute bg-[#00000070] flex flex-col items-center p-4 ">
            <div className="w-[600px] flex flex-col items-center "
                ref={wrapperRef}
            >
                <div className="h-[50px] w-[600px] border-2 rounded-xl m-3 backdrop-blur-[4px] hover:backdrop-blur-[20px] transition-all duration-200 ease-in-out "
                    style={{
                        borderColor: theme.card_img
                    }}
                >
                    <Input placeholder="Search..." h={'50px'} bg={'transparent'} />
                </div>
                <div className="flex w-full justify-center items-center gap-3 mb-3">
                    <Link to={`/eject/${name}/my-secret-projects`} className="flex-1">
                        <div className="h-[50px] px-3 border-2 rounded-xl flex justify-center items-center flex-1 backdrop-blur-[4px] font-bold cursor-pointer hover:backdrop-blur-[20px] transition-all duration-200 ease-in-out "
                            onClick={onClick}
                            style={{
                                borderColor: theme.card_img
                            }}
                        >
                            My Projects
                        </div>
                    </Link>
                    <div className="h-[50px] px-3 border-2 rounded-xl flex flex-col justify-center items-center flex-1 backdrop-blur-[4px] cursor-pointer overflow-hidden hover:backdrop-blur-[20px] transition-all duration-200 ease-in-out "
                        onMouseEnter={plusHover}
                        onMouseLeave={plusHoverRemoved}
                        style={{
                            borderColor: theme.card_img
                        }}
                    >
                        <div className="plus">
                            <PlusIcon color={'white'} size={'30px'} />
                        </div>
                        <div className="flex absolute top-12">
                            <div className="create mr-1">Create</div>
                            <div className="new mr-1">new</div>
                            <div className="org">organization</div>
                        </div>
                    </div>
                </div>
                <div className="h-auto w-full flex flex-col justify-center overflow-y-scroll [::-webkit-scrollbar]:hidden [scrollbar-width:none] " >
                    { (orgs === undefined) ? <div className="flex justify-center items-center text-[#03061C] font-bold">
                        No organizations.
                    </div> : '' }
                    {/* something is wrong with this div printing as it is not printing the divs from starting, it is not showing them. */}
                    {orgs?.map((org, key) => (
                        <Link to={`/eject/${name}/${org}`} >
                        <div key={key} className="py-[14px] w-full border-2 rounded-xl px-3 flex justify-center items-center font-bold backdrop-blur-[4px] cursor-pointer mb-3 hover:backdrop-blur-[20px] transition-all duration-200 ease-in-out "
                            onClick={onClick}
                            style={{
                                borderColor: theme.card_img
                            }}
                        >
                            {org}
                        </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
        
    </div>
}

/*

<div className="panel h-0 w-68 absolute z-30 top-40 left-[40vw] border-2 rounded-lg p-4 pb-2 overflow-hidden shadow-xl"
        style={{
            backgroundColor: theme.card_bg,
            borderColor: theme.card_img,
        }}
    >
        <div className="mb-2">
            <Input placeholder='Search' bg={'#3F5EFF'} h={'43px'} />
        </div>
        
        <div className="max-h-[300px] overflow-y-scroll [::-webkit-scrollbar]:hidden [scrollbar-width:none] ">
            <Link to={`/eject/${name}/new-organization`} >
                <div className="border-2 border-[#03061C] mb-2 p-1 rounded-md flex justify-center items-center cursor-pointer  transition-all duration-200 ease-in-out hover:bg-[] active:translate-y-0.5">
                    <PlusIcon color={'white'} size={'30px'} />
                </div>
            </Link>
            <Link to={`/eject/${name}/my-secret-projects`}>
                <div className="h-[43px] rounded-md text-white px-3 bg-[#03061C] hover:bg-[#131622] transition-colors duration-200 ease-in-out mb-1 flex justify-start items-center cursor-pointer"
                    onClick={onClick}
                >
                    My projects
                </div>
            </Link>
            { (orgs === undefined) ? <div className="flex justify-center items-center text-[#03061C] font-bold">
                No organizations.
            </div> : '' }
            { orgs?.map((org) => 
                <Link to={`/eject/${name}/${org}`} >
                    <div className="h-[43px] rounded-md text-white px-3 bg-[#03061C] hover:bg-[#131622] transition-colors duration-200 ease-in-out mb-1 flex justify-start items-center cursor-pointer"
                        onClick={onClick}
                    >
                        {org}
                    </div>
                </Link>
            )}
        </div>
    </div>

*/