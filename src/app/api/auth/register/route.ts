import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { signJwtToken } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email dan password wajib diisi' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const mockUser = {
      id: `usr-${Date.now()}`,
      name: name || email.split('@')[0],
      email: email,
    };

    const token = signJwtToken({
      userId: mockUser.id,
      email: mockUser.email,
      name: mockUser.name
    });

    return NextResponse.json({
      success: true,
      message: 'Registrasi berhasil',
      token,
      user: mockUser
    });
  } catch (error) {
    return NextResponse.json({ error: 'Terjadi kesalahan sistem' }, { status: 500 });
  }
}
