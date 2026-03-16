import { Outlet } from 'react-router-dom'
import { useLenis } from '../../hooks/useLenis'
import { CheckoutContext, useCheckoutState } from '../../hooks/useCheckout'
import { CheckoutModal } from '../checkout/CheckoutModal'
import { Nav } from './Nav'
import { Footer } from './Footer'
import { SocialToasts } from '../social/SocialToasts'
import { ScrollToTop } from './ScrollToTop'

export function RootLayout() {
  useLenis()
  const checkout = useCheckoutState()

  return (
    <CheckoutContext.Provider value={checkout}>
      <ScrollToTop />
      <a href="#main-content" className="skip-link">Ir para conteudo</a>
      <Nav />
      <main id="main-content">
        <Outlet />
      </main>
      <Footer />
      <SocialToasts />
      <CheckoutModal />
    </CheckoutContext.Provider>
  )
}
