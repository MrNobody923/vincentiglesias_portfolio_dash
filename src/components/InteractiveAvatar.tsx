import React, { useRef, useEffect, useState, useCallback } from 'react'

export type AvatarExpression = 'friendly' | 'wink' | 'surprised' | 'happy' | 'focused' | 'sleepy'

interface Props {
  className?: string
  initialExpression?: AvatarExpression
  onExpressionChange?: (expr: AvatarExpression) => void
}

const MESSAGES: Record<AvatarExpression, string[]> = {
  friendly: [
    "👋 Hey! I'm Vincent Ivan. Move your cursor around!",
    "🚀 Welcome to my interactive portfolio!",
    "💡 Architecting scalable digital systems.",
    "👀 My card tilts and looks at your cursor anywhere on screen.",
  ],
  wink: [
    "😉 Nice to meet you! Like what you see?",
    "✨ Crafting UI with micro-interactions & precision.",
    "👌 Click the card to explore more expressions!",
  ],
  surprised: [
    "😮 Whoa! Fast cursor moves!",
    "⚡ That definitely caught my attention!",
    "🔥 Exploring the portfolio at light speed!",
  ],
  happy: [
    "😄 Glad you stopped by! Enjoy exploring!",
    "🎉 Always excited to collaborate on new ideas.",
    "💻 Building high-performance products that delight.",
  ],
  focused: [
    "🎯 Deep Focus Engineering Mode engaged.",
    "🛡️ Full-Stack, IoT & Cybersecurity ready.",
    "🔍 Scanning codebases for optimal architecture.",
  ],
  sleepy: [
    "😴 Zzz... Code compiling in background...",
    "💤 Move your cursor anywhere to wake me up!",
  ],
}

// Lightweight synthesized Web Audio sound effect
function playUiTone(frequency = 520, pitchUp = true) {
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    if (!AudioCtx) return
    const ctx = new AudioCtx()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = 'sine'
    osc.frequency.setValueAtTime(frequency, ctx.currentTime)
    if (pitchUp) {
      osc.frequency.exponentialRampToValueAtTime(frequency * 1.35, ctx.currentTime + 0.08)
    } else {
      osc.frequency.exponentialRampToValueAtTime(frequency * 0.75, ctx.currentTime + 0.08)
    }

    gain.gain.setValueAtTime(0.05, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.09)

    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start()
    osc.stop(ctx.currentTime + 0.1)
  } catch {
    // Ignore if audio is restricted by autoplay policies
  }
}

