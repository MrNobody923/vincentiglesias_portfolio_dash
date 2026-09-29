import React, { useState } from 'react'
import { useNetworkStatus } from '../hooks'
import VerifiedBadge from './VerifiedBadge'

export interface ProjectPreview {
  id: string
  name: string
  category: string
  desc: string
  tags: string[]
  previewTitle: string
  previewText: string
}

const previewProjects: ProjectPreview[] = [
  {
    id: 'hotelier',
    name: 'Hotelier',
    category: 'Full-Stack Web',
    desc: 'Enterprise hotel reservation engine with payment webhooks and concurrency locks.',
    tags: ['Next.js', 'TypeScript', 'MySQL', 'GCash API'],
    previewTitle: 'A high-concurrency booking engine for luxury hotels.',
    previewText: 'Unified guest folio, dining tab synchronization, and webhook settlement locks.',
  },
  {
    id: 'smart-water',
    name: 'Smart Water Kiosk',
    category: 'Embedded IoT',
    desc: 'Cashless automated water dispenser powered by Raspberry Pi and ESP32 with pulse flow sensing.',
    tags: ['Raspberry Pi', 'ESP32', 'Python', 'Relays', 'GCash API'],
    previewTitle: 'Automated IoT kiosk with solenoid relays & dynamic QR.',
    previewText: 'Eliminates coin jamming with verified cashless webhooks and auto-cutoff fuses.',
  },
  {
    id: 'gosave',
    name: 'GoSave',
    category: 'Mobile App',
    desc: 'Fintech budgeting mobile application with local SQLite encryption.',
    tags: ['Flutter', 'Dart', 'Android', 'SQLite'],
    previewTitle: 'Offline-first personal finance with visual goal dials.',
    previewText: 'Interactive spending charts and 60 FPS gesture-driven micro-interactions.',
  },
  {
    id: 'mytaskadventures',
    name: 'MyTaskAdventures',
    category: 'Full-Stack Web',
    desc: 'RPG-infused gamified task management with streak buffs and badges.',
    tags: ['React', 'TypeScript', 'Tailwind', 'Supabase'],
    previewTitle: 'Turn daily task lists into RPG character progression.',
    previewText: 'Dynamic XP leveling algorithms and stateful cloud backup.',
  },
]

const dailyDrivers = [
  { name: 'React', icon: '⚛️' },
  { name: 'TypeScript', icon: '🔷' },
  { name: 'Next.js', icon: '▲' },
  { name: 'Node.js', icon: '🟢' },
  { name: 'Flutter', icon: '💙' },
  { name: 'Raspberry Pi', icon: '🍓' },
  { name: 'ESP32', icon: '⚡' },
  { name: 'MySQL', icon: '🐬' },
  { name: 'Tailwind', icon: '🎨' },
  { name: 'Docker', icon: '🐳' },
  { name: 'Supabase', icon: '⚡' },
  { name: 'Postman', icon: '🚀' },
  { name: 'GCash API', icon: '💳' },
]

interface BentoDashboardProps {
  onNavigate: (sectionId: string) => void
  onOpenProjectModal?: (projectId: string) => void
}

