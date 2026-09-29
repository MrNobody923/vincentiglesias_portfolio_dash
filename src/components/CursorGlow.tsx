import { useEffect, useRef } from 'react'

export default function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    const el = ref.current
    if (!el) return

    let mouseX = 0, mouseY = 0
    let glowX = 0, glowY = 0

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      el.classList.add('opacity-100')
    }
    const onLeave = () => el.classList.remove('opacity-100')

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onLeave)

    let raf: number
    const update = () => {
      glowX += (mouseX - glowX) * 0.1
      glowY += (mouseY - glowY) * 0.1
      el.style.left = glowX + 'px'
      el.style.top = glowY + 'px'
      raf = requestAnimationFrame(update)
    }
    update()

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div
      ref={ref}
      className="fixed w-[300px] h-[300px] rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 z-[9] opacity-0 transition-opacity duration-300 hidden md:block"
      style={{ background: 'radial-gradient(circle, rgba(0,0,0,0.03) 0%, transparent 70%)' }}
    />
  )
}
