import {getProductCategories} from "../../../services/productsService";
import { NextResponse } from "next/server";

export async function GET(req) {
    try{
        const url = new URL(req.url);
        const category = url.searchParams.get('category');
        const result = await getProductCategories(category);
        return NextResponse.json(result, { status: 200 });
    }
    catch(error) {
        return NextResponse.json({ msg: error.message },
            { status: 500 });
    }
}