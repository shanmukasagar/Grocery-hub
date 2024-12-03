import {userLogin} from "../../../services/userService";
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';
const cryptoJS = require("crypto-js");

export async function POST(req) {
    try{
        const userData = await req.json();
        const result = await userLogin(userData);
        if(result.isSuccess) {
            const session = { email : userData.email };
            const authtoken = jwt.sign(cryptoJS.AES.encrypt(JSON.stringify(session), process.env.COOKIE_ENC_KEY).toString(), process.env.SECRET_KEY);
  
            // Create a cookie
            const cookie = serialize('token', authtoken, {
                httpOnly: true, secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
                sameSite: 'strict', path: '/', maxAge: 3600, // 1 hour
            });

            return NextResponse.json(userData, { status: 200, headers: { 'Set-Cookie': cookie, 'Content-Type': 'application/json',}, });
        }
        return NextResponse.json({msg : result.msg }, { status: 400 });
    }
    catch(error) {
        return NextResponse.json({ msg: error.message },
            { status: 500 });
    }
}