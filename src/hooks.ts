import { useEffect, useRef, useState, useCallback } from 'react'

export function useInView(options?: IntersectionObserverInit) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setIsVisible(true)
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true)
        observer.unobserve(el)
      }
    }, { threshold: 0.05, ...options })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return { ref, isVisible }
}

export function useCountUp(target: number, trigger: boolean, duration = 1200) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!trigger) return
    let current = 0
    const stepTime = Math.max(Math.floor(duration / target), 80)
    const timer = setInterval(() => {
      current++
      setCount(current)
      if (current >= target) {
        clearInterval(timer)
        setCount(target)
      }
    }, stepTime)
    return () => clearInterval(timer)
  }, [trigger, target, duration])

  return count
}

export function useTextScramble(targetText: string, triggerOnMount = true) {
  const [displayText, setDisplayText] = useState(targetText)
  const [isScrambling, setIsScrambling] = useState(false)
  const chars = '!<>-_\\/[]{}—=+*^?#0101XYZ'

  const scramble = useCallback(() => {
    if (isScrambling) return
    setIsScrambling(true)
    let iteration = 0
    const maxIterations = targetText.length

    const interval = setInterval(() => {
      setDisplayText(
        targetText
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' '
            if (index < iteration) {
              return targetText[index]
            }
            return chars[Math.floor(Math.random() * chars.length)]
          })
          .join('')
      )

      if (iteration >= maxIterations) {
        clearInterval(interval)
        setDisplayText(targetText)
        setIsScrambling(false)
      }
      iteration += 1 / 2
    }, 28)
  }, [targetText, isScrambling])

  useEffect(() => {
    if (triggerOnMount) {
      const timer = setTimeout(scramble, 700)
      return () => clearTimeout(timer)
    }
  }, [triggerOnMount])

  return { displayText, scramble, isScrambling }
}

export * from './hooks/useNetworkStatus'
