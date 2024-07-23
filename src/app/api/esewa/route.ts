import crypto from "crypto";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const { amount } = await request.json();
    try {
        const data = {
            productCode: "EPAYTEST",
            amount: amount,
            totalAmount: amount,
            transaction_uuid: crypto.randomUUID(),
        };

        const signatureMessage = `total_amount=${data.totalAmount},transaction_uuid=${data.transaction_uuid},product_code=${data.productCode}`;
        const signatureSecret = "8gBm/:&EnhH.1/q";

        const signature = crypto
            .createHmac("sha256", signatureSecret)
            .update(signatureMessage)
            .digest("base64");

        const dataToSend = {
            uuid: data.transaction_uuid,
            signature: signature,
        };

        return NextResponse.json({ message: "successfully created uuid and signature", dataToSend }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error creating uuid and signature" }, { status: 500 });
    }
}
