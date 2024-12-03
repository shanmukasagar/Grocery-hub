import {deleteCartItem} from "../../../services/cartService";
import { NextResponse } from "next/server";

export async function POST(req) {
    try{
        const cartData = await req.json();
        const result = await deleteCartItem(cartData);
        if(result) {
            return NextResponse.json({ msg: "success" }, { status: 200 });
        }
        return NextResponse.json({msg : "Failed to delete from cart"}, { status: 400 });
    }
    catch(error) {
        return NextResponse.json({ msg: error.message },
            { status: 500 });
    }
}