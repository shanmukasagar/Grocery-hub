import {userSignup} from "../../../services/userService";
import { NextResponse } from "next/server";

export async function POST(req) {
    try{
        const userData = await req.json();
        const result = await userSignup(userData);
        if(result.isSuccess) {
            return NextResponse.json({msg : result.msg }, { status: 200 });
        }
        return NextResponse.json({msg : result.msg }, { status: 400 });
    }
    catch(error) {
        return NextResponse.json({ msg: error.message },
            { status: 500 });
    }
    
}