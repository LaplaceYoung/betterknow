import { useEffect, useRef } from 'react'

/**
 * [D1] 首页 Hero 背景「Dot field, cursor light」
 * 具备阻尼平滑跟随（Lerp Inertia）、柔和径向辉光光晕（Ambient Halo）、
 * 微波呼吸漂移（Organic Wave Drift）与视网膜高分屏自适应。
 */
export function DotField({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    let raf = 0
    let w = 0, h = 0
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    // 鼠标物理阻尼系统
    const target = { x: -9999, y: -9999, active: false }
    const current = { x: -9999, y: -9999 }
    let intensity = 0

    const resize = () => {
      const parentRect = canvas.parentElement?.getBoundingClientRect()
      w = Math.max(parentRect?.width ?? window.innerWidth, 320)
      h = Math.max(parentRect?.height ?? window.innerHeight, 320)
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect()
      target.x = e.clientX - r.left
      target.y = e.clientY - r.top
      target.active = true
      if (current.x < -1000) {
        current.x = target.x
        current.y = target.y
      }
    }

    const onLeave = () => {
      target.active = false
    }

    const parent = canvas.parentElement ?? canvas
    parent.addEventListener('pointermove', onMove, { passive: true })
    parent.addEventListener('pointerleave', onLeave, { passive: true })
    window.addEventListener('resize', resize, { passive: true })

    const gap = 24
    const start = performance.now()
    const GLOW_RADIUS = 180

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h)
      const time = (t - start) / 1000

      // 平滑插值 (Lerp) 阻尼计算
      if (target.active) {
        current.x += (target.x - current.x) * 0.12
        current.y += (target.y - current.y) * 0.12
        intensity += (1 - intensity) * 0.08
      } else {
        intensity += (0 - intensity) * 0.05
      }

      // 绘制背景柔和径向辉光 (Radial Halo)
      if (intensity > 0.01 && current.x > -500) {
        const halo = ctx.createRadialGradient(current.x, current.y, 10, current.x, current.y, GLOW_RADIUS)
        halo.addColorStop(0, `rgba(220, 226, 238, ${(0.32 * intensity).toFixed(3)})`)
        halo.addColorStop(0.5, `rgba(235, 240, 248, ${(0.14 * intensity).toFixed(3)})`)
        halo.addColorStop(1, 'rgba(255, 255, 255, 0)')
        ctx.fillStyle = halo
        ctx.beginPath()
        ctx.arc(current.x, current.y, GLOW_RADIUS, 0, Math.PI * 2)
        ctx.fill()
      }

      // 绘制点阵网格
      for (let y = gap / 2; y < h; y += gap) {
        for (let x = gap / 2; x < w; x += gap) {
          // 微波呼吸飘移 (Subtle Ambient Drift)
          const waveX = Math.sin(time * 0.7 + x * 0.018 + y * 0.012) * 1.4
          const waveY = Math.cos(time * 0.55 + x * 0.014 + y * 0.02) * 1.4
          const dx = x + waveX
          const dy = y + waveY

          // 距离光标物理计算
          let glow = 0
          if (intensity > 0.01) {
            const dist = Math.hypot(current.x - dx, current.y - dy)
            if (dist < GLOW_RADIUS) {
              const norm = 1 - dist / GLOW_RADIUS
              glow = Math.pow(norm, 1.8) * intensity
            }
          }

          // 点大小与透明度渐变
          const radius = 1.05 + glow * 1.75
          const alpha = 0.07 + glow * 0.65

          ctx.beginPath()
          ctx.arc(dx, dy, radius, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(20, 22, 28, ${alpha.toFixed(3)})`
          ctx.fill()
        }
      }

      raf = requestAnimationFrame(draw)
    }

    raf = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(raf)
      parent.removeEventListener('pointermove', onMove)
      parent.removeEventListener('pointerleave', onLeave)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={ref}
      className={className}
      aria-hidden
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  )
}
