import { useEffect, useState } from "react";
import { BottomBox } from "../../../../ui/Customs/BottomBox";
import { CameraIcon } from "../../../../ui/SVGs/CameraIcon";
import { ChatIcon } from "../../../../ui/SVGs/ChatIcon";
import { CrossIcon } from "../../../../ui/SVGs/CrossIcon";
import { DeleteIcon } from "../../../../ui/SVGs/DeleteIcon";

import gsap from "gsap";
import { PlusIcon } from "../../../../ui/SVGs/PlusIcon";
import { Link, useParams } from "react-router-dom";
import { TeamIcon } from "../../../../ui/SVGs/TeamIcon";



export const BottomMenu = () => {

    const { name, organization } = useParams();

     const [click, setClick] = useState(true);
    
    useEffect(() => {
        if(click == false) {
            gsap.to('.main', {
                opacity: 0,
                duration: 0.6
            })
            gsap.to('.cross', {
                opacity: 1,
                duration: 0.6
            })
            gsap.to('.meet', {
                y: -300,
                opacity: 1,
                duration: 0.6
            })
            gsap.to('.chat', {
                y: -200,
                opacity: 1,
                duration: 0.6
            })
            gsap.to('.delete', {
                y: -100,
                opacity: 1,
                duration: 0.6
            })
        } else {
            gsap.to('.main', {
                opacity: 1,
                duration: 0.6
            })
            gsap.to('.cross', {
                opacity: 0,
                duration: 0.6
            })
            gsap.to('.meet', {
                y: 0,
                opacity: 0,
                duration: 0.6
            })
            gsap.to('.chat', {
                y: 0,
                opacity: 0,
                duration: 0.6
            })
            gsap.to('.delete', {
                y: 0,
                opacity: 0,
                duration: 0.6
            })

        }
    }, [click]);


    return <div>
        <div className="">
            <div className="main absolute bottom-0 right-0">
                <BottomBox element={<TeamIcon size={'25px'} />} z={20} onClick={() => setClick(false)}/>
            </div>
            <div className="cross absolute right-16 bottom-24 opacity-0">
                <CrossIcon color={'white'} onClick={() => setClick(true)} size={'40'} />
            </div>
        </div>

        <div className="meet absolute bottom-0 right-0 opacity-0">
            <BottomBox color={'#2f9e44'} hoverBG={'#2f9e4499'} element={<CameraIcon color={'white'} size={'25'} />}
            z={10} />
        </div>
        <div className="chat absolute bottom-0 right-0 opacity-0">
            <Link to={`/eject/${name}/${organization}/members`} >
                <BottomBox color={'#1971c2'} hoverBG={'#1971c299'} element={<TeamIcon size={'25px'} />} z={10} />
            </Link>
        </div>
        <div className="delete absolute bottom-0 right-0 opacity-0">
            <Link to={`/eject/${name}/${organization}/new-project`}>
                <BottomBox color={'#e03131'} hoverBG={'#e0313199'} element={<PlusIcon color={"white"} size={'35'} />} z={10} />
            </Link>
        </div>
    </div>
}