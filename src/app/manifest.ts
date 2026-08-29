import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'CEKAT Kemenkes RI',
    short_name: 'CEKAT',
    description: 'CEKAT (Cek, Kenali, Tindaklanjuti) membantu Anda mendeteksi risiko PTM secara dini, menganalisis kandungan nutrisi, dan konsultasi gizi.',
    start_url: '/app',
    display: 'standalone',
    background_color: '#f7f9f6',
    theme_color: '#00875a',
    icons: [
      {
        src: '/landing/cekat_logo.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/landing/cekat_logo.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
    ],
  };
}
