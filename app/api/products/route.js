import {getAllProducts} from "../../services/productsService";
import { NextResponse } from "next/server";

export async function GET() {
    try{
        const result = await getAllProducts();
        return NextResponse.json(result, { status: 200 });
    }
    catch(error) {
        return NextResponse.json({ msg: error.message },
            { status: 500 });
    }
}