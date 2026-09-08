export function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export function getOtpHtml(otp, username) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>ResumeAI - Verify Email</title>
</head>

<body style="margin:0;padding:0;background:#0F172A;font-family:Arial,Helvetica,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" style="background:#0F172A;padding:40px 16px;">
<tr>
<td align="center">

<table width="520" cellpadding="0" cellspacing="0" style="background:#1E293B;border:1px solid #334155;border-radius:18px;overflow:hidden;max-width:520px;">

  <!-- Header -->
  <tr>
    <td align="center" style="padding:40px 40px 24px;">
      <div style="width:64px;height:64px;background:#4F46E5;border-radius:16px;display:flex;align-items:center;justify-content:center;margin:0 auto 18px;">
        <span style="font-size:30px;">📄</span>
      </div>

      <h1 style="margin:0;color:#F8FAFC;font-size:28px;font-weight:700;">
        Verify Your Email
      </h1>

      <p style="margin:12px 0 0;color:#94A3B8;font-size:15px;line-height:22px;">
        Welcome to <strong style="color:#FFFFFF;">ResumeAI</strong>
      </p>
    </td>
  </tr>

  <!-- Greeting -->
  <tr>
    <td style="padding:0 40px;">
      <p style="margin:0;color:#CBD5E1;font-size:15px;line-height:26px;">
        Hi <strong style="color:#FFFFFF;">${username}</strong>,
      </p>

      <p style="margin:16px 0 28px;color:#94A3B8;font-size:15px;line-height:24px;">
        Thanks for creating your account. Use the verification code below to activate your ResumeAI profile and start building ATS-friendly resumes.
      </p>
    </td>
  </tr>

  <!-- OTP Box -->
  <tr>
    <td align="center" style="padding:0 40px 28px;">
      <table cellpadding="0" cellspacing="0" style="background:#0F172A;border:1px solid #334155;border-radius:14px;">
        <tr>
          <td style="padding:22px 30px;text-align:center;">
            <div style="color:#64748B;font-size:12px;letter-spacing:2px;margin-bottom:8px;">
              VERIFICATION CODE
            </div>

            <div style="font-size:38px;font-weight:700;letter-spacing:10px;color:#FFFFFF;">
              ${otp}
            </div>
          </td>
        </tr>
      </table>
    </td>
  </tr>

  <!-- Expiry -->
  <tr>
    <td style="padding:0 40px;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background:#312E81;border-radius:12px;">
        <tr>
          <td style="padding:14px 16px;">
            <p style="margin:0;color:#C7D2FE;font-size:14px;">
              ⏱ This OTP expires in <strong>10 minutes</strong>.
            </p>
          </td>
        </tr>
      </table>
    </td>
  </tr>

  <!-- Security -->
  <tr>
    <td style="padding:28px 40px 18px;">
      <p style="margin:0;color:#94A3B8;font-size:13px;line-height:22px;">
        If you didn't create a ResumeAI account, you can safely ignore this email. No changes will be made without this verification code.
      </p>
    </td>
  </tr>

  <!-- Footer -->
  <tr>
    <td align="center" style="padding:24px 32px;border-top:1px solid #334155;">
      <p style="margin:0;color:#64748B;font-size:12px;line-height:20px;">
        ResumeAI • AI Powered ATS Resume Builder
      </p>

      <p style="margin:8px 0 0;color:#475569;font-size:11px;">
        © 2026 ResumeAI. Built by Chetan Ravish.
      </p>
    </td>
  </tr>

</table>

</td>
</tr>
</table>

</body>
</html>
`;
}