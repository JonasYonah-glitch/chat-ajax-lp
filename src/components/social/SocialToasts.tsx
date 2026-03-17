import { useState, useEffect, useRef, useCallback } from 'react'

const toastData = [
  { name: 'Fernanda', city: 'Sao Paulo', action: 'assinou o plano Pro', img: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop&crop=face' },
  { name: 'Ricardo', city: 'Rio de Janeiro', action: 'assinou o plano Business', img: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop&crop=face' },
  { name: 'Juliana', city: 'Belo Horizonte', action: 'assinou o plano Pro', img: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop&crop=face' },
  { name: 'Marcos', city: 'Curitiba', action: 'assinou o plano Enterprise', img: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop&crop=face' },
  { name: 'Camila', city: 'Fortaleza', action: 'assinou o plano Business', img: 'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop&crop=face' },
  { name: 'Pedro', city: 'Porto Alegre', action: 'assinou o plano Pro', img: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop&crop=face' },
  { name: 'Larissa', city: 'Salvador', action: 'assinou o plano Enterprise', img: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop&crop=face' },
  { name: 'Bruno', city: 'Recife', action: 'assinou o plano Business', img: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop&crop=face' },
]

const timeLabels = ['Agora mesmo', 'Ha 1 min', 'Ha 2 min', 'Ha poucos segundos', 'Agora']

function randBetween(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

interface Toast {
  id: number
  data: typeof toastData[0]
  exit: '' | 'auto' | 'dismiss'
  timeLabel: string
}

export function SocialToasts() {
  const [toasts, setToasts] = useState<Toast[]>([])
  const indexRef = useRef(0)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const removeToast = useCallback((id: number) => {
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, 450)
  }, [])

  const dismissToast = useCallback((id: number) => {
    setToasts(prev => prev.map(t => t.id === id ? { ...t, exit: 'dismiss' } : t))
    removeToast(id)
  }, [removeToast])

  const scheduleNext = useCallback(() => {
    const delay = randBetween(18000, 35000)
    timeoutRef.current = setTimeout(() => {
      const id = Date.now()
      const data = toastData[indexRef.current % toastData.length]
      const timeLabel = timeLabels[randBetween(0, timeLabels.length - 1)]
      indexRef.current += 1

      setToasts(prev => [...prev, { id, data, exit: '', timeLabel }])

      // Auto-dismiss quickly
      const displayTime = randBetween(2500, 4000)
      setTimeout(() => {
        setToasts(prev => prev.map(t => t.id === id && t.exit === '' ? { ...t, exit: 'auto' } : t))
        setTimeout(() => {
          setToasts(prev => prev.filter(t => t.id !== id))
        }, 500)
      }, displayTime)

      scheduleNext()
    }, delay)
  }, [])

  useEffect(() => {
    // First toast after random 8-15s
    const initialDelay = randBetween(8000, 15000)
    timeoutRef.current = setTimeout(() => {
      const id = Date.now()
      const data = toastData[0]
      const timeLabel = timeLabels[randBetween(0, timeLabels.length - 1)]
      indexRef.current = 1

      setToasts([{ id, data, exit: '', timeLabel }])

      const displayTime = randBetween(2500, 4000)
      setTimeout(() => {
        setToasts(prev => prev.map(t => t.id === id && t.exit === '' ? { ...t, exit: 'auto' } : t))
        setTimeout(() => {
          setToasts(prev => prev.filter(t => t.id !== id))
        }, 500)
      }, displayTime)

      scheduleNext()
    }, initialDelay)

    const handleVisibility = () => {
      if (document.hidden && timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      } else if (!document.hidden && !timeoutRef.current) {
        scheduleNext()
      }
    }
    document.addEventListener('visibilitychange', handleVisibility)

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      document.removeEventListener('visibilitychange', handleVisibility)
    }
  }, [scheduleNext])

  return (
    <div className="fixed bottom-6 left-6 z-[900]" aria-live="polite">
      {toasts.map(toast => (
        <div
          key={toast.id}
          onClick={() => dismissToast(toast.id)}
          className={`flex items-center gap-2.5 py-3 px-[18px] rounded-override rounded-xl bg-white card-edge-light shadow-lg max-w-[320px] mb-2 cursor-pointer select-none transition-transform hover:scale-[0.98] ${
            toast.exit === 'dismiss'
              ? 'animate-toast-dismiss'
              : toast.exit === 'auto'
                ? 'animate-toast-out'
                : 'animate-toast-in'
          }`}
        >
          <div className="w-8 h-8 is-rounded overflow-hidden shrink-0" style={{ borderRadius: '9999px' }}>
            <img src={toast.data.img} alt="" width={32} height={32} className="is-rounded w-full h-full object-cover" style={{ borderRadius: '9999px' }} loading="lazy" />
          </div>
          <div className="text-[.78rem] text-ajax-black/60 leading-[1.4]">
            <strong className="text-ajax-black font-semibold">{toast.data.name}</strong> de {toast.data.city} {toast.data.action}
            <div className="text-[.65rem] text-ajax-black/60 mt-0.5">{toast.timeLabel}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
