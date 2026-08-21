import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'CekGizi NutriSnap',
    short_name: 'CekGizi',
    description: 'CekGizi NutriSnap membantu Anda mendeteksi kalori piring makan secara real-time, menganalisis kandungan nutrisi, dan konsultasi ahli gizi.',
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
