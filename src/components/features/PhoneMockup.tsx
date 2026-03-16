interface Message {
  type: 'bot' | 'user'
  text: string
  quickButtons?: string[]
}

interface PhoneMockupProps {
  name: string
  avatarGradient: string
  messages: Message[]
}

export function PhoneMockup({ name, avatarGradient, messages }: PhoneMockupProps) {
  return (
    <div className="phone-frame mx-auto" style={{ maxWidth: 280, position: 'relative' }}>
      {/* Side buttons — decorative */}
      <div
        className="absolute"
        style={{
          right: -2,
          top: 100,
          width: 3,
          height: 60,
          background: '#2C2C2E',
          borderRadius: '0 2px 2px 0',
          zIndex: 0,
        }}
        aria-hidden="true"
      />
      <div
        className="absolute"
        style={{
          left: -2,
          top: 80,
          width: 3,
          height: 30,
          background: '#2C2C2E',
          borderRadius: '2px 0 0 2px',
          zIndex: 0,
        }}
        aria-hidden="true"
      />
      <div
        className="absolute"
        style={{
          left: -2,
          top: 120,
          width: 3,
          height: 50,
          background: '#2C2C2E',
          borderRadius: '2px 0 0 2px',
          zIndex: 0,
        }}
        aria-hidden="true"
      />
      <div
        className="absolute"
        style={{
          left: -2,
          top: 180,
          width: 3,
          height: 50,
          background: '#2C2C2E',
          borderRadius: '2px 0 0 2px',
          zIndex: 0,
        }}
        aria-hidden="true"
      />

      {/* iPhone outer shell */}
      <div
        className="relative"
        style={{
          background: '#1C1C1E',
          borderRadius: 40,
          padding: 10,
          boxShadow: '0 25px 50px rgba(0,0,0,0.3)',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Dynamic Island */}
        <div
          className="absolute"
          style={{
            top: 14,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 90,
            height: 28,
            background: '#000',
            borderRadius: 14,
            zIndex: 20,
          }}
          aria-hidden="true"
        />

        {/* Screen bezel */}
        <div
          style={{
            position: 'relative',
            background: 'var(--screen-bg, #fff)',
            borderRadius: 32,
            overflow: 'hidden',
          }}
          className="[--screen-bg:#fff]"
        >
          {/* Status bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px 24px 4px',
              fontSize: 10,
              fontWeight: 700,
            }}
            className="text-[#131313]"
          >
            <span>9:41</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              {/* Signal bars */}
              <svg width="14" height="10" viewBox="0 0 14 10" aria-hidden="true" fill="currentColor">
                <rect x="0" y="6" width="3" height="4" opacity="1" />
                <rect x="4" y="4" width="3" height="6" opacity="1" />
                <rect x="8" y="2" width="3" height="8" opacity="1" />
                <rect x="12" y="0" width="2" height="10" opacity="0.3" />
              </svg>
              {/* WiFi */}
              <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden="true">
                <path d="M7 8.5L7 8.5" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
                <path d="M4.5 6.5C5.16 5.84 6.04 5.5 7 5.5C7.96 5.5 8.84 5.84 9.5 6.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="square" />
                <path d="M2 4C3.49 2.51 5.65 1.5 7 1.5C8.35 1.5 10.51 2.51 12 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="square" />
              </svg>
              {/* Battery */}
              <svg width="18" height="10" viewBox="0 0 18 10" fill="none" aria-hidden="true">
                <rect x="0.5" y="0.5" width="15" height="9" stroke="currentColor" strokeWidth="1" />
                <rect x="16" y="3" width="2" height="4" fill="currentColor" opacity="0.5" />
                <rect x="1.5" y="1.5" width="10" height="7" fill="currentColor" />
              </svg>
            </div>
          </div>

          {/* Chat header */}
          <div
            className="flex items-center gap-2 border-b border-[#5E17EB]/20"
            style={{ padding: '8px 16px 10px', background: 'rgba(0,0,0,0.04)' }}
          >
            <div
              style={{ width: 28, height: 28, background: avatarGradient, flexShrink: 0, borderRadius: 6 }}
            />
            <div
              style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em' }}
              className="text-[#131313]"
            >
              {name}
            </div>
            <div
              style={{
                marginLeft: 'auto',
                width: 8,
                height: 8,
                background: '#34D399',
                borderRadius: 4,
              }}
              aria-hidden="true"
            />
          </div>

          {/* Messages */}
          <div
            style={{
              padding: '12px 12px 16px',
              minHeight: 400,
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
              overflowY: 'auto',
            }}
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  padding: '10px 14px',
                  fontSize: 11,
                  lineHeight: 1.4,
                  maxWidth: '80%',
                  ...(msg.type === 'bot'
                    ? {
                        borderLeft: '3px solid #5E17EB',
                        alignSelf: 'flex-start',
                        borderRadius: 8,
                      }
                    : {
                        background: '#5E17EB',
                        color: '#fff',
                        marginLeft: 'auto',
                        borderRadius: 8,
                      }),
                }}
                className={
                  msg.type === 'bot'
                    ? 'bg-[#F0F0F0] text-[#131313]'
                    : ''
                }
              >
                {msg.text}
                {msg.quickButtons && (
                  <div style={{ display: 'flex', gap: 6, marginTop: 8, flexWrap: 'wrap' }}>
                    {msg.quickButtons.map((btn, j) => (
                      <span
                        key={j}
                        style={{
                          padding: '4px 10px',
                          background: 'rgba(255,255,255,0.12)',
                          color: '#fff',
                          fontSize: 9,
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          letterSpacing: '0.04em',
                          border: '1px solid rgba(255,255,255,0.1)',
                          borderRadius: 4,
                        }}
                      >
                        {btn}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Input bar */}
          <div
            className="border-t border-[#5E17EB]/20"
            style={{
              padding: '10px 16px',
              background: 'rgba(0,0,0,0.04)',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <div
              style={{ flex: 1, height: 28, background: 'rgba(0,0,0,0.08)', borderRadius: 6 }}
            />
            <div
              style={{
                width: 28,
                height: 28,
                background: '#5E17EB',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                borderRadius: 6,
              }}
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="#fff" aria-hidden="true">
                <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
