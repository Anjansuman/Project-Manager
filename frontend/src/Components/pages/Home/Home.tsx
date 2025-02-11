import { Main_Element } from "./MainElement/MainElement";

import { ThemeState } from "../../../Atoms/ThemeState";

import { useRecoilValue } from "recoil";
import { useEffect, useState } from "react";
import axios from "axios";

interface ProfileData {
    name: string;
    image: string;
    role: string;
}

export function Home() {

    const theme_state = useRecoilValue(ThemeState);
    const theme_mode = theme_state.mode;
    const theme = (theme_mode == 'light') ? theme_state.light : theme_state.dark;

    const [profileData, setProfileData] = useState<ProfileData>({name: '', image: '', role: ''});
    const [project, setProject] = useState<{title: string, projectImg: string, completion: string}[]>([]);

    async function fetchData() {
        try {
            const backend = import.meta.env.VITE_BACKEND_URL;
            const response = await axios.get(`${backend}/dashboard`, {
                headers: {
                    "Authorization": localStorage.getItem("token")
                }
            });
            const data = await response.data;
            setProfileData({
                name: data.name,
                image: data.image,
                role: data.role
            });
            setProject(data.project);
        } catch (error) {
            console.log("Error: ", error);
        }
        
    }
    
    useEffect(() => {
        fetchData();
    }, []);

    return <div className={`h-screen font-[sans]`}
        style={{ backgroundColor: theme.background }}
    >
        <Main_Element profileData={profileData} project={project} />
    </div>
}

// try adding grid for making your home page look good
// like use total grid-cols-4
// and for left and right panels use grid-1
// and for middle panel use grid-2
// and and and make the grid as a variable and pass it down to main-element and side-element from the home-page

// [value, setVAlue]