import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
import cryptoJS from "crypto-js";
import { cookies } from "next/headers";

export async function GET(req) {
    try {
        const cookie = cookies().get('token')?.value; // Access the cookie securely
        if (!cookie) {
            return NextResponse.json({ msg: "Token not found" }, { status: 401 });
        }

        // Verify the JWT
        const decryptedJWT = jwt.verify(cookie, process.env.SECRET_KEY);
        
        // Decrypt the session using crypto-js
        const session = JSON.parse(
            cryptoJS.AES.decrypt(decryptedJWT, process.env.COOKIE_ENC_KEY)
            .toString(cryptoJS.enc.Utf8)
        );

        // Return the session data
        return NextResponse.json(session, { status: 200 });
    } catch (error) {
        console.error("Error decrypting cookie or verifying JWT:", error.message);

        return NextResponse.json(
            { msg: "Failed to authenticate" }, // Generic error message
            { status: 500 }
        );
    }
}
