import React, { useState, useEffect } from 'react'
import { useNetworkStatus } from '../hooks'
import VerifiedBadge from './VerifiedBadge'

interface SidebarProps {
  activeSection: string
  onNavigate: (sectionId: string) => void
  onOpenCommandPalette?: () => void
  onShowToast?: (msg: string) => void
}

const navItems = [
  {
    id: 'home',
    label: 'Home',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
  },
  {
    id: 'projects',
    label: 'Projects',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"/>
      </svg>
    ),
  },
  {
    id: 'services',
    label: 'Services',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 2 7 12 12 22 7 12 2"/>
        <polyline points="2 17 12 22 22 17"/>
        <polyline points="2 12 12 17 22 12"/>
      </svg>
    ),
  },
  {
    id: 'journey',
    label: 'Journey',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
  },
  {
    id: 'about',
    label: 'About',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
      </svg>
    ),
  },
  {
    id: 'contact',
    label: 'Contact',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 16v-4"/>
        <path d="M12 8h.01"/>
      </svg>
    ),
  },
]

export default function Sidebar({
  activeSection,
  onNavigate,
  onOpenCommandPalette,
  onShowToast,
}: SidebarProps) {
  const network = useNetworkStatus()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [timeString, setTimeString] = useState('')

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const formatted = now.toLocaleTimeString('en-US', {
        timeZone: 'Asia/Manila',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      })
      setTimeString(formatted)
    }
    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  const handleNavClick = (id: string) => {
    onNavigate(id)
    setMobileMenuOpen(false)
  }

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('iglesias.vincentivan.m@gmail.com')
    onShowToast?.('Email copied to clipboard: iglesias.vincentivan.m@gmail.com')
  }

  return (
    <>
      {/* Mobile Top Header */}
      <header className="lg:hidden sticky top-0 z-40 bg-white/80 backdrop-blur-2xl border-b border-black/[0.05] px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-9 h-9 rounded-full overflow-hidden p-[2px] bg-gradient-to-tr from-black/5 via-black/10 to-black/5 shrink-0">
              <div className="w-full h-full rounded-full bg-white p-[1px]">
                <img src="/profile.jpg" alt="Vincent Ivan Iglesias" className="w-full h-full rounded-full object-cover object-top" />
              </div>
            </div>
            {/* Mobile Network Status Dot */}
            <div
              className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full ${network.color.dot} border-2 border-white flex items-center justify-center ${network.color.glow} transition-colors duration-500`}
              title={`Network: ${network.statusLabel}`}
            >
              <div
                className={`w-1.5 h-1.5 rounded-full ${network.color.ping} ${
                  network.isFluctuating
                    ? 'animate-[ping_0.8s_cubic-bezier(0,0,0.2,1)_infinite]'
                    : 'animate-ping'
                } opacity-75`}
              />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5 font-heading text-sm font-bold text-black leading-tight">
              <span>Vincent Ivan</span>
              <VerifiedBadge className="w-3.5 h-3.5" />
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] text-gray-500">@MrNobody923</span>
              <span className="text-[10px] text-gray-300">•</span>
              <span className={`font-mono text-[9px] font-semibold ${network.color.text}`}>
                {network.statusShort}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {onOpenCommandPalette && (
            <button
              onClick={onOpenCommandPalette}
              className="p-2 rounded-lg border border-black/5 bg-black/[0.02] text-xs font-mono text-gray-600 hover:bg-black hover:text-white transition-all shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]"
              title="Command Palette (⌘K)"
            >
              ⌘K
            </button>
          )}

          <button
            onClick={() => setMobileMenuOpen(prev => !prev)}
            className="p-2 rounded-lg border border-black/5 bg-white text-black shadow-sm"
            aria-label="Toggle navigation menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {mobileMenuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </>
              ) : (
                <>
                  <line x1="3" y1="12" x2="21" y2="12"/>
                  <line x1="3" y1="6" x2="21" y2="6"/>
                  <line x1="3" y1="18" x2="21" y2="18"/>
                </>
              )}
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/20 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Left Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-30 w-[270px] bg-white/80 backdrop-blur-2xl border-r border-black/[0.04] flex flex-col justify-between py-6 px-5 transition-transform duration-300 ease-out lg:translate-x-0 ${
          mobileMenuOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full lg:translate-x-0'
        } overflow-y-auto`}
        style={{ scrollbarWidth: 'none' }}
      >
        {/* Faint left-edge gradient highlight */}
        <div className="absolute inset-y-0 left-0 w-[1px] bg-gradient-to-b from-transparent via-white to-transparent opacity-50 pointer-events-none" />

        <div className="relative z-10">
          {/* Profile Header Block */}
          <div className="flex flex-col items-center text-center pt-1 pb-5">
            {/* Avatar with premium double-ring & glow */}
            <div className="relative mb-4 group cursor-pointer" onClick={() => handleNavClick('about')} title="Click to view About">
              <div className="w-[88px] h-[88px] rounded-full p-[3px] bg-gradient-to-tr from-black/[0.04] via-black/[0.12] to-black/[0.04] group-hover:shadow-[0_0_20px_rgba(255,107,43,0.15)] transition-all duration-500">
                <div className="w-full h-full rounded-full bg-white p-[2px]">
                  <img
                    src="/profile.jpg"
                    alt="Vincent Ivan Iglesias"
                    className="w-full h-full rounded-full object-cover object-top filter grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                </div>
              </div>

              {/* Live Internet-Reactive Status Dot */}
              <div
                className="absolute bottom-0.5 right-0.5 group/netstatus"
                onClick={(e) => {
                  e.stopPropagation()
                  network.refetch()
                }}
              >
                <div
                  className={`relative w-4 h-4 rounded-full ${network.color.dot} border-2 border-white flex items-center justify-center cursor-pointer transition-colors duration-500 ${network.color.glow}`}
                  title={`Internet Connection: ${network.statusLabel} (Click to re-test)`}
                >
                  <div
                    className={`w-2 h-2 rounded-full ${network.color.ping} ${
                      network.isFluctuating
                        ? 'animate-[ping_0.8s_cubic-bezier(0,0,0.2,1)_infinite]'
                        : 'animate-ping'
                    } opacity-75`}
                  />
                </div>

                {/* Sleek Network HUD Tooltip on Hover */}
                <div className="absolute left-6 bottom-0 z-50 pointer-events-none opacity-0 group-hover/netstatus:opacity-100 transition-all duration-200 translate-x-1 group-hover/netstatus:translate-x-0 w-max">
                  <div className="bg-black/90 backdrop-blur-md text-white px-3 py-2 rounded-xl text-left shadow-2xl border border-white/10 font-mono text-[10px] space-y-1">
                    <div className="flex items-center gap-1.5 font-bold uppercase tracking-wider">
                      <span className={`w-2 h-2 rounded-full ${network.color.dot}`} />
                      <span>{network.statusLabel}</span>
                    </div>
                    <div className="text-gray-300 flex items-center gap-2">
                      <span>Speed: {network.speedMbps !== null ? `${network.speedMbps} Mbps` : 'Checking...'}</span>
                      {network.rtt !== null && <span>• Ping: {network.rtt}ms</span>}
                    </div>
                    <div className="text-[9px] text-gray-400 border-t border-white/10 pt-1 flex items-center justify-between gap-3">
                      <span>Thresholds: ≥20M green, &lt;20M orange, &lt;5M red</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Name + Facebook Verified Badge */}
            <h2 className="font-heading text-base font-bold text-black flex items-center justify-center gap-1.5 leading-tight">
              <span>Vincent Ivan</span>
              <VerifiedBadge className="w-4 h-4" />
            </h2>

            {/* Handle */}
            <a
              href="https://github.com/MrNobody923"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[11px] text-gray-500 hover:text-black transition-colors mt-1"
            >
              @MrNobody923
            </a>

            {/* Social Icons Row */}
            <div className="flex items-center gap-2 mt-5">
              {/* Facebook */}
              <a
                href="https://web.facebook.com/0xviiglesias"
                target="_blank"
                rel="noopener noreferrer"
                className="w-[34px] h-[34px] rounded-full border border-black/[0.06] bg-white flex items-center justify-center text-gray-500 hover:text-[#ff6b2b] hover:border-black/10 hover:shadow-[inset_0_2px_4px_rgba(0,0,0,0.04)] transition-all duration-300"
                title="Facebook: @0xviiglesias"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>

              {/* GitHub */}
              <a
                href="https://github.com/MrNobody923"
                target="_blank"
                rel="noopener noreferrer"
                className="w-[34px] h-[34px] rounded-full border border-black/[0.06] bg-white flex items-center justify-center text-gray-500 hover:text-black hover:border-black/10 hover:shadow-[inset_0_2px_4px_rgba(0,0,0,0.04)] transition-all duration-300"
                title="GitHub: MrNobody923"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                </svg>
              </a>

              {/* Email */}
              <button
                onClick={handleCopyEmail}
                className="w-[34px] h-[34px] rounded-full border border-black/[0.06] bg-white flex items-center justify-center text-gray-500 hover:text-[#ff6b2b] hover:border-black/10 hover:shadow-[inset_0_2px_4px_rgba(0,0,0,0.04)] transition-all duration-300"
                title="Copy Email"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                </svg>
              </button>

              {/* Command Palette Trigger */}
              {onOpenCommandPalette && (
                <button
                  onClick={onOpenCommandPalette}
                  className="w-[34px] h-[34px] rounded-full border border-black/[0.06] bg-white flex items-center justify-center text-gray-500 hover:text-black hover:border-black/10 hover:shadow-[inset_0_2px_4px_rgba(0,0,0,0.04)] transition-all duration-300"
                  title="Open Command Palette (⌘K)"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Gradient Separator */}
          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-black/[0.08] to-transparent my-2" />

          {/* Navigation Menu */}
          <nav className="mt-4">
            <ul className="space-y-1 list-none">
              {navItems.map(item => {
                const isActive = activeSection === item.id
                return (
                  <li key={item.id} className="relative">
                    {/* Left accent bar */}
                    {isActive && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-4 bg-[#ff6b2b] rounded-r-full shadow-[0_0_8px_rgba(255,107,43,0.4)]" />
                    )}
                    <button
                      onClick={() => handleNavClick(item.id)}
                      className={`relative w-full flex items-center gap-3 py-2.5 rounded-xl text-[13px] font-semibold tracking-wide transition-all duration-300 ${
                        isActive
                          ? 'pl-5 pr-4 bg-gradient-to-r from-black/[0.04] to-transparent text-black'
                          : 'px-4 text-gray-500 hover:text-black hover:bg-white hover:-translate-y-[1px] hover:shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-transparent hover:border-black/[0.04]'
                      }`}
                    >
                      <span className={`${isActive ? 'text-[#ff6b2b]' : 'text-gray-400 group-hover:text-black'} transition-colors duration-300`}>
                        {item.icon}
                      </span>
                      <span>{item.label}</span>
                    </button>
                  </li>
                )
              })}
            </ul>
          </nav>
        </div>

        {/* Sidebar Bottom Footer Info */}
        <div className="mt-auto pt-6 relative z-10">
          {/* Gradient Separator */}
          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-black/[0.08] to-transparent mb-5" />

          {/* Subtle Status Card */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-b from-white/60 to-white/30 backdrop-blur-md border border-black/[0.06] shadow-[inset_0_1px_0_rgba(255,255,255,1)]">
            <div className="flex items-center justify-between mb-2">
              <span className="flex items-center gap-1.5 font-mono text-[10px] text-gray-600 font-medium">
                <span className="relative flex h-1.5 w-1.5">
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${network.color.ping} opacity-75`} />
                  <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${network.color.dot}`} />
                </span>
                MNL {timeString}
              </span>
              <span className={`font-mono text-[9px] font-semibold ${network.color.text}`} title={network.statusLabel}>
                {network.statusShort}
              </span>
            </div>

            <div className="flex items-center gap-2.5 mt-3">
              <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-gray-900 to-gray-700 text-white flex items-center justify-center font-heading text-[9px] font-bold shadow-sm border border-black/10">
                VII
              </div>
              <div className="flex flex-col">
                <p className="font-heading text-[11px] font-bold text-black leading-none mb-1">
                  Vincent Ivan
                </p>
                <p className="font-mono text-[9px] text-gray-400 leading-none">
                  © 2026. All rights.
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
