import { useState, useEffect, useCallback, useRef } from 'react'

export type NetworkQuality = 'fast' | 'moderate' | 'slow'

export interface NetworkStatus {
  online: boolean
  speedMbps: number | null
  rtt: number | null
  jitter: number | null
  quality: NetworkQuality
  isFluctuating: boolean
  statusLabel: string
  statusShort: string
  color: {
    dot: string
    ping: string
    glow: string
    text: string
    badgeBg: string
    badgeBorder: string
    pingDurationClass: string
  }
  refetch: () => void
}

const COLOR_MAP = {
  fast: {
    dot: 'bg-emerald-500',
    ping: 'bg-emerald-400',
    glow: 'shadow-[0_0_12px_rgba(16,185,129,0.8)]',
    text: 'text-emerald-600',
    badgeBg: 'bg-emerald-50 text-emerald-700',
    badgeBorder: 'border-emerald-500/20',
    pingDurationClass: 'duration-2000',
  },
  moderate: {
    dot: 'bg-amber-500',
    ping: 'bg-amber-400',
    glow: 'shadow-[0_0_12px_rgba(245,158,11,0.8)]',
    text: 'text-amber-600',
    badgeBg: 'bg-amber-50 text-amber-700',
    badgeBorder: 'border-amber-500/20',
    pingDurationClass: 'duration-1500',
  },
  slow: {
    dot: 'bg-rose-500',
    ping: 'bg-rose-400',
    glow: 'shadow-[0_0_12px_rgba(244,63,94,0.9)]',
    text: 'text-rose-600',
    badgeBg: 'bg-rose-50 text-rose-700',
    badgeBorder: 'border-rose-500/20',
    pingDurationClass: 'duration-700',
  },
}

interface NetworkInformation extends EventTarget {
  downlink?: number
  rtt?: number
  effectiveType?: 'slow-2g' | '2g' | '3g' | '4g'
  saveData?: boolean
  addEventListener(type: string, listener: EventListenerOrEventListenerObject): void
  removeEventListener(type: string, listener: EventListenerOrEventListenerObject): void
}

function getNavigatorConnection(): NetworkInformation | undefined {
  if (typeof navigator === 'undefined') return undefined
  const nav = navigator as unknown as {
    connection?: NetworkInformation
    mozConnection?: NetworkInformation
    webkitConnection?: NetworkInformation
  }
  return nav.connection || nav.mozConnection || nav.webkitConnection
}