export default function InteractiveAvatar({ className = '', initialExpression = 'friendly', onExpressionChange }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const glareRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Interactive states
  const [expression, setExpression] = useState<AvatarExpression>(initialExpression)
  const [speechText, setSpeechText] = useState(() => {
    const list = MESSAGES[initialExpression] || MESSAGES.friendly
    return list[0]
  })
  const [speechVisible, setSpeechVisible] = useState(true)
  const [hudFps, setHudFps] = useState(60)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [isLoaded, setIsLoaded] = useState(false)

  // Tracking refs (for smooth 60fps loop with zero React re-render lag)
  const targetLook = useRef({ x: 0, y: 0 })
  const currentLook = useRef({ x: 0, y: 0 })
  const currentCard = useRef({ yaw: 0, pitch: 0, roll: 0 })
  const expressionRef = useRef<AvatarExpression>(initialExpression)
  const prevExpressionRef = useRef<AvatarExpression>(initialExpression)
  const transitionProgressRef = useRef(1.0)
  const transitionStartRef = useRef(0)

  const lastMouseMoveTime = useRef(Date.now())
  const lastMousePos = useRef({ x: 0, y: 0, time: Date.now() })
  const animationFrameId = useRef<number | null>(null)

  // Prebaked offscreen canvases for each expression
  // Perfectly scaled to 473 x 630 showing Vincent's head, collar, and suit jacket shoulders
  const prebakedRef = useRef<Record<string, HTMLCanvasElement>>({})

  // Update expression and notify
  const updateExpression = useCallback((newExpr: AvatarExpression, playAudio = true) => {
    if (newExpr === expressionRef.current) return

    prevExpressionRef.current = expressionRef.current
    expressionRef.current = newExpr
    setExpression(newExpr)

    // Trigger smooth crossfade
    transitionProgressRef.current = 0.0
    transitionStartRef.current = performance.now()

    if (onExpressionChange) onExpressionChange(newExpr)

    const list = MESSAGES[newExpr]
    const randomMsg = list[Math.floor(Math.random() * list.length)]
    setSpeechText(randomMsg)
    setSpeechVisible(true)

    if (playAudio && soundEnabled) {
      if (newExpr === 'wink') playUiTone(740, true)
      else if (newExpr === 'surprised') playUiTone(880, true)
      else if (newExpr === 'focused') playUiTone(360, false)
      else if (newExpr === 'happy') playUiTone(660, true)
      else playUiTone(540, true)
    }
  }, [onExpressionChange, soundEnabled])

  // Preload and pre-render all expression images to 473x630 offscreen canvases
  // Perfectly frames Vincent with head, collar, and suit jacket shoulders matching user photos
  useEffect(() => {
    const imgUrls: Record<string, string> = {
      friendly: '/avatar.png',
      wink: '/avatar_wink.jpg',
      surprised: '/avatar_surprised.jpg',
      happy: '/avatar_happy.jpg',
    }

    let loadedCount = 0
    const total = Object.keys(imgUrls).length

    Object.entries(imgUrls).forEach(([key, url]) => {
      const img = new Image()
      img.src = url
      img.onload = () => {
        const offCanvas = document.createElement('canvas')
        offCanvas.width = 473
        offCanvas.height = 630
        const offCtx = offCanvas.getContext('2d')
        if (offCtx) {
          if (key === 'friendly') {
            // avatar.png (473 x 1024): Draw from sy = 85.5 with sh = 630
            // Aligns eyes (y=280), chin, collar, and displays full suit jacket shoulders
            offCtx.drawImage(img, 0, 85.5, 473, 630, 0, 0, 473, 630)
          } else {
            // JPG expressions (768 x 1376): Draw chunk (0, 50, 768, 1024) -> (0, 0, 473, 630)
            offCtx.drawImage(img, 0, 50, 768, 1024, 0, 0, 473, 630)
          }
          prebakedRef.current[key] = offCanvas
        }

        loadedCount++
        if (loadedCount >= total) {
          setIsLoaded(true)
        }
      }
      img.onerror = () => {
        loadedCount++
        if (loadedCount >= total) {
          setIsLoaded(true)
        }
      }
    })
  }, [])

  // Cursor & Touch Tracking across entire screen
  useEffect(() => {
    const updateTargetFromCoord = (clientX: number, clientY: number) => {
      const now = Date.now()

      lastMouseMoveTime.current = now
      lastMousePos.current = { x: clientX, y: clientY, time: now }

      // Wake up from sleepy if active
      if (expressionRef.current === 'sleepy') {
        updateExpression('friendly', false)
      }

      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      // Center of card in screen viewport coordinates
      const cardCenterX = rect.left + rect.width * 0.50
      const cardCenterY = rect.top + rect.height * 0.50

      const dx = clientX - cardCenterX
      const dy = clientY - cardCenterY

      // Screen-wide normalization: smooth proportional tilt across the whole browser window
      const screenW = window.innerWidth || 1200
      const screenH = window.innerHeight || 800
      const maxDistX = Math.max(cardCenterX, screenW - cardCenterX, 350)
      const maxDistY = Math.max(cardCenterY, screenH - cardCenterY, 350)

      const normX = Math.max(-1, Math.min(1, dx / maxDistX))
      const normY = Math.max(-1, Math.min(1, dy / maxDistY))

      targetLook.current.x = normX
      targetLook.current.y = normY
    }

    const handlePointerMove = (e: PointerEvent) => {
      updateTargetFromCoord(e.clientX, e.clientY)
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        updateTargetFromCoord(e.touches[0].clientX, e.touches[0].clientY)
      }
    }

    // Auto sleepy after 20s of idle
    const idleCheckInterval = setInterval(() => {
      if (Date.now() - lastMouseMoveTime.current > 20000 && expressionRef.current === 'friendly') {
        updateExpression('sleepy', false)
      }
    }, 3000)

    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    window.addEventListener('touchmove', handleTouchMove, { passive: true })

    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('touchmove', handleTouchMove)
      clearInterval(idleCheckInterval)
    }
  }, [updateExpression])

  // Cycle through moods on click
  const cycleExpression = useCallback(() => {
    const moods: AvatarExpression[] = ['friendly', 'wink', 'surprised', 'happy', 'focused']
    const nextIdx = (moods.indexOf(expressionRef.current) + 1) % moods.length
    updateExpression(moods[nextIdx])
  }, [updateExpression])

  // 60FPS 3D Card Look-at & Dynamic Lighting Loop
  useEffect(() => {
    if (!isLoaded) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let frameCount = 0
    let fpsStart = performance.now()

    const render = (now: number) => {
      frameCount++
      if (now - fpsStart >= 1000) {
        setHudFps(Math.round((frameCount * 1000) / (now - fpsStart)))
        frameCount = 0
        fpsStart = now
      }

      // Smooth physics damping for card look-at tracking
      const lookDamping = 0.12
      currentLook.current.x += (targetLook.current.x - currentLook.current.x) * lookDamping
      currentLook.current.y += (targetLook.current.y - currentLook.current.y) * lookDamping

      const cardDamping = 0.08

      // Subtle organic breathing sway (keeps card alive and responsive even when cursor is still)
      const idleSwayYaw = Math.sin(now * 0.0015) * 0.75
      const idleSwayPitch = Math.cos(now * 0.0012) * 0.45
      const idleSwayRoll = Math.sin(now * 0.0014) * 0.30

      // Card 3D Tilt Angles:
      // Yaw (horizontal turn towards cursor): max ~15 deg
      const targetYaw = currentLook.current.x * 15 + idleSwayYaw
      // Pitch (vertical tilt: tilts up when cursor is above, down when cursor is below): max ~11 deg
      const targetPitch = -currentLook.current.y * 11 + idleSwayPitch
      // Roll (subtle organic roll into the turn): max ~2.2 deg
      const targetRoll = currentLook.current.x * 2.2 + idleSwayRoll

      currentCard.current.yaw += (targetYaw - currentCard.current.yaw) * cardDamping
      currentCard.current.pitch += (targetPitch - currentCard.current.pitch) * cardDamping
      currentCard.current.roll += (targetRoll - currentCard.current.roll) * cardDamping

      // Apply 3D Perspective Look-at Transform to the Card Container
      if (containerRef.current) {
        const yaw = currentCard.current.yaw
        const pitch = currentCard.current.pitch
        const roll = currentCard.current.roll
        const transX = currentLook.current.x * 6
        const transY = currentLook.current.y * 5

        containerRef.current.style.transform = `perspective(1000px) rotateX(${pitch.toFixed(2)}deg) rotateY(${yaw.toFixed(2)}deg) rotateZ(${roll.toFixed(2)}deg) translate3d(${transX.toFixed(1)}px, ${transY.toFixed(1)}px, 12px)`

        // Dynamic 3D shadow shifting opposite to the card's tilt direction
        const shadowX = -currentLook.current.x * 28
        const shadowY = 24 - currentLook.current.y * 20
        containerRef.current.style.boxShadow = `${shadowX.toFixed(1)}px ${shadowY.toFixed(1)}px 48px rgba(0, 0, 0, 0.42), 0 12px 28px rgba(0, 0, 0, 0.24)`
      }

      // Dynamic specular glare sheen moving across the card surface with the cursor angle
      if (glareRef.current) {
        const glareX = 50 + currentLook.current.x * 38
        const glareY = 50 + currentLook.current.y * 38
        glareRef.current.style.background = `radial-gradient(circle at ${glareX.toFixed(1)}% ${glareY.toFixed(1)}%, rgba(255, 255, 255, 0.24) 0%, rgba(255, 255, 255, 0.06) 45%, rgba(255, 255, 255, 0) 70%)`
      }

      // Crossfade progress calculation
      if (transitionProgressRef.current < 1.0) {
        const elapsed = now - transitionStartRef.current
        transitionProgressRef.current = Math.min(1.0, elapsed / 280)
      }

      // Render Avatar with Crossfade (Zero pixel distortion, native 4K raytrace clarity)
      const curKey = expressionRef.current === 'focused' || expressionRef.current === 'sleepy'
        ? 'friendly'
        : expressionRef.current

      const prevKey = prevExpressionRef.current === 'focused' || prevExpressionRef.current === 'sleepy'
        ? 'friendly'
        : prevExpressionRef.current

      const curCanvas = prebakedRef.current[curKey] || prebakedRef.current.friendly
      const prevCanvas = prebakedRef.current[prevKey] || curCanvas

      ctx.clearRect(0, 0, 473, 630)

      if (transitionProgressRef.current < 1.0 && prevCanvas && curKey !== prevKey) {
        ctx.globalAlpha = 1.0
        ctx.drawImage(prevCanvas, 0, 0)
        ctx.globalAlpha = transitionProgressRef.current
        ctx.drawImage(curCanvas, 0, 0)
        ctx.globalAlpha = 1.0
      } else if (curCanvas) {
        ctx.drawImage(curCanvas, 0, 0)
      }

      animationFrameId.current = requestAnimationFrame(render)
    }

    animationFrameId.current = requestAnimationFrame(render)

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }
    }
  }, [isLoaded])

  return (
    <div className={`relative select-none ${className}`} style={{ perspective: '1100px' }}>
      {/* Outer Ambient Glow Backdrop */}
      <div className="absolute -inset-2.5 rounded-3xl bg-gradient-to-tr from-orange-500/25 via-emerald-500/10 to-orange-400/20 blur-xl opacity-70 pointer-events-none transition-all duration-500" />

      {/* Floating Interactive Speech Bubble */}
      {speechVisible && (
        <div
          className="absolute -top-16 left-1/2 -translate-x-1/2 z-30 w-max max-w-[290px] sm:max-w-[340px] px-4 py-2.5 bg-black/90 backdrop-blur-md text-white text-xs font-mono rounded-2xl border border-white/20 shadow-2xl transition-all duration-300 animate-fade-in flex items-center gap-2.5 pointer-events-auto cursor-pointer"
          onClick={() => setSpeechVisible(false)}
          title="Click to dismiss"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0 animate-ping" />
          <span className="leading-snug">{speechText}</span>
          <button
            onClick={(e) => { e.stopPropagation(); setSpeechVisible(false); }}
            className="text-white/40 hover:text-white text-xs ml-1 font-bold"
          >
            ✕
          </button>
          {/* Speech bubble tail */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-x-8 border-x-transparent border-t-8 border-t-black/90" />
        </div>
      )}

      {/* 3D Card Looking at the Cursor */}
      <div
        ref={containerRef}
        onClick={cycleExpression}
        className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-neutral-900 border-2 border-black/20 shadow-2xl cursor-pointer group will-change-transform"
        style={{
          transformStyle: 'preserve-3d',
          transformOrigin: 'center center',
          transition: 'box-shadow 0.1s ease-out',
        }}
        title="Click to cycle Vincent's expressions!"
      >
        {/* Loading Spinner */}
        {!isLoaded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-stone-900 text-white gap-3 z-30">
            <div className="w-8 h-8 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />
            <span className="text-[11px] font-mono tracking-widest text-emerald-400">CALIBRATING 3D CARD...</span>
          </div>
        )}

        {/* 60FPS Native Quality Avatar Canvas */}
        <canvas
          ref={canvasRef}
          width={473}
          height={630}
          className="w-full h-full object-cover"
        />

        {/* 3D Specular Glare Sheen Overlay */}
        <div
          ref={glareRef}
          className="absolute inset-0 pointer-events-none z-10 mix-blend-overlay opacity-90 transition-opacity duration-300"
        />

        {/* Focus Mode Tactical Cyber HUD Overlay */}
        {expression === 'focused' && (
          <div className="absolute inset-0 pointer-events-none animate-fade-in z-20" style={{ transform: 'translateZ(18px)' }}>
            {/* Holographic grid scan lines */}
            <div
              className="absolute inset-0 opacity-15"
              style={{
                backgroundImage: 'linear-gradient(rgba(16,185,129,0.3) 1px, transparent 1px)',
                backgroundSize: '100% 4px',
              }}
            />
            {/* Tactical reticle on right lens (centered at 288.5, 366) */}
            <div
              className="absolute top-[44.5%] left-[61.0%] w-12 h-12 -translate-y-1/2 -translate-x-1/2 rounded-full border border-emerald-400/80 animate-spin"
              style={{ animationDuration: '10s' }}
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-2 bg-emerald-400" />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0.5 h-2 bg-emerald-400" />
              <div className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 w-2 bg-emerald-400" />
              <div className="absolute right-0 top-1/2 -translate-y-1/2 h-0.5 w-2 bg-emerald-400" />
            </div>
            {/* Tactical crosshair on left lens (centered at 168.5, 367) */}
            <div className="absolute top-[44.5%] left-[35.6%] w-12 h-12 -translate-y-1/2 -translate-x-1/2 rounded-full border border-emerald-400/50">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              </div>
            </div>
            {/* Top scanning badge */}
            <div className="absolute top-10 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/40 text-[9px] font-mono text-emerald-300 tracking-wider animate-pulse">
              SYS::ANALYTICS_ONLINE
            </div>
          </div>
        )}

        {/* Sleepy Mode Ambient Dimming & Floating Zzz */}
        {expression === 'sleepy' && (
          <div className="absolute inset-0 bg-indigo-950/45 backdrop-blur-[1px] pointer-events-none animate-fade-in z-20 flex flex-col items-center justify-center" style={{ transform: 'translateZ(15px)' }}>
            <div className="text-3xl font-mono text-white/80 animate-bounce">
              💤
            </div>
            <span className="text-[10px] font-mono text-white/70 bg-black/50 px-2 py-0.5 rounded-full mt-2 border border-white/10">
              STANDBY MODE // MOVE CURSOR TO WAKE
            </span>
          </div>
        )}

        {/* Subtle Bottom Fog Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none z-10" />

        {/* Corner HUD Technical Bracket Accents (Floating in 3D Parallax) */}
        <div className="absolute top-3.5 left-3.5 w-4 h-4 border-t-2 border-l-2 border-white/80 pointer-events-none transition-all group-hover:scale-110 z-20" style={{ transform: 'translateZ(16px)' }} />
        <div className="absolute top-3.5 right-3.5 w-4 h-4 border-t-2 border-r-2 border-white/80 pointer-events-none transition-all group-hover:scale-110 z-20" style={{ transform: 'translateZ(16px)' }} />
        <div className="absolute bottom-3.5 left-3.5 w-4 h-4 border-b-2 border-l-2 border-white/80 pointer-events-none transition-all group-hover:scale-110 z-20" style={{ transform: 'translateZ(16px)' }} />
        <div className="absolute bottom-3.5 right-3.5 w-4 h-4 border-b-2 border-r-2 border-white/80 pointer-events-none transition-all group-hover:scale-110 z-20" style={{ transform: 'translateZ(16px)' }} />

        {/* Live HUD Tracking Pill (Top Center, Floating in 3D) */}
        <div className="absolute top-3.5 left-1/2 -translate-x-1/2 z-20 px-2.5 py-0.5 rounded-full bg-black/65 backdrop-blur-sm border border-white/15 text-[9px] font-mono text-emerald-300 flex items-center gap-1.5 pointer-events-none" style={{ transform: 'translateX(-50%) translateZ(20px)' }}>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>3D CARD TRACKING // {hudFps} FPS</span>
        </div>

        {/* Audio Sound Toggle Pill (Top Right, Floating in 3D) */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            setSoundEnabled(prev => !prev)
          }}
          className="absolute top-3 right-3 z-20 p-1.5 rounded-full bg-black/65 hover:bg-black/85 backdrop-blur-sm border border-white/20 text-white/80 hover:text-white text-[10px] transition-all"
          style={{ transform: 'translateZ(22px)' }}
          title={soundEnabled ? 'Mute micro-interaction audio' : 'Enable audio'}
        >
          {soundEnabled ? '🔊' : '🔇'}
        </button>

        {/* Bottom Card HUD Metadata (Floating in 3D) */}
        <div className="absolute bottom-3.5 left-4 right-4 flex items-center justify-between text-white font-mono text-[11px] pointer-events-none z-20" style={{ transform: 'translateZ(18px)' }}>
          <div className="flex flex-col">
            <span className="flex items-center gap-1.5 font-semibold text-xs tracking-tight">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              VINCENT IVAN IGLESIAS
            </span>
            <span className="text-white/60 text-[9px] uppercase tracking-wider">
              FULL-STACK · 3D AVATAR
            </span>
          </div>
          <div className="text-right">
            <span className="text-emerald-400 text-[9px] block uppercase font-bold">
              {expression.toUpperCase()}
            </span>
            <span className="text-white/40 text-[8px]">
              CLICK TO CYCLE
            </span>
          </div>
        </div>

        {/* Subtle click hint indicator on hover */}
        <div className="absolute bottom-11 left-1/2 -translate-x-1/2 pointer-events-none z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0" style={{ transform: 'translateX(-50%) translateZ(24px)' }}>
          <div className="bg-black/85 backdrop-blur-md px-3 py-1 rounded-full text-white text-[10px] font-mono border border-white/20 shadow-xl flex items-center gap-1.5 whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Click card to cycle mood</span>
          </div>
        </div>
      </div>

      {/* Expression Quick-Selector Mood Chips */}
      <div className="flex items-center justify-between gap-1 mt-3 px-0.5">
        {(
          [
            { id: 'friendly', label: '😊 Friendly' },
            { id: 'wink', label: '😉 Wink' },
            { id: 'surprised', label: '😮 Whoa!' },
            { id: 'happy', label: '😄 Smile' },
            { id: 'focused', label: '🎯 Focus' },
          ] as const
        ).map(mood => (
          <button
            key={mood.id}
            onClick={() => updateExpression(mood.id)}
            className={`flex-1 py-1 text-[10px] font-mono rounded-full border text-center transition-all ${
              expression === mood.id
                ? 'bg-black text-white border-black shadow-md scale-[1.03] font-bold'
                : 'bg-white/80 text-neutral-600 border-black/10 hover:border-black/30 hover:bg-white'
            }`}
          >
            {mood.label}
          </button>
        ))}
      </div>

      {/* Wireframe offset shadow accent */}
      <div className="absolute -bottom-3 -right-3 w-full h-full border border-black/10 rounded-2xl -z-10 pointer-events-none hidden sm:block" />
    </div>
  )
}
