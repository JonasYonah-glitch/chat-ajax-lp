import { Link } from 'react-router-dom'

const NAV_LINKS = [
  { label: 'NOTICIAS', href: '/noticias' },
  { label: 'CONTATO', href: '/contato' },
  { label: 'STATUS', href: '/status' },
  { label: 'SOBRE', href: '/sobre' },
  { label: 'TERMOS', href: '/termos' },
  { label: 'PRIVACIDADE', href: '/privacidade' },
] as const

export function Footer() {
  return (
    <footer className="bg-[#131313]" aria-label="Rodape">
      {/* Top purple stripe */}
      <div className="h-[2px] bg-ajax-purple w-full" aria-hidden="true" />

      <div className="max-w-[1280px] mx-auto px-6 py-12">
        {/* Main row: logo+slogan left, social right */}
        <div className="flex items-start justify-between gap-8 flex-wrap">
          {/* Left: logo + slogan */}
          <div className="flex flex-col gap-3">
            <img
              src="/Logos/BRANCO.svg"
              alt="Ajax Hub"
              className="h-8"
            />
            <p className="text-xs uppercase tracking-[0.15em] text-white/50 font-bold max-w-[260px]">
              CENTRALIZA. AUTOMATIZA. CONVERTE.
            </p>
          </div>

          {/* Right: social icons */}
          <div className="flex items-center gap-3" aria-label="Redes sociais">
            <a
              href="https://instagram.com/ajaxhub"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram do Ajax Hub"
              className="w-11 h-11 flex items-center justify-center border border-white/30 text-white/70 transition-all duration-200 hover:bg-ajax-purple hover:border-ajax-purple hover:text-white"
            >
              <InstagramIcon />
            </a>
            <a
              href="https://linkedin.com/company/ajaxhub"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn do Ajax Hub"
              className="w-11 h-11 flex items-center justify-center border border-white/30 text-white/70 transition-all duration-200 hover:bg-ajax-purple hover:border-ajax-purple hover:text-white"
            >
              <LinkedInIcon />
            </a>
          </div>
        </div>

        {/* Separator */}
        <div className="h-[1px] bg-white/10 my-8" aria-hidden="true" />

        {/* Bottom row: copyright left, nav links center, language right */}
        <div className="flex items-center justify-between gap-6 flex-wrap">
          {/* Copyright */}
          <span className="text-[0.7rem] uppercase tracking-[0.12em] text-white/40 font-bold">
            &copy; 2026 CHAT AJAX. TODOS OS DIREITOS RESERVADOS.
          </span>

          {/* Nav links */}
          <nav className="flex flex-wrap gap-x-6 gap-y-2 justify-center" aria-label="Links do rodape">
            {NAV_LINKS.map(link => (
              <Link
                key={link.label}
                to={link.href}
                className="text-[0.68rem] uppercase tracking-[0.12em] text-white/40 no-underline font-bold transition-colors duration-200 hover:text-ajax-purple"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Language */}
          <span className="text-[0.68rem] uppercase tracking-[0.12em] text-white/40 font-bold">
            PT-BR
          </span>
        </div>
      </div>
    </footer>
  )
}

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="2"/>
      <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2"/>
      <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor"/>
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="2" stroke="currentColor" strokeWidth="2"/>
      <line x1="7" y1="10" x2="7" y2="17" stroke="currentColor" strokeWidth="2" strokeLinecap="square"/>
      <circle cx="7" cy="7.5" r="1.2" fill="currentColor"/>
      <path d="M11 10v7M11 13c0-2 6-3 6 1v3" stroke="currentColor" strokeWidth="2" strokeLinecap="square"/>
    </svg>
  )
}
