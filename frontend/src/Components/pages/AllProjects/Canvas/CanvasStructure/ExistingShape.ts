import axios from "axios";

export async function getExistingShapes(projectId: string) {

    const backend = import.meta.env.VITE_BACKEND_URL;

    const res = await axios.get(`${backend}/chat/${projectId}`, {
        headers: {
            "Authorization": localStorage.getItem("token")
        }
    });
    const messages = await res.data.chats;

    // this will send the messages in format of
    const shapes = messages.map((x: { message: string }) => {
        const messageData = JSON.parse(x.message);
        return messageData;
    });
    return shapes;
}