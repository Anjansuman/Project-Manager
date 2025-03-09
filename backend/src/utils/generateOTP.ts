import crypto from "crypto";

export const generateOTP = ( size: number ) => {
    return Array.from(crypto.randomFillSync(new Uint8Array(size)))
        .map((n) => n % 10)
        .join('');
};