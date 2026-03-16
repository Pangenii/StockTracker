const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (to, subject, otp) => {
    const htmlContent = `
<div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background:#f3f4f6; padding:40px 10px;">
  <div style="max-width:600px; margin:auto; background:white; border:1px solid #e5e7eb; border-radius:8px; overflow:hidden;">
    
    <!-- Header -->
    <div style="background:#2f61d5; padding:20px; text-align:center;">
      <h1 style="color:white; margin:0; font-size:24px;">StockTracker</h1>
    </div>

    <!-- Body -->
    <div style="padding:30px; color:#374151;">
      <h2 style="margin-top:0;">Verify your email</h2>

      <p>Hi there,</p>

      <p>
        Thank you for joining StockTracker. To complete your registration,
        please use the verification code below:
      </p>

      <!-- OTP BOX -->
      <div style="margin:30px 0; text-align:center;">
        <div style="
          display:inline-block;
          padding:20px 30px;
          border:2px dashed #3b82f6;
          border-radius:6px;
          font-size:30px;
          letter-spacing:8px;
          font-weight:bold;
          color:#2f61d5;
          background:#f9fafb;
        ">
          ${otp}
        </div>
      </div>

      <p>
        This code will expire in <b>10 minutes</b>. If you did not request this,
        please ignore this email.
      </p>

      <hr style="border:none; border-top:1px solid #e5e7eb; margin:30px 0;" />

      <!-- Footer -->
      <p style="font-size:12px; color:#6b7280; text-align:center;">
        © 2026 StockTracker. All rights reserved.<br/>
        Nepal
      </p>

    </div>
  </div>
</div>
`;

    await resend.emails.send({
        from: "StockTracker <onboarding@resend.dev>",
        to: to,
        subject: subject,
        html: htmlContent,
    });
};

module.exports = sendEmail;