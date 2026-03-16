/**
 * Confetti engine extracted from the original landing page.
 * Creates colorful rectangular confetti pieces and small circular sequins
 * that burst from a given (x, y) point and fall with realistic physics.
 */

interface Vec2 {
  x: number
  y: number
}

interface ConfettiColor {
  front: string
  back: string
}

const DEFAULT_COLORS: ConfettiColor[] = [
  { front: '#9B7FED', back: '#5e17eb' },
  { front: '#9B7FED', back: '#7B4FE0' },
  { front: '#7B4FE0', back: '#4A11C0' },
  { front: '#C2B5F5', back: '#5e17eb' },
]

/* Physics constants */
const GRAVITY_CONFETTO = 0.3
const GRAVITY_SEQUIN = 0.55
const DRAG_CONFETTO = 0.075
const DRAG_SEQUIN = 0.02
const TERMINAL_VELOCITY = 3

/* ---------- helpers ---------- */

function rr(min: number, max: number): number {
  return Math.random() * (max - min) + min
}

function initVelocity(xRange: [number, number], yRange: [number, number]): Vec2 {
  const x = rr(xRange[0], xRange[1])
  const range = yRange[1] - yRange[0] + 1
  let y = yRange[1] - Math.abs(rr(0, range) + rr(0, range) - range)
  if (y >= yRange[1] - 1) {
    y += Math.random() < 0.25 ? rr(1, 3) : 0
  }
  return { x, y: -y }
}

/* ---------- Particle classes ---------- */

class Confetto {
  color: ConfettiColor
  dim: Vec2
  pos: Vec2
  rot: number
  scale: Vec2
  vel: Vec2
  rand: number

  constructor(cx: number, cy: number, colors: ConfettiColor[]) {
    this.color = colors[Math.floor(rr(0, colors.length))]
    this.dim = { x: rr(5, 9), y: rr(8, 15) }
    this.pos = { x: rr(cx - 40, cx + 40), y: rr(cy - 5, cy + 10) }
    this.rot = rr(0, 2 * Math.PI)
    this.scale = { x: 1, y: 1 }
    this.vel = initVelocity([-9, 9], [6, 11])
    this.rand = rr(0, 99)
  }

  update(): void {
    this.vel.x -= this.vel.x * DRAG_CONFETTO
    this.vel.y = Math.min(this.vel.y + GRAVITY_CONFETTO, TERMINAL_VELOCITY)
    this.vel.x += Math.random() > 0.5 ? Math.random() : -Math.random()
    this.pos.x += this.vel.x
    this.pos.y += this.vel.y
    this.scale.y = Math.cos((this.pos.y + this.rand) * 0.09)
  }
}

class Sequin {
  color: string
  r: number
  pos: Vec2
  vel: Vec2

  constructor(cx: number, cy: number, colors: ConfettiColor[]) {
    this.color = colors[Math.floor(rr(0, colors.length))].back
    this.r = rr(1, 2)
    this.pos = { x: rr(cx - 30, cx + 30), y: rr(cy - 5, cy + 10) }
    this.vel = { x: rr(-6, 6), y: rr(-8, -12) }
  }

  update(): void {
    this.vel.x -= this.vel.x * DRAG_SEQUIN
    this.vel.y += GRAVITY_SEQUIN
    this.pos.x += this.vel.x
    this.pos.y += this.vel.y
  }
}

/* ---------- Engine ---------- */

export class ConfettiEngine {
  private canvas: HTMLCanvasElement | null = null
  private ctx: CanvasRenderingContext2D | null = null
  private confetti: Confetto[] = []
  private sequins: Sequin[] = []
  private animating = false
  private colors: ConfettiColor[]
  private rafId: number | null = null

  constructor(colors?: ConfettiColor[]) {
    this.colors = colors ?? DEFAULT_COLORS
    this.handleResize = this.handleResize.bind(this)
    this.render = this.render.bind(this)
  }

  /** Attach the engine to a canvas element and size it to the viewport. */
  init(canvas: HTMLCanvasElement): void {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
    this.resize()
    window.addEventListener('resize', this.handleResize)
  }

  /** Resize the canvas to fill the viewport. Call on window resize. */
  resize(): void {
    if (!this.canvas) return
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
  }

  /** Fire a burst of confetti + sequins from (x, y) in viewport coords. */
  burst(x: number, y: number): void {
    for (let i = 0; i < 20; i++) {
      this.confetti.push(new Confetto(x, y, this.colors))
    }
    for (let j = 0; j < 10; j++) {
      this.sequins.push(new Sequin(x, y, this.colors))
    }
    if (!this.animating) {
      this.animating = true
      this.render()
    }
  }

  /** Stop animation and detach listeners. */
  destroy(): void {
    window.removeEventListener('resize', this.handleResize)
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId)
      this.rafId = null
    }
    this.animating = false
    this.confetti = []
    this.sequins = []
  }

  /* ---- internal ---- */

  private handleResize(): void {
    this.resize()
  }

  private render(): void {
    if (!this.ctx || !this.canvas) return

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

    // Draw confetti pieces
    for (const c of this.confetti) {
      const w = c.dim.x * c.scale.x
      const h = c.dim.y * c.scale.y
      this.ctx.translate(c.pos.x, c.pos.y)
      this.ctx.rotate(c.rot)
      c.update()
      this.ctx.fillStyle = c.scale.y > 0 ? c.color.front : c.color.back
      this.ctx.fillRect(-w / 2, -h / 2, w, h)
      this.ctx.setTransform(1, 0, 0, 1, 0, 0)
    }

    // Draw sequins
    for (const s of this.sequins) {
      this.ctx.translate(s.pos.x, s.pos.y)
      s.update()
      this.ctx.fillStyle = s.color
      this.ctx.beginPath()
      this.ctx.arc(0, 0, s.r, 0, 2 * Math.PI)
      this.ctx.fill()
      this.ctx.setTransform(1, 0, 0, 1, 0, 0)
    }

    // Remove off-screen particles
    this.confetti = this.confetti.filter((c) => c.pos.y < this.canvas!.height)
    this.sequins = this.sequins.filter((s) => s.pos.y < this.canvas!.height)

    if (this.confetti.length || this.sequins.length) {
      this.rafId = requestAnimationFrame(this.render)
    } else {
      this.animating = false
      this.rafId = null
    }
  }
}
