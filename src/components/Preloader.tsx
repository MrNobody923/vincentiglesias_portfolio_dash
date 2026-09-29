import { useState, useEffect } from 'react'

interface Props {
  onComplete: () => void
}

export default function Preloader({ onComplete }: Props) {
  const [count, setCount] = useState(0)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(prev => {
        const next = prev + Math.floor(Math.random() * 3) + 1
        if (next >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setHidden(true)
            onComplete()
          }, 400)
          return 100
        }
        return next
      })
    }, 30)
    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <div className={`fixed inset-0 bg-white flex items-center justify-center z-[10000] transition-all duration-600 ${
      hidden ? 'opacity-0 invisible pointer-events-none' : ''
    }`}>
      <div className="text-center relative">
        <div className="w-[120px] h-[120px] relative mx-auto mb-8">
          {[80, 100, 120].map((size, i) => (
            <span
              key={i}
              className={`absolute top-1/2 left-1/2 border border-black/10 border-t-black rounded-full ${
                i === 0 ? 'animate-orbit' : i === 1 ? 'animate-orbit-reverse' : 'animate-orbit-slow'
              }`}
              style={{
                width: size,
                height: size,
                marginTop: -size / 2,
                marginLeft: -size / 2,
              }}
            />
          ))}
        </div>
        <div className="font-heading text-5xl font-bold text-black flex items-baseline justify-center gap-0.5">
          <span>{count}</span>
          <span className="text-2xl font-medium text-gray-400">%</span>
        </div>
        <p className="text-xs font-medium tracking-[3px] uppercase text-gray-400 mt-3">
          Loading Experience
        </p>
      </div>
    </div>
  )
}
