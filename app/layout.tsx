import './globals.css'
import NavigationBar from "@/components/NavigationBar";

export const metadata = {
  title: 'Auth Rooms',
  description: 'An app to test authed user rooms.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
      <NavigationBar />
        <main className="min-h-screen bg-background flex flex-col items-center">
          {children}
        </main>
      </body>
    </html>
  )
}
