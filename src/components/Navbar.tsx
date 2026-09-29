import React, { useState, useEffect } from 'react'

interface NavbarProps {
  onOpenCommandPalette?: () => void
}

const links = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#journey', label: 'Journey' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar({ onOpenCommandPalette }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [timeString, setTimeString] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.pageYOffset > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Live Philippine Time Ticker
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const formatted = now.toLocaleTimeString('en-US', {
        timeZone: 'Asia/Manila',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      })
      setTimeString(formatted)
    }
    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setMenuOpen(false)
    document.body.classList.remove('loading')
    const el = document.querySelector(href)
    if (el) {
      const top = el.getBoundingClientRect().top + window.pageYOffset - 80
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-400 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-[20px] border-b border-black/[0.06] py-3'
          : 'py-5'
      }`}>
        <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between">
          {/* Logo & HUD System Time */}
          <div className="flex items-center gap-4">
            <a href="#hero" onClick={e => handleClick(e, '#hero')} className="font-heading text-xl font-bold text-black tracking-tight">
              <span className="text-gray-400 font-normal">&lt;</span>VII<span className="text-gray-400 font-normal"> /&gt;</span>
            </a>

            {/* Micro HUD Time Ticker (Hidden on very small mobile) */}
            <div className="hidden sm:flex items-center gap-2 pl-4 border-l border-black/10 font-mono text-[11px] text-gray-500">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>MNL</span>
              <span className="text-black font-semibold">{timeString || 'UTC+8'}</span>
            </div>
          </div>

          {/* Desktop Navigation Links & Action Controls */}
          <div className="hidden md:flex items-center gap-7">
            <ul className="flex list-none gap-7">
              {links.map(l => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={e => handleClick(e, l.href)}
                    className="text-xs font-mono uppercase tracking-wider text-dark-gray relative py-1 hover:text-black transition-colors after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-black after:transition-all hover:after:w-full"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-2.5 pl-3 border-l border-black/10">
              {/* GitHub Link */}
              <a
                href="https://github.com/MrNobody923"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center rounded-full border border-black/15 text-charcoal hover:text-white hover:bg-black hover:border-black transition-all"
                title="GitHub: MrNobody923"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                </svg>
              </a>

              {/* CV Link */}
              <a
                href="/cv.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1 rounded-full border border-black/15 text-[11px] font-mono font-semibold text-charcoal hover:bg-black hover:text-white transition-all"
                title="View 2-Page Curriculum Vitae PDF"
              >
                CV ↗
              </a>

              {/* Resume Link */}
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1 rounded-full border border-black/15 text-[11px] font-mono font-semibold text-charcoal hover:bg-black hover:text-white transition-all"
                title="View 1-Page Resume PDF"
              >
                Resume ↓
              </a>

              {/* Command Palette Button */}
              {onOpenCommandPalette && (
                <button
                  onClick={onOpenCommandPalette}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-black/15 hover:border-black bg-off-white/80 text-[11px] font-mono text-charcoal hover:bg-black hover:text-white transition-all shadow-sm"
                  title="Open Command Palette (Ctrl+K or ⌘K)"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                  <span>CMD</span>
                  <kbd className="px-1 py-0.2 text-[9px] bg-black/10 rounded group-hover:bg-white/20">⌘K</kbd>
                </button>
              )}
            </div>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex items-center gap-2 md:hidden">
            {onOpenCommandPalette && (
              <button
                onClick={onOpenCommandPalette}
                className="px-2.5 py-1 rounded-full border border-black/15 text-[11px] font-mono text-black bg-off-white"
                aria-label="Command palette"
              >
                ⌘K
              </button>
            )}

            <button
              onClick={() => { setMenuOpen(!menuOpen); document.body.classList.toggle('loading') }}
              className="flex flex-col gap-[5px] p-2 z-[1001]"
              aria-label="Toggle menu"
            >
              {[0, 1, 2].map(i => (
                <span
                  key={i}
                  className={`w-6 h-0.5 bg-black rounded transition-all duration-400 ${
                    menuOpen && i === 0 ? 'translate-y-[7px] rotate-45' :
                    menuOpen && i === 1 ? 'opacity-0' :
                    menuOpen && i === 2 ? '-translate-y-[7px] -rotate-45' : ''
                  }`}
                />
              ))}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed top-0 w-full h-screen bg-white/[0.98] backdrop-blur-[30px] z-[999] flex flex-col items-center justify-center transition-all duration-500 ${
        menuOpen ? 'right-0' : '-right-full'
      }`}>
        <ul className="list-none text-center space-y-2 mb-6">
          {links.map(l => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={e => handleClick(e, l.href)}
                className="block font-heading text-3xl font-semibold text-black py-2.5 -tracking-tight hover:text-gray-400 transition-colors"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile Extra Links */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-6">
          <a
            href="/cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-full bg-black text-white text-xs font-mono font-semibold"
          >
            Curriculum Vitae [PDF]
          </a>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-full bg-off-white border border-black/20 text-xs font-mono font-semibold text-black"
          >
            Resume (1-Page)
          </a>
          <a
            href="https://github.com/MrNobody923"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-full border border-black/20 text-xs font-mono font-semibold text-black"
          >
            GitHub
          </a>
        </div>

        {/* Mobile Time & Status Badge */}
        <div className="font-mono text-xs text-gray-500 text-center space-y-1">
          <div>LOC: MANILA, PHILIPPINES</div>
          <div className="text-black font-semibold">{timeString}</div>
          <div className="text-[10px] text-emerald-600">● SYSTEM CORE: ONLINE</div>
        </div>
      </div>
    </>
  )
}
