import jwt from 'jsonwebtoken';

function jwtSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret || secret.length < 32) throw new Error('JWT_SECRET harus dikonfigurasi dengan minimal 32 karakter.');
  return secret;
}

export interface TokenPayload {
  userId: string;
  email: string;
  name: string;
}

export function signJwtToken(payload: TokenPayload): string {
  return jwt.sign(payload, jwtSecret(), { expiresIn: '7d', algorithm: 'HS256' });
}

export function verifyJwtToken(token: string): TokenPayload | null {
  try {
    const payload = jwt.verify(token, jwtSecret(), { algorithms: ['HS256'] });
    if (typeof payload === 'string' || typeof payload.userId !== 'string' || typeof payload.email !== 'string' || typeof payload.name !== 'string') return null;
    return { userId: payload.userId, email: payload.email, name: payload.name };
  } catch (error) {
    return null;
  }
}
