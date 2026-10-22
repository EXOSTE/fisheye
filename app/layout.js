import { DM_Sans } from 'next/font/google';
import './globals.css';

// Police de la maquette FishEye
const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
});

export const metadata = {
  title: 'FishEye',
  description: 'Plateforme de photographes freelances',
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={dmSans.variable}>
      <body>{children}</body>
    </html>
  );
}
