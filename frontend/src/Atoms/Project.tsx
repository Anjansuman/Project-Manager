import axios from "axios";
import { selectorFamily } from "recoil";

export const Project = selectorFamily({
    key: "Project",
    get: (organization: string) => async () => {
        try {
            const backend = import.meta.env.VITE_BACKEND_URL;
            const response = await axios.get(`${backend}/projects/${organization}`, {
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