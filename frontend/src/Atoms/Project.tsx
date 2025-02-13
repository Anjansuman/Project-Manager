import axios from "axios";
import { selector } from "recoil";

export const Project = selector({
    key: "Project",
    get: async () => {
        try {
            const backend = import.meta.env.VITE_BACKEND_URL;
            const response = await axios.get(`${backend}/projects`, {
                headers: {
                    "Authorization": localStorage.getItem("token")
                }
            });
            return response.data.projects;
        } catch (error) {
            return [];
        }
    }

})