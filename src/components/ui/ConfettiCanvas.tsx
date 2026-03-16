import { useRef, useEffect, useImperativeHandle, forwardRef } from 'react'
import { ConfettiEngine } from '../../lib/confetti'

export interface ConfettiCanvasHandle {
  burst: (x: number, y: number) => void
}

export const ConfettiCanvas = forwardRef<ConfettiCanvasHandle>((_props, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const engineRef = useRef<ConfettiEngine | null>(null)

  useEffect(() => {
    if (!canvasRef.current) return
    const engine = new ConfettiEngine()
    engine.init(canvasRef.current)
    engineRef.current = engine
    return () => engine.destroy()
  }, [])

  useImperativeHandle(ref, () => ({
    burst: (x: number, y: number) => {
      engineRef.current?.burst(x, y)
    },
  }))

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-screen pointer-events-none z-[9999]"
    />
  )
})
