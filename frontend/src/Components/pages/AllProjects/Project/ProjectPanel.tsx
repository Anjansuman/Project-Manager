import { useRecoilValue } from "recoil";
import { ThemeState } from "../../../../Atoms/ThemeState";
import { BarGraph } from "./Bar-Graph/BarGraph";
import { BottomMenu } from "./BottomMenu/BottomMenu";
import { ProjectFile } from "../../../ui/Customs/ProjectFile";

import gsap from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { useEffect, useRef } from "react";

gsap.registerPlugin(TextPlugin);

export const Project = () => {


    const theme_state = useRecoilValue(ThemeState);
    const theme = (theme_state.mode == 'light') ? theme_state.light : theme_state.dark;
    

    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.to('.boundry', {
            width: '100%',
            duration: 2
        })
        gsap.to(textRef.current, {
            text: "Project Manager",
            duration: 2,
            ease: 'power1.out'
        });
    }, [])


    return <div className="h-[80vh] w-[70%] border bg-[#03061C] rounded-[14px] p-[25.2px] m-[15px] "
        style = {{
            backgroundColor:  theme.dark_panel,
            borderColor: theme.gray_border
        }}
    >
        {/* start */}
        <div className=" flex items-center justify-between">
            <div className="flex items-center">
                <div className="h-50 w-50 bg-[#653AD847] p-1 rounded-xl mr-5">
                    <div className="h-full w-full bg-[#653AD847] rounded-xl">
                        
                    </div>
                </div>

                <div className="h-44 w-2 bg-[#653AD847] border border-[#1d1d2b] rounded-xl mr-5">

                </div>

                <div className="h-40 w-40 flex flex-col justify-around ">

                    <BarGraph color={"#e03131"} percent={'40%'} text={'HTML'} />
                    <BarGraph color={"#2f9e44"} percent={'60%'} text={'CSS'} />
                    <BarGraph color={"#1971c2"} percent={'50%'} text={'Solidity'} />
                    <BarGraph color={"#f08c00"} percent={'80%'} text={'Typescript'} />
                    <BarGraph color={"#6741d9"} percent={'20%'} text={'Javascript'} />

                </div>
            </div>
            <div className="w-[50%] text-white text-7xl font-bold tracking-wider flex justify-center items-center">
                <div ref={textRef} className="flex justify-center items-center text-center">
                    
                </div>
            </div>
        </div>

        <div className="flex justify-center items-center">
            <div className="boundry h-[1px] w-0 bg-[gray] rounded-xl flex justify-center my-4"></div>
        </div>

        <div className="w-full text-white rounded-xl flex flex-wrap p-3 pl-0 pb-0 ">
            <ProjectFile />
            <ProjectFile />
            <ProjectFile />
            <ProjectFile />
        </div>

        <BottomMenu />
        
    </div>
}