export function useNetworkStatus(): NetworkStatus {
  const [online, setOnline] = useState<boolean>(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  )
  const [speedMbps, setSpeedMbps] = useState<number | null>(null)
  const [rtt, setRtt] = useState<number | null>(null)
  const [jitter, setJitter] = useState<number | null>(null)
  const [isFluctuating, setIsFluctuating] = useState<boolean>(false)
  const [quality, setQuality] = useState<NetworkQuality>('fast')

  const isTestingRef = useRef(false)
  const lastLatenciesRef = useRef<number[]>([])

  // Evaluate state based on user's exact specification:
  // - Green: stable or fast (>= 20 Mbps)
  // - Orange: below 20 Mbps (and >= 5 Mbps)
  // - Red: fluctuating and below 5 Mbps (or offline)
  const evaluateQuality = useCallback(
    (isOnline: boolean, speed: number | null, fluctuating: boolean) => {
      if (!isOnline) {
        setQuality('slow')
        return
      }

      if (fluctuating) {
        setQuality('slow')
        return
      }

      if (speed !== null) {
        if (speed >= 20) {
          setQuality('fast')
        } else if (speed >= 5) {
          setQuality('moderate')
        } else {
          setQuality('slow')
        }
      } else {
        // Fallback to navigator connection downlink if speed test hasn't run yet
        const navConn = getNavigatorConnection()
        if (navConn?.effectiveType === 'slow-2g' || navConn?.effectiveType === '2g') {
          setQuality('slow')
        } else if (navConn?.downlink !== undefined) {
          if (navConn.downlink >= 20) {
            setQuality('fast')
          } else if (navConn.downlink >= 5) {
            setQuality('moderate')
          } else {
            setQuality('slow')
          }
        } else {
          setQuality('fast')
        }
      }
    },
    []
  )

  const measureNetwork = useCallback(async () => {
    if (typeof window === 'undefined') return
    if (!navigator.onLine) {
      setOnline(false)
      setSpeedMbps(0)
      setIsFluctuating(false)
      evaluateQuality(false, 0, false)
      return
    }

    if (isTestingRef.current) return
    isTestingRef.current = true

    try {
      // 1. Latency & Jitter Probe
      const pingUrl = `https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/package.json?_c=${Date.now()}`
      const pStart1 = performance.now()
      const pingRes1 = await fetch(pingUrl, { method: 'HEAD', cache: 'no-store' })
      const pEnd1 = performance.now()
      const lat1 = Math.round(pEnd1 - pStart1)

      let lat2 = lat1
      let currentJitter = 0

      if (pingRes1.ok) {
        const pStart2 = performance.now()
        await fetch(`https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/package.json?_c=${Date.now() + 1}`, {
          method: 'HEAD',
          cache: 'no-store',
        })
        const pEnd2 = performance.now()
        lat2 = Math.round(pEnd2 - pStart2)
        currentJitter = Math.abs(lat2 - lat1)
      }

      setRtt(lat1)
      setJitter(currentJitter)

      // Keep recent latency history to detect jitter / fluctuation over time
      lastLatenciesRef.current.push(lat1)
      if (lastLatenciesRef.current.length > 5) {
        lastLatenciesRef.current.shift()
      }

      // Check if latency is fluctuating:
      // High jitter (> 120ms) or latency swing or extremely high RTT (> 450ms)
      const isJittery =
        currentJitter > 120 ||
        (lastLatenciesRef.current.length >= 3 &&
          Math.max(...lastLatenciesRef.current) - Math.min(...lastLatenciesRef.current) > 150) ||
        lat1 > 450

      setIsFluctuating(isJittery)

      // 2. Throughput Download Probe (~232 KB)
      const downloadUrl = `https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css?_c=${Date.now()}`
      const t0 = performance.now()
      const downloadRes = await fetch(downloadUrl, { cache: 'no-store' })
      const tHeader = performance.now()
      const buffer = await downloadRes.arrayBuffer()
      const tEnd = performance.now()

      // Calculate data streaming transfer time (excluding initial latency / TTFB)
      const transferSec = Math.max((tEnd - tHeader) / 1000, 0.006)
      const bytes = buffer.byteLength
      const measuredMbps = Number(((bytes * 8) / (transferSec * 1024 * 1024)).toFixed(1))

      setOnline(true)
      setSpeedMbps(measuredMbps)
      evaluateQuality(true, measuredMbps, isJittery)
    } catch {
      // If external probe fails (firewall, adblocker, or network loss)
      const navConn = getNavigatorConnection()
      const isOnline = navigator.onLine

      if (!isOnline) {
        setOnline(false)
        setSpeedMbps(0)
        setIsFluctuating(false)
        evaluateQuality(false, 0, false)
      } else if (navConn?.downlink !== undefined) {
        // Fallback to navigator connection downlink
        const mbps = navConn.downlink
        const fluctuating = (navConn.rtt ?? 0) > 350
        setSpeedMbps(mbps)
        setRtt(navConn.rtt ?? null)
        setIsFluctuating(fluctuating)
        evaluateQuality(true, mbps, fluctuating)
      } else {
        // Fallback to local probe
        try {
          const localStart = performance.now()
          const localRes = await fetch(`/profile.jpg?_c=${Date.now()}`, { cache: 'no-store' })
          const localBuf = await localRes.arrayBuffer()
          const localEnd = performance.now()
          const localSec = Math.max((localEnd - localStart) / 1000, 0.005)
          const localMbps = Number(((localBuf.byteLength * 8) / (localSec * 1024 * 1024)).toFixed(1))
          setOnline(true)
          setSpeedMbps(localMbps)
          setIsFluctuating(false)
          evaluateQuality(true, localMbps, false)
        } catch {
          setOnline(false)
          setSpeedMbps(0)
          setIsFluctuating(true)
          evaluateQuality(false, 0, true)
        }
      }
    } finally {
      isTestingRef.current = false
    }
  }, [evaluateQuality])

  useEffect(() => {
    // Initial measurement
    measureNetwork()

    const handleOnline = () => {
      setOnline(true)
      measureNetwork()
    }
    const handleOffline = () => {
      setOnline(false)
      setSpeedMbps(0)
      setIsFluctuating(false)
      evaluateQuality(false, 0, false)
    }

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    window.addEventListener('focus', measureNetwork)

    const navConn = getNavigatorConnection()
    const handleConnChange = () => {
      measureNetwork()
    }

    if (navConn?.addEventListener) {
      navConn.addEventListener('change', handleConnChange)
    }

    // Periodic check every 18 seconds
    const interval = setInterval(() => {
      measureNetwork()
    }, 18000)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
      window.removeEventListener('focus', measureNetwork)
      if (navConn?.removeEventListener) {
        navConn.removeEventListener('change', handleConnChange)
      }
      clearInterval(interval)
    }
  }, [measureNetwork, evaluateQuality])

  // Build human-friendly status labels
  let statusLabel = 'Fast & Stable (≥ 20 Mbps)'
  let statusShort = 'Stable'

  if (!online) {
    statusLabel = 'Offline · Disconnected'
    statusShort = 'Offline'
  } else if (isFluctuating) {
    statusLabel = `Fluctuating Network ${rtt ? `(${rtt}ms)` : ''}`
    statusShort = 'Fluctuating'
  } else if (speedMbps !== null) {
    if (speedMbps >= 20) {
      statusLabel = `Fast & Stable (${speedMbps} Mbps)`
      statusShort = `${Math.round(speedMbps)} Mbps · Fast`
    } else if (speedMbps >= 5) {
      statusLabel = `Moderate Connection (${speedMbps} Mbps)`
      statusShort = `${Math.round(speedMbps)} Mbps · Moderate`
    } else {
      statusLabel = `Slow Connection (${speedMbps} Mbps)`
      statusShort = `${speedMbps} Mbps · Slow`
    }
  }

  return {
    online,
    speedMbps,
    rtt,
    jitter,
    quality,
    isFluctuating,
    statusLabel,
    statusShort,
    color: COLOR_MAP[quality],
    refetch: measureNetwork,
  }
}
