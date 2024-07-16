import nodemailer from "nodemailer";
import { render } from "@react-email/components";
import OrderMail from "../../emails/order"; // Adjust the path as needed

export async function sendOrderMail({
    userEmail,
    userName,
    dressName,
}: {
    userEmail: string;
    userName: string;
    dressName: string;
}) {
    const { EMAIL_PASS, EMAIL_USER } = process.env;

    if (!EMAIL_PASS || !EMAIL_USER) {
        console.error("Email configuration is missing.");
        return;
    }

    const transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: EMAIL_USER,
            pass: EMAIL_PASS,
        },
    });

    try {
        await transport.verify();

        const emailHtml = render(
            OrderMail({ userName, dressName })
        );

        const sendResult = await transport.sendMail({
            from: EMAIL_USER,
            to: userEmail,
            subject: "Your order has been placed",
            html: emailHtml,
        });
        console.log("Email sent successfully ");
    } catch (error) {
        console.error("Error sending email:", error);
    }
}
