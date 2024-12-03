import {getCartlist} from "../../services/cartService";
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
import cryptoJS from "crypto-js";
import { cookies } from "next/headers";

export async function POST(req) {
    try{
        const cookies = req.cookies;

        if (!cookies.get('token')) {
            return NextResponse.json({ msg: "unauthorized" }, { status: 400 });
        }
        const userData = await req.json();

        const result = await getCartlist(userData);
        return NextResponse.json(result, { status: 200 });
    }
    catch(error) {
        return NextResponse.json({ msg: error.message },
            { status: 500 });
    }
}