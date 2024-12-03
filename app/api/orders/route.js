import {addOrderItems} from "../../services/orderService";
import { NextResponse } from "next/server";

export async function POST(req) {
    try{
        const cookies = req.cookies;

        if (!cookies.get('token')) {
            return NextResponse.json({ msg: "unauthorized" }, { status: 400 });
        }

        const orderData = await req.json();
        const result = await addOrderItems(orderData);
        if(result) {
            return NextResponse.json({ msg: "success" }, { status: 200 });
        }
        return NextResponse.json({msg : "Failed to add order"}, { status: 400 });
    }
    catch(error) {
        return NextResponse.json({ msg: error.message },
            { status: 500 });
    }
}