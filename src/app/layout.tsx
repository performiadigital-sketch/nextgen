import type { Metadata } from 'next';
import './globals.css';
import { Providers } from '@/components/Providers';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { FloatingComparisonBadge } from '@/components/FloatingComparisonBadge';

export const metadata: Metadata = {
  title: "NextGen Women's Football — L'Indice Mondial de Valorisation",
  description: "Plateforme de référence internationale dédiée à la présentation, au suivi statistique et à l'estimation de la valeur marchande des joueuses de football féminin.",
  icons: {
    icon: '/images/favicon.png',
  },
  openGraph: {
    title: "NextGen Women's Football",
    description: "L'indice mondial d'évaluation et de valorisation des joueuses de football féminin.",
    images: ['/images/logo.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="dark">
      <body className="bg-[#080C14] text-slate-100 antialiased flex flex-col min-h-screen">
        <Providers>
          <Navbar />
          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>
          <Footer />
          <FloatingComparisonBadge />
        </Providers>
      </body>
    </html>
  );
}