export default function BentoDashboard({ onNavigate, onOpenProjectModal }: BentoDashboardProps) {
  const network = useNetworkStatus()
  const [activeProjectIdx, setActiveProjectIdx] = useState(0)
  const currentProject = previewProjects[activeProjectIdx]

  return (
    <div className="w-full relative z-[2] pb-8 sm:pb-12">
      {/* Top Hero Section */}
      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-5 sm:gap-6 mb-6 sm:mb-8 pt-2 sm:pt-4 relative">
        <div className="max-w-[760px]">
          {/* Main Headline */}
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-black tracking-tight leading-[1.08] mb-3 sm:mb-4">
            Build it once.{' '}
            <span className="bg-gradient-to-br from-black to-gray-600 bg-clip-text text-transparent">
              Run it forever.
            </span>
          </h1>
          <div className="h-px w-24 bg-gradient-to-r from-[#ff6b2b] to-transparent mb-4"></div>

          {/* Subtitle / Pitch */}
          <p className="font-sans text-sm sm:text-base md:text-lg text-dark-gray leading-relaxed max-w-[680px]">
            Lost leads are never found again. A workflow built once works forever, and the follow-up that fires itself never asks for a raise. From scalable web platforms and reactive mobile apps to microcontroller IoT systems with automated payments.
          </p>

          {/* Micro HUD status badges */}
          <div className="flex flex-wrap items-center gap-2 mt-3.5 sm:mt-4 text-xs font-mono">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-500/20 font-semibold shadow-[0_0_15px_rgba(16,185,129,0.15)] relative overflow-hidden group cursor-default">
              <span className="absolute inset-0 bg-emerald-400/10 translate-x-[-100%] group-hover:animate-[shimmer_1.5s_infinite]" />
              <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)] animate-pulse" />
              AVAILABLE FOR HIRE
            </span>
            <span className="text-gray-400 hidden sm:inline">•</span>
            <span className="text-gray-500 text-[11px] sm:text-xs">
              FULL-STACK · MOBILE · IOT · CYBERSECURITY
            </span>
          </div>
        </div>

        {/* Top Right Action Buttons */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 self-start shrink-0 pt-1">
          <button
            onClick={() => onNavigate('contact')}
            className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-black text-white hover:bg-gray-900 text-xs font-mono font-bold tracking-wider uppercase transition-all shadow-[0_4px_14px_0_rgba(0,0,0,0.2)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] hover:-translate-y-0.5"
          >
            <span>Get in touch</span>
            <span className="text-sm">↗</span>
          </button>

          <a
            href="/cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-full bg-white border border-black/10 text-xs font-mono font-semibold text-black hover:bg-black hover:text-white hover:border-black transition-all shadow-sm hover:shadow-[0_4px_14px_0_rgba(0,0,0,0.1)] hover:-translate-y-0.5"
            title="Download / View 2-Page CV"
          >
            <span>CV</span>
            <span>↗</span>
          </a>

          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-full bg-gray-50/80 border border-black/[0.08] text-xs font-mono font-semibold text-gray-700 hover:text-black hover:border-black/30 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
            title="Download / View 1-Page Resume"
          >
            <span>Resume</span>
            <span>↓</span>
          </a>
        </div>
      </div>

      {/* DAILY DRIVERS / Tools I work with Ticker Bar */}
      <div className="mb-6 sm:mb-8 p-2.5 sm:p-3 rounded-2xl bg-white/70 backdrop-blur-xl border border-black/[0.08] shadow-[inset_0_1px_4px_rgba(0,0,0,0.02),0_2px_8px_rgba(0,0,0,0.04)] flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-3 overflow-hidden">
        {/* Left Label */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0 px-2 sm:px-3">
          <span className="text-[10px] font-mono font-bold text-[#ff6b2b] tracking-wider uppercase">
            DAILY DRIVERS
          </span>
          <div className="h-4 w-px bg-black/15 hidden sm:block" />
          <span className="font-heading text-xs sm:text-sm font-bold text-black whitespace-nowrap">
            Tools I work with
          </span>
        </div>

        {/* Divider */}
        <div className="h-5 w-px bg-black/10 hidden sm:block" />

        {/* Tool Chips Row */}
        <div className="flex items-center gap-2 overflow-x-auto py-1 px-1 no-scrollbar text-xs font-mono scroll-smooth mask-image-gradient">
          {dailyDrivers.map((tool, idx) => (
            <div
              key={idx}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/80 backdrop-blur-sm border border-black/[0.05] hover:border-black/15 text-charcoal whitespace-nowrap shrink-0 transition-all hover:shadow-sm hover:-translate-y-0.5 cursor-default"
            >
              <span>{tool.icon}</span>
              <span className="font-medium text-[11px]">{tool.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bento Dashboard Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-12 gap-4 sm:gap-5 items-stretch">
        
        {/* CARD 1: PROJECTS */}
        <div className="md:col-span-2 lg:col-span-2 xl:col-span-7 rounded-3xl bg-white/90 backdrop-blur-sm border border-black/[0.06] p-4 sm:p-6 md:p-7 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.06),0_20px_48px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.8),transparent_70%)] pointer-events-none" />
          <div className="relative z-10">
            {/* Card Header */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4 sm:mb-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#ff6b2b] text-white flex items-center justify-center shadow-[inset_0_2px_4px_rgba(255,255,255,0.3),0_2px_8px_rgba(255,107,43,0.3)] shrink-0">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-heading text-sm sm:text-base font-bold tracking-wider uppercase text-black">
                    PROJECTS
                  </h3>
                  <p className="text-xs text-gray-500 font-sans">
                    Funnels, workflows, IoT and apps built to solve real problems.
                  </p>
                </div>
              </div>

              <button
                onClick={() => onNavigate('projects')}
                className="text-xs font-mono font-semibold text-gray-400 hover:text-black flex items-center gap-1 transition-colors self-end sm:self-auto group/link"
              >
                <span className="relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-px after:bottom-0 after:left-0 after:bg-black after:origin-bottom-right after:transition-transform after:duration-300 group-hover/link:after:scale-x-100 group-hover/link:after:origin-bottom-left">View all</span>
                <span className="transform group-hover/link:translate-x-0.5 transition-transform">→</span>
              </button>
            </div>

            {/* Project Mini Switcher Tabs */}
            <div className="flex items-center gap-1.5 mb-4 overflow-x-auto pb-1.5 no-scrollbar w-full relative">
              {previewProjects.map((p, idx) => (
                <button
                  key={p.id}
                  onClick={() => setActiveProjectIdx(idx)}
                  className={`px-3 py-1.5 rounded-full text-[11px] font-mono whitespace-nowrap transition-all duration-300 relative ${
                    activeProjectIdx === idx
                      ? 'text-white font-semibold shadow-sm'
                      : 'text-gray-600 hover:text-black hover:bg-black/5'
                  }`}
                >
                  {activeProjectIdx === idx && (
                    <span className="absolute inset-0 bg-black rounded-full -z-10 shadow-md"></span>
                  )}
                  {p.name}
                </button>
              ))}
            </div>

            {/* Project Preview Showcase Display Box */}
            <div
              onClick={() => {
                if (onOpenProjectModal) {
                  onOpenProjectModal(currentProject.id)
                } else {
                  onNavigate('projects')
                }
              }}
              className="p-4 sm:p-6 rounded-2xl bg-gradient-to-br from-gray-50 via-white to-gray-50/80 border border-black/[0.06] cursor-pointer hover:border-black/15 hover:shadow-[0_4px_20px_rgba(0,0,0,0.04)] transition-all relative overflow-hidden group/card"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent translate-x-[-100%] group-hover/card:animate-[shimmer_2s_infinite] pointer-events-none" />
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2 mb-2.5 relative z-10">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#ff6b2b]">
                  {currentProject.category}
                </span>
                <span className="text-[10px] font-mono text-gray-400 group-hover/card:text-gray-600 transition-colors">
                  CLICK TO VIEW ARCHITECTURE SPECS ↗
                </span>
              </div>

              <h4 className="font-heading text-lg sm:text-xl md:text-2xl font-bold text-black mb-2 leading-snug relative z-10">
                {currentProject.previewTitle}
              </h4>

              <p className="text-xs sm:text-sm text-dark-gray leading-relaxed mb-4 font-sans relative z-10">
                {currentProject.previewText}
              </p>

              {/* Tech Tags */}
              <div className="flex flex-wrap gap-1.5 relative z-10">
                {currentProject.tags.map(t => (
                  <span
                    key={t}
                    className="text-[10px] sm:text-[11px] font-mono px-2.5 py-1 rounded-md bg-white border border-black/10 text-charcoal shadow-sm"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-black/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono relative z-10">
            <span className="text-gray-400">5 PRODUCTION-GRADE REPOSITORIES</span>
            <button
              onClick={() => onNavigate('projects')}
              className="font-bold text-black hover:text-[#ff6b2b] flex items-center gap-1 transition-colors self-start sm:self-auto group/btn"
            >
              <span className="relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-px after:bottom-0 after:left-0 after:bg-[#ff6b2b] after:origin-bottom-right after:transition-transform after:duration-300 group-hover/btn:after:scale-x-100 group-hover/btn:after:origin-bottom-left">Explore Projects Section</span>
              <span className="transform group-hover/btn:translate-x-1 transition-transform">→</span>
            </button>
          </div>
        </div>

        {/* CARD 2: ABOUT */}
        <div className="md:col-span-1 lg:col-span-1 xl:col-span-3 rounded-3xl bg-white/90 backdrop-blur-sm border border-black/[0.06] p-4 sm:p-6 md:p-7 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.06),0_20px_48px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.8),transparent_70%)] pointer-events-none" />
          <div className="relative z-10">
            {/* Card Header */}
            <div className="flex items-center gap-3 mb-4 sm:mb-5">
              <div className="w-10 h-10 rounded-xl bg-[#ff6b2b] text-white flex items-center justify-center shadow-[inset_0_2px_4px_rgba(255,255,255,0.3),0_2px_8px_rgba(255,107,43,0.3)] shrink-0">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
              </div>
              <div>
                <h3 className="font-heading text-sm sm:text-base font-bold tracking-wider uppercase text-black">
                  ABOUT
                </h3>
                <p className="text-xs text-gray-500 font-sans">
                  Who I am and how I work.
                </p>
              </div>
            </div>

            {/* Stacked Visual Cards Frame */}
            <div
              onClick={() => onNavigate('about')}
              className="p-3.5 sm:p-4 rounded-2xl bg-gray-50 border border-black/[0.06] cursor-pointer hover:border-black/20 hover:shadow-md transition-all group/profile overflow-hidden mb-3.5"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-xl overflow-hidden bg-light-gray border border-black/10 shrink-0 shadow-sm relative">
                  <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-xl z-10 pointer-events-none"></div>
                  <img
                    src="/profile.jpg"
                    alt="Vincent Ivan"
                    className="w-full h-full object-cover object-top filter grayscale group-hover/profile:grayscale-0 group-hover/profile:scale-105 transition-all duration-500"
                  />
                  {/* Status dot overlay on avatar */}
                  <div className={`absolute bottom-1 right-1 w-3 h-3 rounded-full ${network.color.dot} border-2 border-white ${network.color.glow} transition-colors duration-500 z-20`}>
                    <div className={`w-full h-full rounded-full ${network.color.ping} ${network.isFluctuating ? 'animate-[ping_0.8s_cubic-bezier(0,0,0.2,1)_infinite]' : 'animate-ping'} opacity-75`} />
                  </div>
                </div>
                <div>
                  <div className="font-heading text-xs font-bold text-black flex items-center gap-1.5">
                    <span>Vincent Ivan Iglesias</span>
                    <VerifiedBadge className="w-3.5 h-3.5" />
                  </div>
                  <div className={`font-mono text-[10px] ${network.color.text} font-semibold flex items-center gap-1.5 transition-colors duration-500`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${network.color.dot} ${network.color.glow} ${network.isFluctuating ? 'animate-[ping_0.8s_cubic-bezier(0,0,0.2,1)_infinite]' : 'animate-pulse'}`} />
                    <span>{network.online ? (network.speedMbps !== null ? `${network.statusShort.toUpperCase()}` : 'ONLINE') : 'OFFLINE'}</span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-dark-gray leading-relaxed font-sans">
                Information Technology graduate specializing in full-stack web platforms, IoT embedded systems, and competitive cybersecurity.
              </p>
            </div>

            {/* Mini Quote Strip */}
            <div className="p-3 rounded-xl bg-gradient-to-r from-gray-50 to-transparent border border-black/[0.04] border-l-[3px] border-l-[#ff6b2b] text-[11px] font-heading italic text-charcoal leading-relaxed shadow-sm">
              “Turning abstract rules into exact operational outcomes.”
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-black/[0.06] relative z-10">
            <button
              onClick={() => onNavigate('about')}
              className="w-full text-center text-xs font-mono font-semibold text-black hover:text-[#ff6b2b] transition-colors group/btn inline-flex justify-center items-center gap-1"
            >
              <span className="relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-px after:bottom-0 after:left-0 after:bg-[#ff6b2b] after:origin-bottom-right after:transition-transform after:duration-300 group-hover/btn:after:scale-x-100 group-hover/btn:after:origin-bottom-left">Read Full Bio</span>
              <span className="transform group-hover/btn:translate-x-1 transition-transform">→</span>
            </button>
          </div>
        </div>

        {/* CARD 3: IOT & SPECIALTY BUILDS */}
        <div className="md:col-span-1 lg:col-span-1 xl:col-span-2 rounded-3xl bg-white/90 backdrop-blur-sm border border-black/[0.06] p-4 sm:p-6 md:p-7 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.06),0_20px_48px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.8),transparent_70%)] pointer-events-none" />
          <div className="relative z-10">
            {/* Card Header */}
            <div className="flex items-center gap-3 mb-4 sm:mb-5">
              <div className="w-10 h-10 rounded-xl bg-[#ff6b2b] text-white flex items-center justify-center shadow-[inset_0_2px_4px_rgba(255,255,255,0.3),0_2px_8px_rgba(255,107,43,0.3)] shrink-0">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a10 10 0 1 0 10 10H12V2z"/><path d="M21.18 8.02c-1-2.3-2.85-4.17-5.18-5.18"/>
                </svg>
              </div>
              <div>
                <h3 className="font-heading text-sm sm:text-base font-bold tracking-wider uppercase text-black">
                  IOT BUILDS
                </h3>
                <p className="text-[11px] text-gray-500 font-sans">
                  Hardware & smart kiosks.
                </p>
              </div>
            </div>

            {/* Chips List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-2 mb-3.5">
              {[
                { name: 'VenTubig IoT', tag: 'ESP32' },
                { name: 'QR Webhook', tag: 'GCash' },
                { name: 'Pulse Meter', tag: 'Flow' },
                { name: 'Safety Relay', tag: 'Fuses' },
              ].map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => onNavigate('projects')}
                  className="flex items-center justify-between p-2 rounded-xl bg-gray-50 border border-transparent hover:border-black/10 hover:shadow-sm hover:bg-white cursor-pointer transition-all group/chip relative overflow-hidden"
                >
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#ff6b2b] transform -translate-x-full group-hover/chip:translate-x-0 transition-transform"></div>
                  <span className="text-xs font-mono font-medium text-black pl-1 group-hover/chip:pl-2 transition-all">{item.name}</span>
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white border border-black/5 text-gray-500 shadow-sm group-hover/chip:border-black/10">
                    {item.tag}
                  </span>
                </div>
              ))}
            </div>

            {/* Mockup input box */}
            <div
              onClick={() => onNavigate('projects')}
              className="p-2.5 rounded-xl bg-gray-50 border border-black/10 flex items-center justify-between text-[11px] font-mono text-gray-400 cursor-pointer hover:border-black/30 hover:bg-white transition-all shadow-inner"
            >
              <span>Smart IoT kiosk search</span>
              <span>🔍</span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-black/[0.06] text-center relative z-10">
            <span className="text-[10px] font-mono text-gray-400 tracking-wider">HARDWARE TO CLOUD</span>
          </div>
        </div>

        {/* CARD 4: CREDENTIALS */}
        <div className="md:col-span-1 lg:col-span-1 xl:col-span-3 rounded-3xl bg-white/90 backdrop-blur-sm border border-black/[0.06] p-4 sm:p-6 md:p-7 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.06),0_20px_48px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.8),transparent_70%)] pointer-events-none" />
          <div className="relative z-10">
            {/* Card Header */}
            <div className="flex items-center gap-3 mb-4 sm:mb-5">
              <div className="w-10 h-10 rounded-xl bg-[#ff6b2b] text-white flex items-center justify-center shadow-[inset_0_2px_4px_rgba(255,255,255,0.3),0_2px_8px_rgba(255,107,43,0.3)] shrink-0">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="8" r="7"/>
                  <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/>
                </svg>
              </div>
              <div>
                <h3 className="font-heading text-sm sm:text-base font-bold tracking-wider uppercase text-black">
                  CREDENTIALS
                </h3>
                <p className="text-xs text-gray-500 font-sans">
                  BSIT Graduate. CTF Competitor.
                </p>
              </div>
            </div>

            {/* Certification Badge / Seal Graphic */}
            <div
              onClick={() => onNavigate('journey')}
              className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-gray-50 via-white to-gray-50 border border-black/[0.06] flex flex-col items-center text-center cursor-pointer hover:border-black/15 hover:shadow-md transition-all group/seal"
            >
              {/* Circular Badge Seal */}
              <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-full border-4 border-black/5 bg-gradient-to-b from-white to-gray-50 flex flex-col items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.06),inset_0_2px_4px_rgba(255,255,255,1)] relative mb-3 group-hover/seal:scale-105 group-hover/seal:-translate-y-1 transition-all duration-300">
                <div className="absolute inset-1 rounded-full border border-dashed border-black/20 group-hover/seal:rotate-12 transition-transform duration-700" />
                <span className="font-heading text-[10px] font-bold text-gray-400 tracking-wider">LNU</span>
                <span className="font-heading text-sm font-black text-black">BSIT</span>
                <span className="text-[9px] text-amber-500 drop-shadow-[0_0_2px_rgba(245,158,11,0.5)]">★ ★ ★</span>
              </div>

              {/* Blue certified pill */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black text-white text-[11px] font-mono font-semibold mb-2 shadow-[0_4px_10px_rgba(0,0,0,0.15)] group-hover/seal:shadow-[0_6px_15px_rgba(0,0,0,0.2)] transition-shadow">
                <span className="text-[#ff6b2b]">✓</span>
                <span>Honors Graduate</span>
              </div>

              <p className="text-xs sm:text-sm font-semibold text-black leading-tight">
                Lyceum-Northwestern University
              </p>
              <p className="text-[10px] sm:text-[11px] font-mono text-gray-500 mt-1">
                Dean's List Awardee (2022–2024)
              </p>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-black/[0.06] relative z-10">
            <button
              onClick={() => onNavigate('journey')}
              className="w-full text-center text-xs font-mono font-semibold text-black hover:text-[#ff6b2b] transition-colors group/btn inline-flex justify-center items-center gap-1"
            >
              <span className="relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-px after:bottom-0 after:left-0 after:bg-[#ff6b2b] after:origin-bottom-right after:transition-transform after:duration-300 group-hover/btn:after:scale-x-100 group-hover/btn:after:origin-bottom-left">View Education & Awards</span>
              <span className="transform group-hover/btn:translate-x-1 transition-transform">→</span>
            </button>
          </div>
        </div>

        {/* CARD 5: SERVICES */}
        <div className="md:col-span-1 lg:col-span-1 xl:col-span-4 rounded-3xl bg-white/90 backdrop-blur-sm border border-black/[0.06] p-4 sm:p-6 md:p-7 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.06),0_20px_48px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.8),transparent_70%)] pointer-events-none" />
          <div className="relative z-10">
            {/* Card Header */}
            <div className="flex items-center gap-3 mb-4 sm:mb-5">
              <div className="w-10 h-10 rounded-xl bg-[#ff6b2b] text-white flex items-center justify-center shadow-[inset_0_2px_4px_rgba(255,255,255,0.3),0_2px_8px_rgba(255,107,43,0.3)] shrink-0">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 2 7 12 12 22 7 12 2"/>
                  <polyline points="2 17 12 22 22 17"/>
                  <polyline points="2 12 12 17 22 12"/>
                </svg>
              </div>
              <div>
                <h3 className="font-heading text-sm sm:text-base font-bold tracking-wider uppercase text-black">
                  SERVICES
                </h3>
                <p className="text-xs text-gray-500 font-sans">
                  What I build for clients & teams.
                </p>
              </div>
            </div>

            {/* Numbered List */}
            <div className="space-y-2">
              {[
                { num: '01', title: 'Full-Stack Web Platforms', icon: '🌐' },
                { num: '02', title: 'Cross-Platform Mobile Apps', icon: '📱' },
                { num: '03', title: 'Embedded IoT & Automation', icon: '⚡' },
                { num: '04', title: 'Cybersecurity Audits & Hardening', icon: '🛡️' },
                { num: '05', title: 'Database & Payment Pipelines', icon: '💳' },
              ].map((serv, idx) => (
                <div
                  key={idx}
                  onClick={() => onNavigate('services')}
                  className="flex items-center justify-between p-2.5 sm:p-3 rounded-xl hover:bg-gray-50 border border-transparent hover:border-black/10 hover:shadow-sm cursor-pointer transition-all group/serv relative overflow-hidden"
                >
                  <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#ff6b2b] opacity-0 group-hover/serv:opacity-100 transition-opacity"></div>
                  <div className="flex items-center gap-3 min-w-0 pl-1 group-hover/serv:pl-2 transition-all">
                    <span className="text-sm shrink-0 drop-shadow-sm group-hover/serv:scale-110 transition-transform">{serv.icon}</span>
                    <span className="text-xs sm:text-[13px] font-semibold text-gray-700 group-hover/serv:text-black truncate">
                      {serv.title}
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-gray-300 group-hover/serv:text-black shrink-0 ml-2 transition-colors">
                    {serv.num}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-black/[0.06] relative z-10">
            <button
              onClick={() => onNavigate('services')}
              className="w-full text-center text-xs font-mono font-semibold text-black hover:text-[#ff6b2b] transition-colors group/btn inline-flex justify-center items-center gap-1"
            >
              <span className="relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-px after:bottom-0 after:left-0 after:bg-[#ff6b2b] after:origin-bottom-right after:transition-transform after:duration-300 group-hover/btn:after:scale-x-100 group-hover/btn:after:origin-bottom-left">Explore Full Capabilities</span>
              <span className="transform group-hover/btn:translate-x-1 transition-transform">→</span>
            </button>
          </div>
        </div>

        {/* CARD 6: TESTIMONIALS & IMPACT */}
        <div className="md:col-span-2 lg:col-span-2 xl:col-span-5 rounded-3xl bg-white/90 backdrop-blur-sm border border-black/[0.06] p-4 sm:p-6 md:p-7 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.06),0_20px_48px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.8),transparent_70%)] pointer-events-none" />
          <div className="relative z-10">
            {/* Card Header */}
            <div className="flex items-center gap-3 mb-4 sm:mb-5">
              <div className="w-10 h-10 rounded-xl bg-[#ff6b2b] text-white flex items-center justify-center shadow-[inset_0_2px_4px_rgba(255,255,255,0.3),0_2px_8px_rgba(255,107,43,0.3)] shrink-0">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
              </div>
              <div>
                <h3 className="font-heading text-sm sm:text-base font-bold tracking-wider uppercase text-black">
                  TESTIMONIALS & IMPACT
                </h3>
                <p className="text-xs text-gray-500 font-sans">
                  Roles, enterprise impact, and track record.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-1 gap-3">
              {/* Item 1 */}
              <div
                onClick={() => onNavigate('journey')}
                className="p-3 sm:p-4 rounded-2xl bg-gray-50 border border-black/5 hover:border-black/15 hover:shadow-md cursor-pointer transition-all flex flex-col justify-between group/role relative overflow-hidden"
              >
                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-emerald-500 opacity-0 group-hover/role:opacity-100 transition-opacity"></div>
                <div className="pl-1 group-hover/role:pl-2 transition-all">
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0 shadow-[0_0_6px_rgba(16,185,129,0.5)]" />
                      <span className="font-heading text-xs font-bold text-black truncate">Vertex Tech Corp</span>
                    </div>
                    <span className="text-[9px] font-mono text-gray-400 shrink-0">2026–NOW</span>
                  </div>
                  <p className="text-[11px] text-gray-600 mb-2.5 font-sans line-clamp-2">
                    IT Support Specialist — Server and network reliability engineering.
                  </p>
                  <div className="flex flex-wrap gap-1">
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-white border border-black/5 text-[#ff6b2b] font-semibold shadow-sm">
                      99.9% Uptime · Server Infra
                    </span>
                  </div>
                </div>
              </div>

              {/* Item 2 */}
              <div
                onClick={() => onNavigate('journey')}
                className="p-3 sm:p-4 rounded-2xl bg-gray-50 border border-black/5 hover:border-black/15 hover:shadow-md cursor-pointer transition-all flex flex-col justify-between group/role relative overflow-hidden"
              >
                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-blue-500 opacity-0 group-hover/role:opacity-100 transition-opacity"></div>
                <div className="pl-1 group-hover/role:pl-2 transition-all">
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0 shadow-[0_0_6px_rgba(59,130,246,0.5)]" />
                      <span className="font-heading text-xs font-bold text-black truncate">DICT Region 1</span>
                    </div>
                    <span className="text-[9px] font-mono text-gray-400 shrink-0">2025</span>
                  </div>
                  <p className="text-[11px] text-gray-600 mb-2.5 font-sans line-clamp-2">
                    Government IT intern supporting regional server maintenance & security audits.
                  </p>
                  <div className="flex flex-wrap gap-1">
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-white border border-black/5 text-blue-600 font-semibold shadow-sm">
                      Government IT · Security
                    </span>
                  </div>
                </div>
              </div>

              {/* Item 3 */}
              <div
                onClick={() => onNavigate('journey')}
                className="p-3 sm:p-4 rounded-2xl bg-gray-50 border border-black/5 hover:border-black/15 hover:shadow-md cursor-pointer transition-all flex flex-col justify-between group/role relative overflow-hidden"
              >
                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-amber-500 opacity-0 group-hover/role:opacity-100 transition-opacity"></div>
                <div className="pl-1 group-hover/role:pl-2 transition-all">
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0 shadow-[0_0_6px_rgba(245,158,11,0.5)]" />
                      <span className="font-heading text-xs font-bold text-black truncate">Hack4Gov 3 CTF</span>
                    </div>
                    <span className="text-[9px] font-mono text-gray-400 shrink-0">2023</span>
                  </div>
                  <p className="text-[11px] text-gray-600 mb-2.5 font-sans line-clamp-2">
                    9th Place Overall Regional Cybersecurity Competition finalist.
                  </p>
                  <div className="flex flex-wrap gap-1">
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-white border border-black/5 text-amber-600 font-semibold shadow-sm">
                      Web Exploitation · CTF
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-black/[0.06] flex items-center justify-between relative z-10">
            <span className="text-[10px] font-mono text-gray-400 tracking-wider">VERIFIED TRACK RECORD</span>
            <button
              onClick={() => onNavigate('journey')}
              className="text-xs font-mono font-semibold text-black hover:text-[#ff6b2b] transition-colors group/btn flex items-center gap-1"
            >
              <span className="relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-px after:bottom-0 after:left-0 after:bg-[#ff6b2b] after:origin-bottom-right after:transition-transform after:duration-300 group-hover/btn:after:scale-x-100 group-hover/btn:after:origin-bottom-left">View Journey</span>
              <span className="transform group-hover/btn:translate-x-1 transition-transform">→</span>
            </button>
          </div>
        </div>

      </div>

      {/* Floating Visitor / Status Badge (Bottom right corner) */}
      <div className="mt-6 sm:mt-8 flex justify-end">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/80 backdrop-blur-md text-white font-mono text-xs shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/10 hover:bg-black/90 hover:scale-105 transition-all cursor-default">
          <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)] animate-pulse" />
          <span className="text-gray-200 tracking-wide">● 2,948 visits</span>
        </div>
      </div>
    </div>
  )
}
