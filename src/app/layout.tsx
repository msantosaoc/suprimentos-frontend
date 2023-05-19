import ThemeContextParent from '@/contexts/theme'
import './globals.css'
import MenuContextParent from '@/contexts/menu'
import Sidebar from '@/components/Sidebar/Sidebar'

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <ThemeContextParent>
      <MenuContextParent>
    <html lang="pt-br">
      <body >
        {children}
      </body>
    </html>
        </MenuContextParent>
        </ThemeContextParent>
  )
}