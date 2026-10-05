import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'LegalEase AI — Legal Document Intelligence Platform',
  description: 'Understand your legal documents. Know what matters. Know what to do next. Multimodal intelligence powered by Google Gemini for Indian legal contracts, termination notices, and rental agreements.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full bg-slate-50 text-slate-900 antialiased">
      <body className="min-h-full flex flex-col font-sans selection:bg-indigo-100 selection:text-indigo-900">
        {children}
      </body>
    </html>
  );
}
