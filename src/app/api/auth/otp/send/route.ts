import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

function generateOtp(): string {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6 digit
}

export async function POST(req: Request) {
  try {
    const { email, purpose = 'VERIFY_EMAIL' } = await req.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Email tidak valid' }, { status: 400 });
    }

    // Demo mode: skip real email, always use code 1234
    if (process.env.OTP_DEMO_MODE === 'true') {
      return NextResponse.json({
        success: true,
        demo: true,
        message: `[DEMO] Kode OTP: ${process.env.OTP_DEMO_CODE || '1234'}`,
      });
    }

    // Invalidate previous OTPs for this email
    await prisma.otpCode.updateMany({
      where: { email, purpose, used: false },
      data: { used: true },
    });

    const code = generateOtp();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 menit

    // Check if user exists
    const user = await prisma.user.findUnique({ where: { email } });

    await prisma.otpCode.create({
      data: {
        email,
        code,
        purpose,
        expires_at: expiresAt,
        user_id: user?.id ?? null,
      },
    });

    // Send via Resend
    const { error: sendError } = await resend.emails.send({
      from: 'CEKAT <otp@cekat.id>', // Ganti dengan domain kamu yang terverifikasi di Resend
      to: email,
      subject: `Kode Verifikasi CEKAT: ${code}`,
      html: `
        <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 32px; background: #f0fdf4; border-radius: 16px;">
          <div style="text-align: center; margin-bottom: 24px;">
            <h1 style="color: #15803d; font-size: 28px; margin: 0;">CEKAT</h1>
            <p style="color: #6b7280; font-size: 13px; margin: 4px 0 0;">Cek • Kenali • Tindaklanjuti</p>
          </div>
          <div style="background: white; border-radius: 12px; padding: 28px; text-align: center; border: 1px solid #d1fae5;">
            <p style="color: #374151; font-size: 15px; margin: 0 0 20px;">Kode OTP Verifikasi Email kamu:</p>
            <div style="background: #f0fdf4; border: 2px dashed #86efac; border-radius: 12px; padding: 20px; display: inline-block;">
              <span style="font-size: 42px; font-weight: 900; letter-spacing: 12px; color: #15803d;">${code}</span>
            </div>
            <p style="color: #6b7280; font-size: 13px; margin: 20px 0 0;">Kode berlaku selama <strong>10 menit</strong>.</p>
            <p style="color: #9ca3af; font-size: 12px; margin: 8px 0 0;">Jangan bagikan kode ini kepada siapapun.</p>
          </div>
          <p style="color: #9ca3af; font-size: 11px; text-align: center; margin: 20px 0 0;">
            Jika kamu tidak merasa mendaftar ke CEKAT, abaikan email ini.
          </p>
        </div>
      `,
    });

    if (sendError) {
      console.error('Resend error:', sendError);
      return NextResponse.json({ error: 'Gagal mengirim email OTP' }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: `Kode OTP dikirim ke ${email}` });
  } catch (err) {
    console.error('OTP send error:', err);
    return NextResponse.json({ error: 'Terjadi kesalahan sistem' }, { status: 500 });
  }
}
