import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { signJwtToken } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const { email, password, provider } = await req.json();

    if (provider === 'google') {
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

    // Try finding user in database
    let dbUser = null;
    try {
      dbUser = await prisma.user.findUnique({ where: { email } });
    } catch (err) {
      console.warn('DB lookup failed in login, fallback to demo check:', err);
    }

    if (dbUser && dbUser.password_hash) {
      const isMatch = await bcrypt.compare(password, dbUser.password_hash);
      if (!isMatch) {
        return NextResponse.json({ error: 'Email atau password salah' }, { status: 401 });
      }

      const token = signJwtToken({
        userId: dbUser.id,
        email: dbUser.email,
        name: dbUser.name
      });

      return NextResponse.json({
        success: true,
        message: 'Login berhasil',
        token,
        user: {
          id: dbUser.id,
          name: dbUser.name,
          email: dbUser.email
        }
      });
    }

    // Fallback for demo login accounts if DB record not created yet
    const token = signJwtToken({
      userId: 'usr-demo-1',
      email: email,
      name: 'Pengguna Demo CEKAT'
    });

    return NextResponse.json({
      success: true,
      message: 'Login berhasil (Demo Mode)',
      token,
      user: {
        id: 'usr-demo-1',
        name: 'Pengguna Demo CEKAT',
        email: email
      }
    });

  } catch (error) {
    console.error('Login API error:', error);
    return NextResponse.json({ error: 'Gagal melakukan otentikasi' }, { status: 500 });
  }
}

