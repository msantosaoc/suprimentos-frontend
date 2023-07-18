import ThemeContextParent from '@/contexts/theme'
import './globals.css'
import MenuContextParent from '@/contexts/menu';
import 'bootstrap/dist/css/bootstrap.min.css';
import Providers from '@/components/Providers';

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
          <html lang="pt-br">
    <Providers>
      <ThemeContextParent>
        <MenuContextParent>
            
            <body >
              {children}
            </body>
        </MenuContextParent>
      </ThemeContextParent>
    </Providers>
          </html>
  )
}
