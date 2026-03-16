const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    dnsLookup: (hostname, options, callback) => {
        const dns = require('dns');
        dns.lookup(hostname, { family: 4 }, callback);
    },
    debug: true,
    logger: true
});

const sendEmail = async (to, subject, otp) => {
    const htmlContent = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
        <div style="background-color: #2563eb; padding: 20px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px;">StockTracker</h1>
        </div>
        <div style="padding: 30px; color: #333333; line-height: 1.6;">
            <h2 style="color: #1f2937;">Verify your email</h2>
            <p>Hi there,</p>
            <p>Thank you for joining StockTracker. To complete your registration, please use the verification code below:</p>
            <div style="text-align: center; margin: 30px 0;">
                <span style="display: inline-block; padding: 12px 24px; background-color: #f3f4f6; border-radius: 4px; font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #2563eb; border: 1px dashed #2563eb;">
                    ${otp}
                </span>
            </div>
            <p>This code will expire in 10 minutes. If you did not request this, please ignore this email.</p>
            <hr style="border: 0; border-top: 1px solid #e5e7eb; margin: 30px 0;">
            <p style="font-size: 12px; color: #6b7280; text-align: center;">
                © 2026 StockTracker. All rights reserved.<br> Nepal
            </p>
        </div>
    </div>
    `;

    await transporter.sendMail({
        from: `"StockTracker Support" <${process.env.EMAIL_USER}>`,
        to,
        subject,
        text: `Your verification code is ${otp}`,
        html: htmlContent
    });
};

module.exports = sendEmail;