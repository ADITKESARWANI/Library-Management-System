import { generateVerificationOtpEmailTemplate } from "./emailTemplates.js";
import { sendEmail } from "./sendEmail.js";

export async function sendVerificationCode(verificationCode,email,res){
    try{
        const message = generateVerificationOtpEmailTemplate(verificationCode);
        sendEmail({
            email,
            subject: "Verfication Code (Bookworm Library Management System)",
            message,
        });
        res.status(200).json({
            success: true,
            message: "Verification Code sent sucessfully",
        });
    }catch (error) {
        return res.status(500).json({
            success: false,
            message: "Verification Code failed to send.",
        });
    }
}