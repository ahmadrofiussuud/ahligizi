import { NextResponse } from 'next/server';
import { signJwtToken } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const { email, password, provider } = await req.json();

    if (provider === 'google') {
      // Google OAuth login response token placeholder
      const token = signJwtToken({
        userId: 'google-user-123',
        email: email || 'user.google@gmail.com',
        name: 'Google User'
      });
      return NextResponse.json({
        success: true,
        message: 'Login Google Berhasil',
        token,
        user: { id: 'google-user-123', name: 'Google User', email: email || 'user.google@gmail.com' }
      });
    }

    if (!email || !password) {
      return NextResponse.json({ error: 'Email dan password wajib diisi' }, { status: 400 });
    }

    // Direct JWT Authentication
    const token = signJwtToken({
      userId: 'usr-demo-1',
      email: email,
      name: 'Rizky Fitrianto'
    });

    return NextResponse.json({
      success: true,
      message: 'Login berhasil',
      token,
      user: {
        id: 'usr-demo-1',
        name: 'Rizky Fitrianto',
        email: email
      }
    });

  } catch (error) {
    return NextResponse.json({ error: 'Gagal melakukan otentikasi' }, { status: 500 });
  }
}
