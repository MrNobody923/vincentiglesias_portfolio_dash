import { useState, useEffect } from 'react'
import Preloader from './components/Preloader'
import Sidebar from './components/Sidebar'
import BentoDashboard from './components/BentoDashboard'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Timeline from './components/Timeline'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'
import CursorGlow from './components/CursorGlow'
import CommandPalette from './components/CommandPalette'
import Toast from './components/Toast'

const sectionLabels: Record<string, string> = {
  projects: 'Projects',
  services: 'Services & Skills',
  journey: 'Journey & Timeline',
  about: 'About Me',
  contact: 'Get in Touch',
}

export default function App() {
  const [loading, setLoading] = useState(true)
  const [activeSection, setActiveSection] = useState('home')
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null)
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  useEffect(() => {
    if (loading) {
      document.body.classList.add('loading')
    } else {
      document.body.classList.remove('loading')
    }
  }, [loading])

  // Global Keyboard shortcut for Command Palette (Ctrl+K or Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setCommandPaletteOpen(prev => !prev)
      } else if (e.key === 'Escape') {
        setCommandPaletteOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Page-switching navigation (NO page scroll jump; instant view swap with smooth fade-in)
  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  const handleOpenProjectModal = (projectId: string) => {
    setSelectedProjectId(projectId)
    setActiveSection('projects')
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  return (
    <>
      {/* Museum-Grade Paper Grain Overlay */}
      <div className="bg-noise" />

      {/* Subtle Organic Contour Background Lines */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-[0.035] select-none">
        <svg
          className="w-full h-full"
          viewBox="0 0 1440 900"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
        >
          <path
            d="M-80 180 C240 100 380 440 760 260 C1080 100 1260 520 1560 340"
            stroke="#000"
            strokeWidth="1"
            strokeOpacity="0.15"
          />
          <path
            d="M-40 420 C320 280 460 680 860 420 C1200 180 1340 740 1640 460"
            stroke="#000"
            strokeWidth="0.8"
            strokeOpacity="0.1"
            strokeDasharray="6 6"
          />
          <path
            d="M-120 660 C180 500 360 840 720 640 C1040 460 1300 900 1600 700"
            stroke="#000"
            strokeWidth="1"
            strokeOpacity="0.1"
          />
          <circle
            cx="200"
            cy="700"
            r="380"
            stroke="#000"
            strokeWidth="0.6"
            strokeOpacity="0.06"
          />
          <circle
            cx="1300"
            cy="150"
            r="500"
            stroke="#000"
            strokeWidth="0.6"
            strokeOpacity="0.04"
            strokeDasharray="8 8"
          />
        </svg>
      </div>

      {/* Subtle radial glow in top-right for depth */}
      <div className="fixed top-0 right-0 w-[600px] h-[600px] pointer-events-none z-0 opacity-[0.03]"
        style={{
          background: 'radial-gradient(circle at 70% 20%, rgba(0,0,0,0.15), transparent 70%)',
        }}
      />

      <Preloader onComplete={() => setLoading(false)} />

      {/* Main Dashboard Layout Container */}
      <div className="min-h-screen bg-[#f8f8fa] text-near-black flex flex-col lg:flex-row relative">
        {/* Left Fixed / Collapsible Sidebar */}
        <Sidebar
          activeSection={activeSection}
          onNavigate={handleNavigate}
          onOpenCommandPalette={() => setCommandPaletteOpen(true)}
          onShowToast={setToastMessage}
        />

        {/* Right Main Content Dashboard Canvas */}
        <div className="flex-1 min-w-0 lg:pl-[270px] flex flex-col relative z-[2]">
          <main className="w-full max-w-[1360px] mx-auto px-3 sm:px-6 lg:px-8 xl:px-10 py-4 sm:py-6 flex-1 flex flex-col justify-between">
            <div>
              {/* Breadcrumb Navigation for Sub-Pages */}
              {activeSection !== 'home' && (
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-black/[0.06] animate-view-fade">
                  <div className="flex items-center gap-2.5">
                    <button
                      onClick={() => handleNavigate('home')}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-black/[0.06] text-xs font-mono font-bold text-black hover:shadow-card hover:border-black/10 transition-all"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="15 18 9 12 15 6"/>
                      </svg>
                      <span>Dashboard</span>
                    </button>
                    <span className="text-gray-300 text-xs">/</span>
                    <span className="text-xs font-heading font-bold text-charcoal uppercase tracking-wider">
                      {sectionLabels[activeSection] || activeSection}
                    </span>
                  </div>

                  <div className="hidden sm:flex items-center gap-2 text-[10px] font-mono text-gray-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>VII // PORTFOLIO</span>
                  </div>
                </div>
              )}

              {/* Dynamic View / Page Container */}
              <div key={activeSection} className="animate-view-fade">
                {activeSection === 'home' && (
                  <BentoDashboard
                    onNavigate={handleNavigate}
                    onOpenProjectModal={handleOpenProjectModal}
                  />
                )}

                {activeSection === 'projects' && (
                  <Projects
                    externalSelectedProjectId={selectedProjectId}
                    onClearExternalSelectedProject={() => setSelectedProjectId(null)}
                  />
                )}

                {activeSection === 'services' && (
                  <Skills />
                )}

                {activeSection === 'journey' && (
                  <Timeline />
                )}

                {activeSection === 'about' && (
                  <About onShowToast={setToastMessage} />
                )}

                {activeSection === 'contact' && (
                  <Contact onShowToast={setToastMessage} />
                )}
              </div>
            </div>

            {/* Dashboard Footer */}
            <Footer onNavigate={handleNavigate} />
          </main>
        </div>
      </div>

      {/* Global Interactive Cursor Glow */}
      <CursorGlow />

      {/* Command Palette & Terminal Modal */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onNavigate={handleNavigate}
      />

      {/* Floating System Toast Notification */}
      <Toast
        message={toastMessage}
        onClose={() => setToastMessage(null)}
      />
    </>
  )
}
