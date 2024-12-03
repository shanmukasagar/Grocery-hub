import {getOrderItems} from "../../../services/orderService";
import { NextResponse } from "next/server";

export async function POST(req) {
    try{
        const userData = await req.json();
        const cookies = req.cookies;

        if (!cookies.get('token')) {
            return NextResponse.json({ msg: "unauthorized" }, { status: 400 });
        }
        const result = await getOrderItems(userData);
        return NextResponse.json(result, { status: 200 });
    }
    catch(error) {
        return NextResponse.json({ msg: error.message },
            { status: 500 });
    }
}