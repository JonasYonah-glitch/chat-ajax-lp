import { Link } from 'react-router-dom'

const NAV_LINKS = [
  { label: 'NOTICIAS', href: 'https://ajax.dev.br/noticias', external: true },
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
              src="/Logos/logo ajax hub branco.svg"
              alt="Ajax Hub"
              className="h-12 md:h-14"
            />
            <p className="text-xs uppercase tracking-[0.15em] text-white/50 font-bold max-w-[260px]">
              CENTRALIZA. AUTOMATIZA. CONVERTE.
            </p>
          </div>

          {/* Right: social icons */}
          <div className="flex items-center gap-3" aria-label="Redes sociais">
            <a
              href="https://www.instagram.com/ajax_hub"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram do Ajax Hub"
              className="w-11 h-11 flex items-center justify-center border border-white/30 text-white/70 transition-all duration-200 hover:bg-ajax-purple hover:border-ajax-purple hover:text-white"
            >
              <InstagramIcon />
            </a>
            <a
              href="https://www.linkedin.com/company/ajax-hub/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn do Ajax Hub"
              className="w-11 h-11 flex items-center justify-center border border-white/30 text-white/70 transition-all duration-200 hover:bg-ajax-purple hover:border-ajax-purple hover:text-white"
            >
              <LinkedInIcon />
            </a>
            <a
              href="https://wa.me/554896249916?text=Ol%C3%A1!%20Gostaria%20de%20saber%20mais%20sobre%20os%20servi%C3%A7os%20da%20Ajax%20Hub."
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp do Ajax Hub"
              className="w-11 h-11 flex items-center justify-center border border-white/30 text-white/70 transition-all duration-200 hover:bg-[#25D366] hover:border-[#25D366] hover:text-white"
            >
              <WhatsAppIcon />
            </a>
          </div>
        </div>

        {/* Separator */}
        <div className="h-[1px] bg-white/10 my-8" aria-hidden="true" />

        {/* Bottom row: copyright left, nav links center, language right */}
        <div className="flex items-center justify-between gap-6 flex-wrap">
          {/* Copyright */}
          <span className="text-[0.7rem] uppercase tracking-[0.12em] text-white/40 font-bold">
            &copy; 2026 AJAX HUB. TODOS OS DIREITOS RESERVADOS.
          </span>

          {/* Nav links */}
          <nav className="flex flex-wrap gap-x-6 gap-y-2 justify-center" aria-label="Links do rodape">
            {NAV_LINKS.map(link => (
              'external' in link && link.external ? (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[0.68rem] uppercase tracking-[0.12em] text-white/40 no-underline font-bold transition-colors duration-200 hover:text-ajax-purple"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.label}
                  to={link.href}
                  className="text-[0.68rem] uppercase tracking-[0.12em] text-white/40 no-underline font-bold transition-colors duration-200 hover:text-ajax-purple"
                >
                  {link.label}
                </Link>
              )
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

function WhatsAppIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  )
}
