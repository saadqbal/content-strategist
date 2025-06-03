import './globals.css';

export const metadata = {
  title: 'Content Strategist Assistant',
  description: 'Content Strategist Assistant by Content Strategist',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
