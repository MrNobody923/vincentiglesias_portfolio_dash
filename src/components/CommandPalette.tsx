import React, { useState, useEffect, useRef } from 'react'

interface CommandPaletteProps {
  isOpen: boolean
  onClose: () => void
  onNavigate?: (sectionId: string) => void
}

interface CommandItem {
  id: string
  title: string
  subtitle: string
  category: 'Navigation' | 'Projects' | 'Actions'
  action: () => void
}

export default function CommandPalette({ isOpen, onClose, onNavigate }: CommandPaletteProps) {
  const [activeTab, setActiveTab] = useState<'search' | 'terminal'>('search')
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  
  // Terminal state
  const [terminalHistory, setTerminalHistory] = useState<Array<{ cmd: string; output: string }>>([
    {
      cmd: 'init',
      output: 'Vincent Ivan Iglesias — Terminal Environment v2.6.0 (x86_64-pc-none)\nType "help" for a list of available commands.',
    },
  ])
  const [terminalInput, setTerminalInput] = useState('')
  const terminalEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [isOpen, activeTab])

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [terminalHistory])

  const goTo = (sectionId: string) => {
    onClose()
    if (onNavigate) {
      onNavigate(sectionId)
    } else {
      const el = document.getElementById(sectionId)
      if (el) {
        window.scrollTo({ top: el.offsetTop - 40, behavior: 'smooth' })
      }
    }
  }

  const commands: CommandItem[] = [
    { id: 'nav-home', title: 'Dashboard Overview', subtitle: 'Bento Grid & Home', category: 'Navigation', action: () => goTo('home') },
    { id: 'nav-projects', title: 'Featured Projects', subtitle: 'Hotelier, GoSave, Smart Water & more', category: 'Navigation', action: () => goTo('projects') },
    { id: 'nav-services', title: 'Services & Tech Stack', subtitle: 'Web, IoT, Mobile, DB, Cyber & Tools', category: 'Navigation', action: () => goTo('services') },
    { id: 'nav-journey', title: 'Journey & Milestones', subtitle: 'Education (2002–2025) & Experience', category: 'Navigation', action: () => goTo('journey') },
    { id: 'nav-about', title: 'About Me', subtitle: 'Experience, Bio & Background', category: 'Navigation', action: () => goTo('about') },
    { id: 'nav-contact', title: 'Contact & Inquiries', subtitle: 'Send email or message form', category: 'Navigation', action: () => goTo('contact') },
    
    { id: 'proj-hotelier', title: 'Project: Hotelier', subtitle: 'All-in-one hospitality management & payments', category: 'Projects', action: () => goTo('projects') },
    { id: 'proj-gosave', title: 'Project: GoSave', subtitle: 'Budgeting & financial milestone mobile app', category: 'Projects', action: () => goTo('projects') },
    { id: 'proj-smartwater', title: 'Project: Smart Water Machine', subtitle: 'Raspberry Pi / ESP32 IoT automated vending with GCash', category: 'Projects', action: () => goTo('projects') },
    { id: 'proj-mytask', title: 'Project: MyTaskAdventures', subtitle: 'Gamified task manager with XP & loot', category: 'Projects', action: () => goTo('projects') },
    { id: 'proj-student', title: 'Project: Student Registration', subtitle: 'Institutional enrollment & monitoring platform', category: 'Projects', action: () => goTo('projects') },

    {
      id: 'act-cv',
      title: 'Curriculum Vitae (2-Page Detailed) [PDF]',
      subtitle: 'Vincent_Ivan_Iglesias_CV.pdf',
      category: 'Actions',
      action: () => {
        window.open('/cv.pdf', '_blank')
        onClose()
      },
    },
    {
      id: 'act-resume',
      title: 'Resume (1-Page Concise) [PDF]',
      subtitle: 'Vincent_Ivan_Iglesias_Resume.pdf',
      category: 'Actions',
      action: () => {
        window.open('/resume.pdf', '_blank')
        onClose()
      },
    },
    {
      id: 'act-github',
      title: 'Open GitHub Repositories',
      subtitle: 'github.com/MrNobody923',
      category: 'Actions',
      action: () => {
        window.open('https://github.com/MrNobody923?tab=repositories', '_blank')
        onClose()
      },
    },
    {
      id: 'act-email',
      title: 'Copy Email Address',
      subtitle: 'iglesias.vincentivan.m@gmail.com',
      category: 'Actions',
      action: () => {
        navigator.clipboard.writeText('iglesias.vincentivan.m@gmail.com')
        alert('Email copied to clipboard!')
        onClose()
      },
    },
    {
      id: 'act-phone',
      title: 'Copy Phone Number',
      subtitle: '+63 (994) 7398-295',
      category: 'Actions',
      action: () => {
        navigator.clipboard.writeText('+639947398295')
        alert('Phone number copied to clipboard!')
        onClose()
      },
    },
    {
      id: 'act-facebook',
      title: 'Open Facebook Profile',
      subtitle: 'web.facebook.com/0xviiglesias',
      category: 'Actions',
      action: () => {
        window.open('https://web.facebook.com/0xviiglesias', '_blank')
        onClose()
      },
    },
  ]

  const filtered = commands.filter(c => 
    c.title.toLowerCase().includes(query.toLowerCase()) || 
    c.subtitle.toLowerCase().includes(query.toLowerCase())
  )

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const raw = terminalInput.trim()
    if (!raw) return

    const cmd = raw.toLowerCase()
    let response = ''

    switch (cmd) {
      case 'help':
        response = [
          'AVAILABLE COMMANDS:',
          '  about       — Display developer bio and engineering focus',
          '  skills      — List full-stack, mobile, IoT & database technologies',
          '  journey     — View education timeline and technical career milestones',
          '  projects    — View active development portfolio highlights',
          '  github      — Inspect GitHub repositories and activity (@MrNobody923)',
          '  resume      — Open curriculum vitae PDF',
          '  contact     — Get email, phone, and direct social handles',
          '  sudo hire   — Execute priority onboarding protocol',
          '  clear       — Reset terminal buffer',
          '  date        — Print current system time (MNL UTC+8)',
        ].join('\n')
        break
      case 'about':
        response = 'Vincent Ivan Iglesias — Software Developer.\nFocusing on high-impact Full-Stack web platforms, Mobile applications, IoT embedded systems, and Cybersecurity.\nLocation: Lingayen, Pangasinan, Philippines (GMT+8).'
        break
      case 'journey':
      case 'education':
        response = [
          'ACADEMIC & PROFESSIONAL JOURNEY:',
          '• 2021–2025: BS in Information Technology — Lyceum-Northwestern University (Graduated, Dean\'s List, Cybersecurity Club Officer)',
          '• 2014–2016: Undergraduate Studies — Saint Louis University (SLU Baguio)',
          '• 2010–2014: High School Diploma — Saint Columban\'s College',
          '• 2002–2010: Elementary — Happy Times Christian School Inc.',
          '• 2026–Present: IT Support Specialist — Vertex Technologies Corporation',
          '• 2025: IT Intern (OJT) — Department of Information and Communications Technology (DICT)',
          '• 2023: 9th Place Overall — Hack4Gov 3: Region 1 Cybersecurity Competition',
          '• 2023: 2nd Runner-Up — Capture The Flag (CTF) Cyber Security Challenge (LNU)',
        ].join('\n')
        break
      case 'github':
        response = 'GitHub: https://github.com/MrNobody923?tab=repositories\nUser: @MrNobody923\nLanguages: TypeScript, Python, Dart, C++, PHP, JavaScript'
        break
      case 'cv':
        window.open('/cv.pdf', '_blank')
        response = '>> Opening Vincent_Ivan_Iglesias_CV.pdf (2-Page Curriculum Vitae) in new tab...'
        break
      case 'resume':
        window.open('/resume.pdf', '_blank')
        response = '>> Opening Vincent_Ivan_Iglesias_Resume.pdf (1-Page Resume) in new tab...'
        break
      case 'skills':
        response = [
          '• Web: TypeScript, React, Next.js, Node.js, Django, Vite, Tailwind, PHP, Laravel',
          '• Mobile: Flutter, Dart, Android, Swift',
          '• IoT & Hardware: Raspberry Pi, ESP32, Arduino, Python, Relays, Sensors, Fuses',
          '• Cybersecurity: Network Security, OWASP Top 10, Wireshark, Nmap, Burp Suite, Linux Distros, API Security',
          '• Database: Postgres, MySQL, Firebase, Supabase, DBeaver',
          '• Tools & Productivity: Git, GitHub, GitLab, Docker, Postman, VS Code, ClickUp, Trello, Google Workspace, Figma',
          '• Payment Gateways: GCash Webhooks API, PayMongo',
        ].join('\n')
        break
      case 'projects':
        response = [
          '1. Hotelier — All-in-one booking, reservation concurrency lock, integrated payments.',
          '2. GoSave — Budgeting mobile app with real-time financial milestone visualization.',
          '3. Smart Water Machine — IoT cashless refilling station using Raspberry Pi/ESP32 & GCash.',
          '4. MyTaskAdventures — Gamified RPG questboard task manager with XP progression.',
          '5. Student Registration — High-throughput institutional enrollment & document monitoring.',
        ].join('\n')
        break
      case 'contact':
        response = 'Email: iglesias.vincentivan.m@gmail.com\nFacebook: https://web.facebook.com/0xviiglesias\nStatus: Available for opportunities.'
        break
      case 'sudo hire':
      case 'hire':
        response = '>> ACCESS GRANTED: Priority Onboarding Initiated.\n>> Dispatching direct communication channel...\n>> Contact Vincent via iglesias.vincentivan.m@gmail.com to schedule interview.'
        break
      case 'clear':
        setTerminalHistory([])
        setTerminalInput('')
        return
      case 'date':
        response = new Date().toLocaleString('en-US', { timeZone: 'Asia/Manila' }) + ' (Manila, Philippines)'
        break
      default:
        response = `Command not recognized: "${raw}". Type "help" to inspect system capabilities.`
    }

    setTerminalHistory(prev => [...prev, { cmd: raw, output: response }])
    setTerminalInput('')
  }

  if (!isOpen) return null

  return (
    <div 
      className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-md flex items-start justify-center pt-16 sm:pt-24 px-4 select-none"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-2xl bg-white border border-black/15 shadow-2xl rounded-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={e => e.stopPropagation()}
      >
        {/* Top Header / Mode Switcher */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-black/[0.08] bg-off-white text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="font-semibold text-black tracking-wide">COMMAND PALETTE</span>
            <span className="text-gray-400">v2.6</span>
          </div>

          <div className="flex items-center gap-1 bg-black/[0.06] p-0.5 rounded-lg">
            <button
              onClick={() => setActiveTab('search')}
              className={`px-3 py-1 rounded-md text-[11px] font-sans font-medium transition-all ${
                activeTab === 'search' ? 'bg-white text-black shadow-sm' : 'text-gray-500 hover:text-black'
              }`}
            >
              Quick Search
            </button>
            <button
              onClick={() => setActiveTab('terminal')}
              className={`px-3 py-1 rounded-md text-[11px] font-mono font-medium transition-all ${
                activeTab === 'terminal' ? 'bg-black text-white shadow-sm' : 'text-gray-500 hover:text-black'
              }`}
            >
              Terminal (~/sh)
            </button>
          </div>

          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-black text-xs font-mono px-2 py-0.5 rounded border border-black/10 hover:border-black/30"
          >
            ESC
          </button>
        </div>

        {/* Tab 1: Quick Search */}
        {activeTab === 'search' ? (
          <div>
            <div className="p-4 border-b border-black/[0.06] flex items-center gap-3">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 shrink-0">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                ref={inputRef}
                type="text"
                placeholder="Type to search sections, projects, or actions..."
                value={query}
                onChange={e => { setQuery(e.target.value); setSelectedIndex(0) }}
                className="w-full bg-transparent font-sans text-sm outline-none text-near-black placeholder:text-gray-400"
              />
            </div>

            <div className="max-h-[380px] overflow-y-auto p-2 space-y-1">
              {filtered.length === 0 ? (
                <div className="p-8 text-center text-sm text-gray-400 font-mono">
                  No matching commands found.
                </div>
              ) : (
                filtered.map((item, idx) => (
                  <button
                    key={item.id}
                    onClick={item.action}
                    className="w-full text-left p-3 rounded-xl hover:bg-off-white flex items-center justify-between transition-all group"
                  >
                    <div>
                      <div className="text-xs font-semibold text-black group-hover:translate-x-1 transition-transform">
                        {item.title}
                      </div>
                      <div className="text-[11px] text-gray-500">{item.subtitle}</div>
                    </div>
                    <span className="text-[10px] font-mono text-gray-400 bg-black/[0.04] px-2 py-0.5 rounded uppercase tracking-wider">
                      {item.category}
                    </span>
                  </button>
                ))
              )}
            </div>
          </div>
        ) : (
          /* Tab 2: Interactive Terminal */
          <div className="bg-[#0b0d10] text-emerald-400 font-mono text-xs p-4 flex flex-col h-[400px]">
            <div className="flex-1 overflow-y-auto space-y-3 pr-2 select-text">
              {terminalHistory.map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center gap-2 text-white/60 text-[11px]">
                    <span className="text-emerald-400">vincent@portfolio:~$</span>
                    <span className="text-white font-bold">{item.cmd}</span>
                  </div>
                  <pre className="text-emerald-300/90 whitespace-pre-wrap leading-relaxed font-mono pl-3 border-l border-emerald-500/20 text-[11px]">
                    {item.output}
                  </pre>
                </div>
              ))}
              <div ref={terminalEndRef} />
            </div>

            <form onSubmit={handleTerminalSubmit} className="mt-3 pt-3 border-t border-white/10 flex items-center gap-2">
              <span className="text-emerald-400 text-xs">vincent@portfolio:~$</span>
              <input
                type="text"
                value={terminalInput}
                onChange={e => setTerminalInput(e.target.value)}
                placeholder="type 'help', 'skills', 'projects', 'sudo hire'..."
                className="flex-1 bg-transparent text-white font-mono text-xs outline-none placeholder:text-white/30"
                autoFocus
              />
            </form>
          </div>
        )}

        {/* Footer Hint */}
        <div className="px-4 py-2 border-t border-black/[0.06] bg-off-white text-[10px] text-gray-400 font-mono flex justify-between items-center">
          <span>NAVIGATION // ⌘K OR CTRL+K</span>
          <span>SELECT TO EXECUTE</span>
        </div>
      </div>
    </div>
  )
}
