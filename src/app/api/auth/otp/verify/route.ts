import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const { email, code, purpose = 'VERIFY_EMAIL' } = await req.json();

    if (!email || !code) {
      return NextResponse.json({ error: 'Email dan kode OTP wajib diisi' }, { status: 400 });
    }

    // Demo mode check
    if (process.env.OTP_DEMO_MODE === 'true') {
      const demoCode = process.env.OTP_DEMO_CODE || '1234';
      if (code === demoCode) {
        return NextResponse.json({ success: true, verified: true, demo: true });
      }
      return NextResponse.json({ error: `Kode OTP salah. [Demo: gunakan ${demoCode}]` }, { status: 400 });
    }

    // Find latest valid OTP
    const otpRecord = await prisma.otpCode.findFirst({
      where: {
        email,
        code,
        purpose,
        used: false,
        expires_at: { gt: new Date() },
      },
      orderBy: { created_at: 'desc' },
    });

    if (!otpRecord) {
      return NextResponse.json({ error: 'Kode OTP tidak valid atau sudah kadaluarsa' }, { status: 400 });
    }

    // Mark as used
    await prisma.otpCode.update({
      where: { id: otpRecord.id },
      data: { used: true },
    });

    // If purpose is VERIFY_EMAIL, mark user as verified
    if (purpose === 'VERIFY_EMAIL') {
      await prisma.user.updateMany({
        where: { email },
        data: { email_verified: true },
      });
    }

    return NextResponse.json({ success: true, verified: true });
  } catch (err) {
    console.error('OTP verify error:', err);
    return NextResponse.json({ error: 'Terjadi kesalahan sistem' }, { status: 500 });
  }
}
