
import { ThemeState } from "../../../../../Atoms/ThemeState";
import { ImageInput } from "../../../../ui/Customs/ImageInput";
import { Input } from "../../../../ui/Customs/Input";
import { ProjectTile } from "../../../../ui/Customs/ProjectTile";
import { SelectMemberCard } from "../../../../ui/Customs/SelectMemberCard";

import { useRecoilValue } from "recoil";
import { HeadingBase } from "../../../../ui/SVGs/HeadingBase";
import { useEffect, useRef } from "react";
import { Button } from "../../../../ui/Customs/Button";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export const NewProject = () => {

    const { name, organization } = useParams();
    const navigate = useNavigate();

    // async function getBackend() {
    //     const backend = import.meta.env.VITE_BACKEND_URL;
    //     const response = await axios.get(`${backend}/new-project`, {
    //         headers: {
    //             Authorization: localStorage.getItem("token")
    //         }
    //     });
    //     const data = await response.data;
    //     alert(data);

    // }

    // useEffect(() => {
    //     // getBackend();
    // }, []);
    
    const titleRef = useRef<HTMLInputElement>(null);
    const deadlineRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLTextAreaElement>(null);

    async function submit() {
        const backend = import.meta.env.VITE_BACKEND_URL;

        const title = titleRef.current?.value;
        const description = descriptionRef.current?.value.trim() || null;
        const deadline = deadlineRef.current?.value.trim();
        const dead = deadline ? new Date(deadline) : null;

        try {
            const response = await axios.put(`${backend}/projects/${organization}/new-project`, {
                title: title,
                description: description,
                deadline: dead
                
            }, {
                headers: {
                    "Authorization": localStorage.getItem("token")
                }
            })
            const data = await response.data;
            navigate(`/eject/${name}/${organization}`);
            
            
        } catch (error) {
            console.error("Error creating project: ", error);
            alert("Project creation failed!");
        }
    }

    const theme_state = useRecoilValue(ThemeState);
    const theme = (theme_state.mode == 'light') ? theme_state.light : theme_state.dark;

    return <div className="h-[80vh] w-[70%] border rounded-[14px] p-[25.2px] m-[15px] overflow-y-scroll [::-webkit-scrollbar]:hidden [scrollbar-width:none] "
        style = {{
            backgroundColor:  theme.dark_panel,
            borderColor: theme.gray_border
        }}
    >
        <div className="flex items-center justify-between mb-8 ">
            <div className="flex">
                <ImageInput bg={'#653AD847'} h={'160px'} w={'160px'} />
                <div className="text-white flex flex-col justify-around font-semibold tracking-wide">
                    <div>
                        Title:
                        <Input placeholder={'Title'} h={'40px'} w={'300px'} inputRef={titleRef} />
                    </div>
                    <div>
                        Deadline:
                        <Input placeholder={'Deadline'} h={'40px'} inputRef={deadlineRef} inputType="date" />
                        {/* <input type='date' /> */}
                    </div>
                </div>
            </div>
            <div className="flex">
                <div className="flex justify-center items-center mr-10">
                    <div className="text-[#653AD8] text-4xl font-extrabold -rotate-90 -mr-18 tracking-wider "
                        style={{ WebkitTextStroke: "2px #653AD8", color: "#653AD847" }}
                    >
                        PREVIEW
                    </div>
                    <div className="h-[213px] w-[1px] bg-[gray] rounded-2xl"></div>
                </div>
                <ProjectTile title={'project'} image={'imageSelected'} completion={"20"} />
            </div>
        </div>
        <div className="text-white flex flex-col bg-[#653AD847] p-1 rounded-lg mb-8 ">
            <HeadingBase text={'Description:'} />
            <textarea className="min-h-20 h-40 w-full resize-y mb-0 border-none rounded-lg rounded-tl-none bg-[#653AD847] px-3 py-2 text-white relative custom-resizer shadow-lg"
                placeholder={'Write a brief description...'}
                ref={descriptionRef}
            >
            </textarea>
        </div>
        <div className="h-auto w-full bg-[#653AD847] rounded-lg flex flex-col items-start justify-center p-1 pb-0 text-white mb-8">
           <HeadingBase text={'Members'} />
           <div className="w-full bg-[#653AD847] rounded-lg rounded-tl-none shadow-lg mb-1 ">
                <Input placeholder="Enter a name..." bg={'transparent'} h={'50px'} />
           </div>
           <div className="w-full flex flex-wrap justify-start">
            <SelectMemberCard  text={'Anjan Suman'} />
            <SelectMemberCard  text={'Anjan Suman'} />

           </div>
            {/* selected members */}
        </div>
        <Button text={'Submit'} w={'170px'}  onClick={submit} />
    </div>
}