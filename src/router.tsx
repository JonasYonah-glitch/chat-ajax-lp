import { createBrowserRouter } from 'react-router-dom'
import { RootLayout } from './components/layout/RootLayout'
import { lazy, Suspense } from 'react'

const HomePage = lazy(() => import('./pages/HomePage'))
const SobrePage = lazy(() => import('./pages/SobrePage'))
const TermosPage = lazy(() => import('./pages/TermosPage'))
const PrivacidadePage = lazy(() => import('./pages/PrivacidadePage'))
const StatusPage = lazy(() => import('./pages/StatusPage'))
const ContatoPage = lazy(() => import('./pages/ContatoPage'))

function LazyWrap({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<div className="min-h-screen" />}>{children}</Suspense>
}

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: '/', element: <LazyWrap><HomePage /></LazyWrap> },
      { path: '/sobre', element: <LazyWrap><SobrePage /></LazyWrap> },
      { path: '/termos', element: <LazyWrap><TermosPage /></LazyWrap> },
      { path: '/privacidade', element: <LazyWrap><PrivacidadePage /></LazyWrap> },
      { path: '/status', element: <LazyWrap><StatusPage /></LazyWrap> },
      { path: '/contato', element: <LazyWrap><ContatoPage /></LazyWrap> },
    ],
  },
])
