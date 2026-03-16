import { Container } from '../ui/Container'
import { SectionTag } from '../ui/SectionTag'
import { SectionTitle } from '../ui/SectionTitle'
import { useGsapReveal } from '../../hooks/useGsapReveal'
import { useRef, useLayoutEffect } from 'react'
import { gsap } from '../../lib/gsap'
import { SlackIcon, GoogleIcon } from '../../icons'

const integrations = [
  { name: 'Slack', icon: <SlackIcon size={18} fill="#4A154B" /> },
  { name: 'HubSpot', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M17.5 8.5V5.8a1.8 1.8 0 0 0 1-1.6V4.1A1.8 1.8 0 0 0 16.7 2.3h-.1A1.8 1.8 0 0 0 14.8 4.1v.1a1.8 1.8 0 0 0 1 1.6v2.7a5.5 5.5 0 0 0-2.8 1.5l-7.4-5.8a2.1 2.1 0 1 0-1.1 1.4l7.2 5.6a5.5 5.5 0 0 0 .1 5.4l-2.1 2.1a1.7 1.7 0 0 0-.5 0 1.7 1.7 0 1 0 1.7 1.7 1.6 1.6 0 0 0 0-.5l2.1-2.1a5.5 5.5 0 1 0 4.5-8.3zm0 8.5a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" fill="#FF7A59"/></svg> },
  { name: 'Shopify', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="#95BF47"><path d="M20.5 4.2c0-.1-.1-.2-.2-.2s-1.7-.1-1.7-.1l-1.3-1.3c-.1-.1-.3-.1-.4-.1l-1.5 18.9 5.9-1.3S20.5 4.3 20.5 4.2z"/><path d="M14 3.1l-.6 1.8s-.7-.3-1.5-.3c-1.2 0-1.3.8-1.3 1 0 1.1 2.8 1.5 2.8 4 0 2-1.3 3.3-3 3.3-2 0-3.1-1.3-3.1-1.3l.6-1.8s1.1.9 2 .9c.6 0 .8-.5.8-.8 0-1.4-2.3-1.5-2.3-3.8 0-2 1.4-3.9 4.2-3.9.9 0 1.4.3 1.4.3V3.1z" fill="#fff"/></svg> },
  { name: 'Stripe', icon: <svg width="18" height="18" viewBox="0 0 24 24"><path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.831 1.617-2.348 1.617-1.924 0-4.963-.89-7.057-2.196L3.38 21.98C5.32 23.233 8.476 24 11.469 24c2.585 0 4.747-.623 6.293-1.783 1.654-1.247 2.497-3.088 2.497-5.467 0-4.123-2.517-5.791-6.283-7.6z" fill="#635BFF"/></svg> },
  { name: 'Linear', icon: <svg width="18" height="18" viewBox="0 0 100 100" fill="none"><path d="M1.22 61.5a48.8 48.8 0 0 0 37.28 37.28L1.22 61.5z" fill="#5E6AD2"/><path d="M.06 50.49A49.94 49.94 0 0 0 49.5 99.94L.06 50.49z" fill="#5E6AD2" opacity=".8"/><path d="M98.76 38.48A48.8 48.8 0 0 0 61.5 1.22l37.26 37.26z" fill="#5E6AD2"/><path d="M99.94 49.5A49.94 49.94 0 0 0 50.5.06L99.94 49.5z" fill="#5E6AD2" opacity=".8"/><path d="M50 13.4a36.6 36.6 0 1 0 0 73.2 36.6 36.6 0 0 0 0-73.2zm0 54.1a17.5 17.5 0 1 1 0-35 17.5 17.5 0 0 1 0 35z" fill="#5E6AD2"/></svg> },
  { name: 'Notion', icon: <svg width="18" height="18" viewBox="0 0 100 100" fill="none"><path d="M6.017 4.313l55.333-4.087c6.797-.583 8.543-.19 12.817 2.917l17.663 12.443c2.913 2.14 3.883 2.723 3.883 5.053v68.243c0 4.277-1.553 6.807-6.99 7.193L24.467 99.967c-4.08.193-6.023-.387-8.16-3.113L3.3 79.94c-2.333-3.113-3.3-5.443-3.3-8.167V11.113c0-3.497 1.553-6.413 6.017-6.8z" fill="#F1F5F9"/><path d="M61.35.227l-55.333 4.087C1.553 4.7 0 7.617 0 11.113v60.66c0 2.723.967 5.053 3.3 8.167l12.993 16.913c2.137 2.727 4.08 3.307 8.16 3.113L88.723 96.08c5.437-.387 6.99-2.917 6.99-7.193V20.64c0-2.21-.87-2.867-3.45-4.733L74.167 3.14C69.893.14 68.147-.47 61.35.227zM25.723 19.353c-5.437.387-6.693.477-9.8-1.947l-7.56-5.833c-.97-.97-.58-2.14 4.467-2.527l51.053-3.887c4.277-.387 6.413.967 8.16 2.333l9.31 6.8c.387.387.967 1.357 0 1.357l-53.1 3.513v.193zm-5.83 73.89V30.607c0-2.527.777-3.693 3.11-3.887l59.21-3.5c2.14-.193 3.11 1.163 3.11 3.693v62.247c0 2.53-.387 4.667-3.887 4.86l-56.68 3.307c-3.5.193-4.863-.97-4.863-3.887zm55.913-59.137c.387 1.747 0 3.5-1.747 3.697l-2.72.58v46.057c-2.333 1.357-4.473 2.14-6.22 2.14-2.917 0-3.693-.967-5.833-3.5l-17.86-28.033v27.063l5.637 1.357s0 3.5-4.863 3.5l-13.38.773c-.387-.773 0-2.72 1.357-3.11l3.5-.967V40.6l-4.86-.387c-.387-1.747.58-4.277 3.3-4.47l14.347-.967 18.63 28.42V37.1l-4.67-.58c-.387-2.14 1.163-3.693 3.11-3.887l13.377-.58z" fill="#0C0C14"/></svg> },
  { name: 'OpenAI', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="#10A37F"><path d="M22.28 9.82a5.99 5.99 0 0 0-.52-4.91 6.05 6.05 0 0 0-6.51-2.9A6.07 6.07 0 0 0 4.98 4.18a6 6 0 0 0-4 2.9 6.05 6.05 0 0 0 .74 7.1 5.98 5.98 0 0 0 .51 4.91 6.05 6.05 0 0 0 6.52 2.9A6 6 0 0 0 13.26 24a6.06 6.06 0 0 0 5.77-4.21 5.99 5.99 0 0 0 4-2.9 6.06 6.06 0 0 0-.75-7.07zM13.26 22.43a4.48 4.48 0 0 1-2.88-1.04l.14-.08 4.78-2.76a.8.8 0 0 0 .39-.68v-6.74l2.02 1.17a.07.07 0 0 1 .04.05v5.58a4.5 4.5 0 0 1-4.49 4.5zm-9.65-4.13a4.48 4.48 0 0 1-.54-3.01l.14.09 4.78 2.76a.78.78 0 0 0 .78 0l5.83-3.37v2.33a.07.07 0 0 1-.03.06l-4.83 2.79a4.5 4.5 0 0 1-6.13-1.65zM2.63 7.92A4.48 4.48 0 0 1 5 6.3v5.7a.78.78 0 0 0 .39.68l5.83 3.37-2.02 1.17a.07.07 0 0 1-.07 0L4.3 14.42a4.5 4.5 0 0 1-1.67-6.5zM19.69 12l-5.83-3.37 2.02-1.17a.07.07 0 0 1 .07 0l4.83 2.79a4.5 4.5 0 0 1-.7 8.1v-5.67a.78.78 0 0 0-.39-.68zM21.73 8.9l-.14-.09-4.78-2.76a.78.78 0 0 0-.78 0L10.2 9.42V7.09a.07.07 0 0 1 .03-.06l4.83-2.79a4.5 4.5 0 0 1 6.67 4.66zM8.98 13.26l-2.02-1.17a.07.07 0 0 1-.04-.05V6.46a4.5 4.5 0 0 1 7.37-3.46l-.14.08-4.78 2.76a.8.8 0 0 0-.39.68v6.74zm1.1-2.37l2.6-1.5 2.6 1.5v3l-2.6 1.5-2.6-1.5v-3z"/></svg> },
  { name: 'Dialogflow', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="#FF9800" opacity=".2"/><path d="M12 2a10 10 0 0 0 0 20 10 10 0 0 0 0-20zm0 3a7 7 0 0 1 7 7h-7V5z" fill="#FF9800"/><circle cx="12" cy="12" r="3" fill="#FF9800"/></svg> },
  { name: 'Google Translate', icon: <GoogleIcon size={18} fill="#4285F4" /> },
  { name: 'Dyte (Video)', icon: <svg width="18" height="18" viewBox="0 0 16 16" fill="#2D8CFF"><path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm-1.5 9.5v-5l4 2.5-4 2.5z"/></svg> },
  { name: 'API & Webhooks', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M13 9h5.5L13 3.5V9M6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2m3 15h2v-3h1a2 2 0 0 0 2-2v-1a2 2 0 0 0-2-2H9v8m2-6h1v1h-1v-1z" fill="#9B7FED"/></svg> },
]

export function IntegrationsCloud() {
  const revealRef = useGsapReveal<HTMLDivElement>()
  const pillsRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (!pillsRef.current) return
    const ctx = gsap.context(() => {
      const pills = pillsRef.current!.querySelectorAll('.int-pill')
      pills.forEach((pill, i) => {
        gsap.fromTo(pill,
          { scale: 0.8, opacity: 0 },
          { scrollTrigger: { trigger: pill, start: 'top 95%', once: true }, scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(1.4)', delay: i * 0.03 }
        )
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <section className="py-[100px] max-md:py-14">
      <Container className="text-center">
        <div ref={revealRef} className="max-w-4xl mx-auto">
          <SectionTag>Integracoes</SectionTag>
          <SectionTitle
            title={<>Conecta com o que <span className="serif-i">voce ja usa</span></>}
            subtitle={<>Funciona com as ferramentas que <span className="highlight-mark">voce ja tem</span>. Sem precisar trocar nada.</>}
          />
        </div>
        <div ref={pillsRef} className="flex flex-wrap justify-center gap-3 mt-10 max-w-4xl mx-auto">
          {integrations.map((int, i) => (
            <div
              key={i}
              className="int-pill group flex items-center gap-2 py-2.5 px-5 bg-white border-2 border-ajax-black/10 text-[.85rem] font-medium text-ajax-black/70 transition-all duration-200 hover:border-[#5E17EB] hover:text-ajax-black hover:shadow-[2px_2px_0_#5E17EB] cursor-default"
            >
              {int.icon} {int.name}
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
