import { atom } from "recoil";

export const Socket = atom<WebSocket | null>({
    key: "Socket",
    default: null
});
