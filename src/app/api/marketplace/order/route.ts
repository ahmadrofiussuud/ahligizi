import { NextResponse } from 'next/server';

export interface OrderItem {
  id: string;
  items: any[];
  total_price: number;
  status: 'PENDING' | 'PAID' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  address: string;
  created_at: string;
  snap_token: string;
}

// In-Memory Database store for user orders
const userOrders: OrderItem[] = [
  {
    id: 'ORD-98471',
    items: [
      { name: 'Digital Kitchen Scale Ultra Precision 0.1g', quantity: 1, price: 95000 }
    ],
    total_price: 95000,
    status: 'PAID',
    address: 'Jl. Sudirman No. 12, Jakarta',
    created_at: '02 Agustus 2026',
    snap_token: 'snap-token-demo-xyz'
  }
];

export async function GET() {
  return NextResponse.json({ success: true, orders: userOrders });
}

export async function POST(req: Request) {
  try {
    const { items, total_price, address } = await req.json();

    if (!items || items.length === 0 || !address) {
      return NextResponse.json({ error: 'Data pemesanan tidak lengkap' }, { status: 400 });
    }

    const mockSnapToken = `snap-token-order-${Math.random().toString(36).substring(7)}`;

    const newOrder: OrderItem = {
      id: `ORD-${Math.floor(10000 + Math.random() * 90000)}`,
      items,
      total_price,
      status: 'PENDING',
      address,
      created_at: 'Hari Ini',
      snap_token: mockSnapToken
    };

    userOrders.unshift(newOrder);

    return NextResponse.json({
      success: true,
      message: 'Pesanan berhasil dibuat (Midtrans Sandbox Mode)',
      snap_token: mockSnapToken,
      redirect_url: `https://app.sandbox.midtrans.com/snap/v2/vtweb/${mockSnapToken}`,
      order: newOrder
    });
  } catch (err) {
    return NextResponse.json({ error: 'Gagal membuat pesanan' }, { status: 500 });
  }
}
export { userOrders };
