import Supplier from "@/models/Supplier";
import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    try {
        await dbConnect();
        const supplier = await Supplier.findById(params.id);
        if (!supplier) {
            return NextResponse.error("Supplier not found", 404);
        }
        return NextResponse.json(supplier);
    } catch (error) {
        console.error(error);
        return NextResponse.error("Failed to fetch supplier", 500);
    }
}

export async function PUT(request, { params }) {
    try {
        await dbConnect();
        const body = await request.json();
        const supplier = await Supplier.findByIdAndUpdate(params.id, body, { new: true });
        if (!supplier) {
            return new NextResponse("Supplier not found", { status: 404 });
        }
        return NextResponse.json(supplier);
    } catch (error) {
        console.error(error);
        return NextResponse.error("Failed to update supplier", 500);
    }
}

export async function DELETE(request, { params }) {
    try {
        await dbConnect();
        console.log('Attempting to delete supplier with ID:', params.id);
        const supplier = await Supplier.findByIdAndDelete(params.id);
        if (!supplier) {
            return new NextResponse("Supplier not found", { status: 404 });
        }
        return new NextResponse("Supplier deleted", { status: 200 });
    } catch (error) {
        console.error('Error during supplier deletion:', error);
        return new NextResponse("Failed to delete supplier", { status: 500 });
    }
}
