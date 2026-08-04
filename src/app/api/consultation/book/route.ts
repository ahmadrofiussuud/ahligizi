import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { expert_id, user_id = 'usr-demo-1', scheduled_at, method, price } = await req.json();

    if (!expert_id || !scheduled_at) {
      return NextResponse.json({ error: 'Jadwal dan expert wajib diisi' }, { status: 400 });
    }

    // Midtrans Snap Token simulation values for Sandbox environment
    const transactionId = `TRX-MID-${Date.now()}`;
    const mockSnapToken = `snap-token-demo-${Math.random().toString(36).substring(7)}`;

    return NextResponse.json({
      success: true,
      message: 'Transaksi booking berhasil disiapkan (Sandbox Mode)',
      snap_token: mockSnapToken,
      transaction_id: transactionId,
      redirect_url: `https://app.sandbox.midtrans.com/snap/v2/vtweb/${mockSnapToken}`,
      booking: {
        id: `cons-${Date.now()}`,
        expert_id,
        user_id,
        scheduled_at,
        method,
        price,
        status: 'SCHEDULED'
      }
    });

  } catch (err) {
    return NextResponse.json({ error: 'Gagal membuat reservasi konsultasi' }, { status: 500 });
  }
}
