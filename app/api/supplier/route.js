import Supplier from "@/models/Supplier";
import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await dbConnect();
        const suppliers = await Supplier.find();
        return NextResponse.json(suppliers);
    } catch (error) {
        console.error(error);
        return NextResponse.error("Failed to fetch suppliers", 500);
    }
}

export async function POST(request) {
    try {
        await dbConnect();
        const body = await request.json();
        const supplier = new Supplier(body);
        await supplier.save();
        return NextResponse.json(supplier, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.error("Failed to create supplier", 500);
    }
}
