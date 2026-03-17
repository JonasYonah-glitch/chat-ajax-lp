import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { gsap, ScrollTrigger } from '../../lib/gsap'
import { SolarIcon } from '../../icons'

const NAV_LINKS = [
  { label: 'CANAIS', hash: 'canais' },
  { label: 'RECURSOS', hash: 'recursos' },
  { label: 'PRECOS', hash: 'precos' },
  { label: 'FAQ', hash: 'faq' },
  { label: 'SOBRE', href: '/sobre' },
] as const

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const linksRef = useRef<HTMLElement[]>([])
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  // Scroll detection
  useEffect(() => {
    const trigger = ScrollTrigger.create({
      start: 60,
      onEnter: () => setScrolled(true),
      onLeaveBack: () => setScrolled(false),
    })
    return () => trigger.kill()
  }, [])

  // Scroll progress bar
  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(docHeight > 0 ? scrollTop / docHeight : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Escape key handler
  useEffect(() => {
    if (!menuOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeMenu()
        toggleRef.current?.focus()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [menuOpen])

  // GSAP mobile menu open animation
  useEffect(() => {
    const overlay = overlayRef.current
    if (!overlay) return

    if (menuOpen) {
      // Slide in from right
      gsap.fromTo(overlay,
        { x: '100%', opacity: 0 },
        { x: '0%', opacity: 1, duration: 0.4, ease: 'power3.out' }
      )
      // Stagger link entrance
      const linkEls = linksRef.current.filter(Boolean)
      gsap.fromTo(linkEls,
        { x: 40, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.35, stagger: 0.07, ease: 'power2.out', delay: 0.15 }
      )
    } else {
      gsap.to(overlay, {
        x: '100%', opacity: 0, duration: 0.3, ease: 'power3.in'
      })
    }
  }, [menuOpen])

  const closeMenu = () => {
    setMenuOpen(false)
    document.body.style.overflow = ''
  }

  const toggleMenu = () => {
    const next = !menuOpen
    setMenuOpen(next)
    document.body.style.overflow = next ? 'hidden' : ''
  }

  const hashLink = (hash: string) => isHome ? `#${hash}` : `/#${hash}`

  const setLinkRef = (i: number) => (el: HTMLElement | null) => {
    if (el) linksRef.current[i] = el
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-ajax-white/80 backdrop-blur-md shadow-[0_1px_0_rgba(0,0,0,0.08)]'
          : 'bg-transparent'
      }`}
      aria-label="Navegacao principal"
    >
      <div className="flex items-center justify-between max-w-[1280px] mx-auto px-6 h-16">

        {/* Logo */}
        <Link to="/" className="no-underline flex items-center shrink-0" aria-label="Chat Ajax — pagina inicial">
          <img
            src="/Logos/logo ajax hub preto.svg"
            alt="Ajax Hub"
            width={120}
            height={40}
            className="h-8 md:h-10"
          />
        </Link>

        {/* Desktop nav links — center */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(link => {
            const href = 'hash' in link ? hashLink(link.hash) : link.href
            const isActive = 'href' in link && pathname === link.href
            return (
              <NavLink
                key={link.label}
                href={href}
                label={link.label}
                isActive={isActive}
                isHashLink={'hash' in link}
              />
            )
          })}
        </div>

        {/* Right side: Login + CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="https://chat.ajax.dev.br"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center h-9 px-5 border-2 border-ajax-black text-ajax-black text-xs font-bold uppercase tracking-[0.15em] no-underline transition-all duration-200 hover:border-ajax-purple hover:text-ajax-purple hover:shadow-[4px_4px_0_#5E17EB]"
          >
            LOGIN
          </a>
          <a
            href={isHome ? '#precos' : '/#precos'}
            className="inline-flex items-center justify-center h-9 px-5 bg-ajax-purple text-white text-xs font-bold uppercase tracking-[0.15em] no-underline transition-all duration-200 hover:bg-ajax-purple-mid"
            style={{ boxShadow: '4px 4px 0 #131313' }}
            onMouseEnter={e => (e.currentTarget.style.boxShadow = '8px 8px 0 #131313')}
            onMouseLeave={e => (e.currentTarget.style.boxShadow = '4px 4px 0 #131313')}
          >
            COMECAR AGORA
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          ref={toggleRef}
          className="md:hidden flex flex-col gap-[5px] p-2 z-[1001] relative"
          onClick={toggleMenu}
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={menuOpen}
        >
          <span className={`block w-6 h-0.5 bg-ajax-black transition-all duration-300 ${menuOpen ? 'rotate-45 translate-x-[5px] translate-y-[5px]' : ''}`} />
          <span className={`block w-6 h-0.5 bg-ajax-black transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-ajax-black transition-all duration-300 ${menuOpen ? '-rotate-45 translate-x-[5px] -translate-y-[5px]' : ''}`} />
        </button>
      </div>

      {/* Scroll progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-transparent">
        <div
          className="h-full bg-ajax-purple origin-left transition-none"
          style={{ transform: `scaleX(${scrollProgress})` }}
        />
      </div>

      {/* Mobile overlay */}
      <div
        ref={overlayRef}
        className={`md:hidden fixed inset-0 bg-ajax-white z-[999] flex flex-col justify-center px-10 ${menuOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
        style={{ transform: 'translateX(100%)', opacity: 0 }}
        aria-hidden={!menuOpen}
      >
        {/* Close button */}
        <button
          onClick={closeMenu}
          aria-label="Fechar menu"
          className="absolute top-5 right-6 w-11 h-11 flex items-center justify-center border border-ajax-black text-ajax-black"
        >
          <SolarIcon icon="solar:close-circle-linear" size={20} aria-hidden={true} />
        </button>

        <nav className="flex flex-col gap-6" aria-label="Menu mobile">
          {NAV_LINKS.map((link, i) => {
            const href = 'hash' in link ? hashLink(link.hash) : link.href
            return (
              <a
                key={link.label}
                ref={setLinkRef(i)}
                href={href}
                onClick={closeMenu}
                className="text-3xl font-black uppercase tracking-[0.1em] text-ajax-black no-underline transition-colors duration-200 hover:text-ajax-purple"
              >
                {link.label}
              </a>
            )
          })}
        </nav>

        <div className="mt-10 flex flex-col gap-3">
          <a
            href="https://chat.ajax.dev.br"
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMenu}
            className="w-full h-12 flex items-center justify-center border-2 border-ajax-black text-ajax-black text-sm font-bold uppercase tracking-[0.15em] no-underline"
          >
            LOGIN
          </a>
          <a
            href={isHome ? '#precos' : '/#precos'}
            onClick={closeMenu}
            className="w-full h-12 flex items-center justify-center bg-ajax-purple text-white text-sm font-bold uppercase tracking-[0.15em] no-underline"
            style={{ boxShadow: '4px 4px 0 #131313' }}
          >
            COMECAR AGORA
          </a>
        </div>
      </div>
    </nav>
  )
}

interface NavLinkProps {
  href: string
  label: string
  isActive: boolean
  isHashLink: boolean
}

function NavLink({ href, label, isActive }: NavLinkProps) {
  return (
    <a
      href={href}
      className={`relative text-xs font-bold uppercase tracking-[0.15em] no-underline transition-colors duration-200 group ${
        isActive
          ? 'text-ajax-purple'
          : 'text-ajax-black hover:text-ajax-purple'
      }`}
    >
      {label}
      {/* Geometric underline reveal */}
      <span
        className={`absolute bottom-[-3px] left-0 h-[2px] bg-ajax-purple transition-transform duration-300 origin-left ${
          isActive ? 'w-full scale-x-100' : 'w-full scale-x-0 group-hover:scale-x-100'
        }`}
        aria-hidden="true"
      />
    </a>
  )
}
