import { NextResponse } from 'next/server';

export interface CartItem {
  product_id: string;
  name: string;
  price: number;
  quantity: number;
  image_url: string;
}

// In-Memory Database store for user cart
let userCart: CartItem[] = [
  {
    product_id: 'prod-2',
    name: 'Granola Crunch Berry & Almond 500g',
    price: 68000,
    quantity: 2,
    image_url: 'https://images.unsplash.com/photo-1517673400267-0251440c45dc?auto=format&fit=crop&w=400&q=80'
  }
];

export async function GET() {
  return NextResponse.json({ success: true, items: userCart });
}

export async function POST(req: Request) {
  try {
    const { product_id, name, price, quantity = 1, image_url } = await req.json();

    const existing = userCart.find((i) => i.product_id === product_id);
    if (existing) {
      existing.quantity += quantity;
    } else {
      userCart.push({ product_id, name, price, quantity, image_url });
    }

    return NextResponse.json({ success: true, items: userCart });
  } catch (err) {
    return NextResponse.json({ error: 'Gagal menambahkan produk ke keranjang' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { product_id, clear_all } = await req.json();

    if (clear_all) {
      userCart = [];
    } else if (product_id) {
      userCart = userCart.filter((i) => i.product_id !== product_id);
    }

    return NextResponse.json({ success: true, items: userCart });
  } catch (err) {
    return NextResponse.json({ error: 'Gagal memodifikasi keranjang' }, { status: 500 });
  }
}
export { userCart };
