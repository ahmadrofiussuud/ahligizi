/* Read-only connection check. Never print credentials, URLs, or patient records. */
const { loadEnvConfig } = require('@next/env');
const { PrismaClient } = require('@prisma/client');

loadEnvConfig(process.cwd(), process.env.NODE_ENV !== 'production', { info() {}, error() {} });

async function checkDataApi() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key || !/^https:\/\/[a-z0-9]+\.supabase\.co$/.test(url)) {
    console.error('URL dan public key Supabase belum tersedia.'); process.exitCode = 1; return;
  }
  const headers = { apikey: key, Authorization: `Bearer ${key}` };
  try {
    const auth = await fetch(`${url}/auth/v1/settings`, { headers, signal: AbortSignal.timeout(12000) });
    if (!auth.ok) throw new Error('AUTH_UNAVAILABLE');
    const patients = await fetch(`${url}/rest/v1/cekat_patients?select=user_id&limit=0`, { headers, method: 'HEAD', signal: AbortSignal.timeout(12000) });
    if (![401, 403].includes(patients.status)) {
      console.error(`Akses anonim belum terverifikasi ditolak (HTTP ${patients.status}). Periksa schema dan RLS.`);
      process.exitCode = 1; return;
    }
    console.log('Supabase Auth dapat dihubungi dan public key diterima.');
    console.log('Data pasien tidak dapat diakses secara anonim. Tidak ada data pasien yang dibaca atau diubah.');
    console.log('Integrasi Station menggunakan Supabase Data API, bukan DATABASE_URL Prisma lama. Uji pasien/petugas memerlukan login.');
  } catch {
    console.error('Supabase belum dapat dijangkau. Periksa layanan, public key, dan akses jaringan.');
    process.exitCode = 1;
  }
}

async function main() {
  let connection;
  try {
    connection = new URL(process.env.DATABASE_URL || '');
  } catch {
    await checkDataApi();
    return;
  }
  if (!['postgres:', 'postgresql:'].includes(connection.protocol)) {
    await checkDataApi();
    return;
  }
  if (!connection.hostname.endsWith('.supabase.co') && !connection.hostname.endsWith('.pooler.supabase.com')) {
    console.error('DATABASE_URL aktif belum menunjuk ke Supabase. Tidak ada koneksi atau perubahan database yang dilakukan.');
    process.exitCode = 1;
    return;
  }
  if (!['require', 'verify-ca', 'verify-full'].includes(connection.searchParams.get('sslmode'))) {
    console.error('Aktifkan TLS pada koneksi Supabase dengan parameter sslmode=require atau verifikasi sertifikat yang sesuai.');
    process.exitCode = 1;
    return;
  }
  connection.searchParams.set('connect_timeout', '8');
  connection.searchParams.set('pool_timeout', '8');
  const prisma = new PrismaClient({ datasources: { db: { url: connection.toString() } }, log: [] });
  try {
    await prisma.$queryRaw`SELECT 1 AS connection_ok`;
    const tables = await prisma.$queryRaw`
      SELECT table_name FROM information_schema.tables
      WHERE table_schema = 'public' AND table_type = 'BASE TABLE'
    `;
    const names = new Set(tables.map(table => table.table_name));
    const missing = ['User', 'FoodLog', 'OtpCode'].filter(name => !names.has(name));
    console.log('Koneksi PostgreSQL Supabase berhasil. Pemeriksaan ini tidak mengubah data.');
    if (missing.length) {
      console.log(`Tabel aplikasi yang belum tersedia: ${missing.join(', ')}. Migrasi masih diperlukan.`);
      process.exitCode = 1;
    } else {
      console.log('Tabel dasar akun, log makanan, dan OTP tersedia.');
    }
    console.log('Koneksi berhasil bukan bukti bahwa hak akses, backup, atau integrasi Station sudah lengkap.');
  } catch (error) {
    const code = typeof error.code === 'string' ? error.code : 'CONNECTION_ERROR';
    console.error(`Pemeriksaan gagal (${code}). Periksa status project, kredensial, port, TLS, dan akses jaringan. Detail rahasia tidak ditampilkan.`);
    process.exitCode = 1;
  } finally {
    await prisma.$disconnect();
  }
}

main().catch(() => {
  console.error('Pemeriksaan tidak dapat diselesaikan. Tidak ada data pasien yang ditampilkan.');
  process.exitCode = 1;
});
