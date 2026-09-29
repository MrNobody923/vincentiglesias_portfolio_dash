import { useEffect, useRef, useState } from 'react'
import { useInView, useCountUp, useNetworkStatus } from '../hooks'

interface AboutProps {
  onShowToast?: (msg: string) => void
}

export default function About({ onShowToast }: AboutProps) {
  const network = useNetworkStatus()
  const { ref: sectionRef, isVisible } = useInView()
  const { ref: statsRef, isVisible: statsVisible } = useInView({ threshold: 0.5 })
  const { ref: headingRef, isVisible: headingVisible } = useInView({ threshold: 0.3 })
  const { ref: infoRef, isVisible: infoVisible } = useInView({ threshold: 0.2 })
  const { ref: text1Ref, isVisible: text1Visible } = useInView({ threshold: 0.2 })
  const { ref: text2Ref, isVisible: text2Visible } = useInView({ threshold: 0.2 })
  const tiltRef = useRef<HTMLDivElement>(null)

  const projectCount = useCountUp(5, statsVisible)
  const stackCount = useCountUp(4, statsVisible)

  // Particles
  const [particles] = useState(() =>
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      size: Math.random() * 6 + 3,
      duration: Math.random() * 10 + 8,
      delay: Math.random() * 8,
      dx: Math.random() * 100 - 50,
      dy: Math.random() * -120 - 40,
      left: Math.random() * 100,
      top: Math.random() * 100,
    }))
  )

  // 3D Tilt
  useEffect(() => {
    const el = tiltRef.current
    if (!el || !window.matchMedia('(pointer: fine)').matches) return
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width
      const y = (e.clientY - rect.top) / rect.height
      const rX = (0.5 - y) * 16
      const rY = (x - 0.5) * 16
      el.style.transform = `perspective(1000px) rotateX(${rX}deg) rotateY(${rY}deg) scale3d(1.03,1.03,1.03)`
    }
    const onLeave = () => { el.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1,1,1)' }
    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => { el.removeEventListener('mousemove', onMove); el.removeEventListener('mouseleave', onLeave) }
  }, [])

  const words = ['Building', 'software', 'that', 'solves']
  const highlightWords = ['real-world', 'problems']

  return (
    <section id="about" className="py-4 sm:py-8 relative bg-transparent">
      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {particles.map(p => (
          <div
            key={p.id}
            className="absolute rounded-full bg-black/[0.06] animate-particle-float"
            style={{
              width: p.size, height: p.size,
              left: `${p.left}%`, top: `${p.top}%`,
              '--duration': `${p.duration}s`,
              '--delay': `${p.delay}s`,
              '--dx': `${p.dx}px`,
              '--dy': `${p.dy}px`,
              animationDelay: `${p.delay}s`,
            } as React.CSSProperties}
          />
        ))}
      </div>

      <div className="max-w-[1200px] mx-auto px-6 relative z-[1]">
        {/* Section Header */}
        <div ref={sectionRef} className={`mb-16 anim-fade-up ${isVisible ? 'anim-visible' : ''}`}>
          <span className="font-heading text-sm font-semibold text-gray-400 tracking-[2px] block mb-3">04</span>
          <h2 className="font-heading text-[clamp(2rem,4vw,3rem)] font-bold text-black -tracking-tight leading-[1.1]">About Me</h2>
          <div className="w-[60px] h-[3px] bg-black mt-5 rounded-sm" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-12 lg:gap-20 items-start">
          {/* Left: Image & Stats */}
          <div className={`anim-fade-right ${isVisible ? 'anim-visible' : ''}`} style={{ perspective: 1000 }}>
            <div
              ref={tiltRef}
              className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-light-gray"
              style={{ transformStyle: 'preserve-3d', transition: 'transform 0.4s ease' }}
            >
              {/* Animated border glow */}
              <div className={`absolute -inset-[3px] rounded-[19px] image-border-glow -z-[1] animate-rotate-border transition-opacity duration-1000 ${
                isVisible ? 'opacity-100' : 'opacity-0'
              }`} />

              <div className="w-full h-full relative overflow-hidden rounded-2xl bg-light-gray">
                <img
                  src="/profile.jpg"
                  alt="Vincent Ivan Iglesias"
                  className="w-full h-full object-cover object-top filter grayscale hover:grayscale-0 transition-all duration-700 transform hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white font-mono text-[10px]">
                  <span>VII // SOFTWARE DEVELOPER</span>
                  <span className={`flex items-center gap-1.5 font-semibold transition-colors duration-500 ${network.color.text}`} title={network.statusLabel}>
                    <span className={`w-1.5 h-1.5 rounded-full ${network.color.dot} ${network.color.glow} ${network.isFluctuating ? 'animate-[ping_0.8s_cubic-bezier(0,0,0.2,1)_infinite]' : 'animate-pulse'}`} />
                    <span>{network.online ? (network.speedMbps !== null ? network.statusShort.toUpperCase() : 'ONLINE') : 'OFFLINE'}</span>
                  </span>
                </div>
              </div>

              <div className="absolute -bottom-5 -right-5 w-[60%] h-[60%] border-2 border-black/[0.06] rounded-2xl -z-[1] animate-deco-float" />

              {/* Corner accents */}
              <div className={`absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-black/40 z-[5] transition-opacity duration-800 delay-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`} />
              <div className={`absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-black/40 z-[5] transition-opacity duration-800 delay-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`} />
            </div>

            {/* Stats Cards */}
            <div ref={statsRef} className="grid grid-cols-2 gap-3 sm:gap-4 mt-6">
              {[
                { num: projectCount, label: 'Projects Built' },
                { num: stackCount, label: 'Core Domains' }
              ].map((s, i) => (
                <div key={i} className={`text-center p-5 bg-white/70 backdrop-blur-2xl border border-black/[0.06] rounded-2xl shadow-sm transition-all duration-600 ${
                  statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                }`} style={{ transitionDelay: `${i * 150}ms` }}>
                  <span className="font-heading text-3xl font-bold text-black tabular-nums">{s.num}</span>
                  <span className="font-heading text-3xl font-bold text-black">+</span>
                  <span className="text-xs text-gray-400 mt-1 block">{s.label}</span>
                </div>
              ))}
            </div>

            {/* Resume & CV Action Cards */}
            <div className="mt-6 space-y-2.5">
              {/* CV Card */}
              <div className="p-3.5 rounded-xl bg-white/80 border border-black/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 shadow-sm">
                <div>
                  <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block">CURRICULUM VITAE (2-PAGE DETAILED)</span>
                  <span className="text-xs font-bold text-black">Vincent_Ivan_Iglesias_CV.pdf</span>
                </div>
                <div className="flex items-center gap-1.5 self-start sm:self-auto">
                  <a
                    href="/cv.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1.5 rounded-lg border border-black/15 text-[11px] font-mono text-charcoal hover:border-black hover:text-black transition-all"
                    title="Preview CV in new tab"
                  >
                    PREVIEW ↗
                  </a>
                  <a
                    href="/cv.pdf"
                    download="Vincent_Ivan_Iglesias_CV.pdf"
                    className="px-3 py-1.5 rounded-lg bg-black text-white text-[11px] font-mono font-semibold hover:bg-charcoal transition-all shadow-sm flex items-center gap-1"
                    title="Download full CV PDF"
                  >
                    <span>CV</span>
                    <span>↓</span>
                  </a>
                </div>
              </div>

              {/* Resume Card */}
              <div className="p-3.5 rounded-xl bg-white/80 border border-black/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 shadow-sm">
                <div>
                  <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block">RESUME (1-PAGE CONCISE)</span>
                  <span className="text-xs font-bold text-black">Vincent_Ivan_Iglesias_Resume.pdf</span>
                </div>
                <div className="flex items-center gap-1.5 self-start sm:self-auto">
                  <a
                    href="/resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1.5 rounded-lg border border-black/15 text-[11px] font-mono text-charcoal hover:border-black hover:text-black transition-all"
                    title="Preview Resume in new tab"
                  >
                    PREVIEW ↗
                  </a>
                  <a
                    href="/resume.pdf"
                    download="Vincent_Ivan_Iglesias_Resume.pdf"
                    className="px-3 py-1.5 rounded-lg bg-black text-white text-[11px] font-mono font-semibold hover:bg-charcoal transition-all shadow-sm flex items-center gap-1"
                    title="Download 1-page Resume PDF"
                  >
                    <span>RESUME</span>
                    <span>↓</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Content */}
          <div className={`anim-fade-left ${isVisible ? 'anim-visible' : ''} space-y-6`}>
            {/* Word-by-word heading */}
            <h3 ref={headingRef} className="font-heading text-[clamp(1.5rem,3vw,2.2rem)] font-bold leading-[1.3] text-black mb-4 -tracking-tight">
              {words.map((w, i) => (
                <span key={i} className={`inline-block mr-2 transition-all duration-600 ${
                  headingVisible ? 'opacity-100 translate-y-0 rotate-x-0' : 'opacity-0 translate-y-[30px]'
                }`} style={{ transitionDelay: `${i * 80}ms`, transitionTimingFunction: 'cubic-bezier(0.34,1.56,0.64,1)' }}>
                  {w}
                </span>
              ))}
              <br />
              <span className="relative inline-block">
                {highlightWords.map((w, i) => (
                  <span key={i} className={`inline-block mr-2 transition-all duration-600 ${
                    headingVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[30px]'
                  }`} style={{ transitionDelay: `${(4 + i) * 80}ms`, transitionTimingFunction: 'cubic-bezier(0.34,1.56,0.64,1)' }}>
                    {w}
                  </span>
                ))}
                <span className={`absolute bottom-0.5 left-0 h-2 bg-black/[0.08] rounded-sm -z-[1] transition-all duration-800 delay-500 ${
                  headingVisible ? 'w-full' : 'w-0'
                }`} style={{ transitionTimingFunction: 'cubic-bezier(0.25,0.46,0.45,0.94)' }} />
              </span>
            </h3>

            <p ref={text1Ref} className={`text-base text-dark-gray leading-[1.8] transition-all duration-700 ${
              text1Visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}>
              I'm Vincent Ivan Iglesias, an Information Technology graduate and Software Developer with a deep focus on full-stack architecture, IoT hardware systems, and cybersecurity. A proactive problem-solver with real-world experience across competitive Capture The Flag (CTF) events and enterprise systems.
            </p>

            <p ref={text2Ref} className={`text-base text-dark-gray leading-[1.8] transition-all duration-700 delay-200 ${
              text2Visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}>
              From engineering all-in-one hotel management platforms with payment webhook concurrency locks to building cashless IoT water vending machines powered by Raspberry Pi and ESP32, I build dependable systems from the metal up to the cloud.
            </p>

            {/* Code Philosophy Banner Card */}
            <div className="p-5 rounded-2xl bg-white border border-black/10 shadow-sm relative overflow-hidden group hover:border-black/30 transition-all">
              <div className="flex items-center justify-between font-mono text-[10px] text-gray-400 uppercase tracking-widest mb-2 border-b border-black/[0.06] pb-2">
                <span>// CODE PHILOSOPHY</span>
                <span className="text-black font-semibold">VINCENT IVAN IGLESIAS</span>
              </div>
              <p className="font-heading text-sm sm:text-base font-medium text-black leading-relaxed italic">
                “Using boolean states, conditionals, and structured execution to turn abstract rules into exact operational outcomes.”
              </p>
            </div>

            {/* GitHub Pulse Card */}
            <a
              href="https://github.com/MrNobody923?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-5 rounded-2xl bg-black text-white shadow-xl hover:-translate-y-1 transition-all group relative overflow-hidden"
            >
              <div className="flex items-center justify-between font-mono text-xs mb-3">
                <div className="flex items-center gap-2">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                  </svg>
                  <span className="font-bold">@MrNobody923</span>
                </div>
                <span className="text-[10px] text-gray-400 group-hover:text-white transition-colors">
                  EXPLORE REPOSITORIES →
                </span>
              </div>

              {/* Simulated Git Heatmap Bar */}
              <div className="flex gap-1 items-center mb-2.5 overflow-hidden">
                {Array.from({ length: 28 }).map((_, i) => (
                  <span
                    key={i}
                    className={`h-4 flex-1 rounded-sm ${
                      i % 7 === 0 ? 'bg-emerald-400' :
                      i % 4 === 0 ? 'bg-emerald-600' :
                      i % 3 === 0 ? 'bg-emerald-800' : 'bg-white/10'
                    }`}
                  />
                ))}
              </div>

              <div className="flex justify-between items-center text-[10px] font-mono text-gray-400">
                <span>SYSTEM STATE: COMMITTING CODE</span>
                <span className="text-emerald-400">● 100% STRICT TYPESAFE</span>
              </div>
            </a>

            {/* Info items */}
            <div ref={infoRef} className="pt-2 flex flex-col gap-3">
              {[
                { label: 'Name', value: 'Vincent Ivan M. Iglesias' },
                { 
                  label: 'Email', 
                  value: 'iglesias.vincentivan.m@gmail.com', 
                  copyable: true 
                },
                { 
                  label: 'Phone', 
                  value: '+63 (994) 7398-295', 
                  copyable: true 
                },
                { label: 'Location', value: 'Lingayen, Pangasinan, Philippines' },
                { label: 'Focus', value: 'Full-Stack · Mobile · IoT · Cybersecurity Enthusiast' },
              ].map((item, i) => (
                <div
                  key={i}
                  onClick={() => {
                    if (item.copyable) {
                      navigator.clipboard.writeText(item.value)
                      onShowToast?.(`Copied to clipboard: ${item.value}`)
                    }
                  }}
                  className={`relative flex flex-col sm:flex-row sm:items-center sm:gap-6 pb-3 transition-all duration-500 ${
                    item.copyable ? 'cursor-pointer hover:bg-black/[0.02] p-1.5 rounded-lg' : ''
                  } ${
                    infoVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-[30px]'
                  }`}
                  style={{ transitionDelay: `${i * 120 + 200}ms`, transitionTimingFunction: 'cubic-bezier(0.34,1.56,0.64,1)' }}
                  title={item.copyable ? 'Click to copy to clipboard' : undefined}
                >
                  <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 min-w-[70px]">{item.label}</span>
                  <span className="text-[0.92rem] sm:text-[0.95rem] text-near-black font-medium flex items-center gap-1.5 break-all sm:break-normal">
                    {item.value}
                    {item.copyable && (
                      <span className="text-[9px] font-mono text-gray-400 bg-black/[0.05] px-1.5 py-0.5 rounded shrink-0">
                        COPY
                      </span>
                    )}
                  </span>
                  <span className={`absolute bottom-0 left-0 h-px bg-black/[0.08] transition-all duration-800 ${
                    infoVisible ? 'w-full' : 'w-0'
                  }`} style={{ transitionDelay: `${i * 120 + 400}ms` }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
