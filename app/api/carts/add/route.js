import {addCartItem} from "../../../services/cartService";
import { NextResponse } from "next/server";

export async function POST(req) {
    try{
        const cookies = req.cookies;

        if (!cookies.get('token')) {
            return NextResponse.json({ msg: "unauthorized" }, { status: 400 });
        }

        const cartData = await req.json();
        const result = await addCartItem(cartData);
        if(result) {
            return NextResponse.json({ msg: "success" }, { status: 200 });
        }
        return NextResponse.json({msg : "Failed to insert into cart"}, { status: 400 });
    }
    catch(error) {
        return NextResponse.json({ msg: error.message },
            { status: 500 });
    }
}