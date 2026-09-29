import React, { useState, useEffect } from 'react'
import { useInView } from '../hooks'
import {
  HotelierMockup,
  GoSaveMockup,
  SmartWaterMockup,
  MyTaskAdventuresMockup,
  StudentRegistrationMockup,
} from './ProjectMockups'

export type Category = 'All' | 'Full-Stack Web' | 'Mobile' | 'IoT & Hardware'

export interface Project {
  id: string
  name: string
  category: 'Full-Stack Web' | 'Mobile' | 'IoT & Hardware'
  categoryLabel: string
  featured?: boolean
  desc: string
  problem: string
  solution: string
  architectureHighlights: string[]
  tags: string[]
  metrics?: { label: string; value: string }[]
  mockup: React.ReactNode
}

export const projectsData: Project[] = [
  {
    id: 'hotelier',
    name: 'Hotelier',
    category: 'Full-Stack Web',
    categoryLabel: 'Full-Stack Web Platform',
    featured: true,
    desc: 'An enterprise-grade hotel management platform providing seamless room reservations, dining ordering, integrated payment webhooks, and live business intelligence.',
    problem: 'Hotels suffer from double-booking conflicts during peak hours and fractured billing between room charges and dining tabs.',
    solution: 'Engineered a real-time reservation concurrency lock combined with centralized multi-channel payment callbacks (GCash & Cards).',
    architectureHighlights: [
      'High-Concurrency Room Lock Mechanism',
      'Asynchronous Payment Webhooks Pipeline',
      'Real-Time Occupancy Analytics Engine',
      'Unified Guest Folio & Dining Billing',
    ],
    metrics: [
      { label: 'Latency', value: '< 180ms' },
      { label: 'Uptime', value: '99.98%' },
      { label: 'Settlement', value: 'Instant QR' },
    ],
    tags: ['Next.js', 'TypeScript', 'Node.js', 'MySQL', 'Tailwind', 'GCash API'],
    mockup: <HotelierMockup />,
  },
  {
    id: 'gosave',
    name: 'GoSave',
    category: 'Mobile',
    categoryLabel: 'Fintech Mobile Application',
    desc: 'Intuitive budgeting mobile application empowering users to allocate financial milestones, visualize expense breakdowns, and cultivate systematic savings habits.',
    problem: 'Most budget apps are overly convoluted, fail to work offline, and lack motivational feedback loops for milestone retention.',
    solution: 'Designed an offline-first mobile app featuring gesture-driven micro-interactions, local SQLite encryption, and dynamic visual progress dials.',
    architectureHighlights: [
      'Offline-First Local Storage & Sync',
      'Interactive Spending Breakdown Charts',
      'Automated Goal Milestone Visualizer',
      'Lightweight Encrypted Financial Store',
    ],
    metrics: [
      { label: 'App Load', value: '0.4s' },
      { label: 'Storage', value: '< 18MB' },
      { label: 'State Sync', value: '60 FPS' },
    ],
    tags: ['Flutter', 'Dart', 'Android', 'SQLite', 'UI/UX Design'],
    mockup: <GoSaveMockup />,
  },
  {
    id: 'smart-water',
    name: 'Smart Water Refilling Station',
    category: 'IoT & Hardware',
    categoryLabel: 'Embedded IoT & Cashless Dispenser',
    desc: 'Automated water dispensing kiosk engineered with Raspberry Pi & ESP32, integrating high-precision pulse flow sensing and cashless GCash payment verification.',
    problem: 'Traditional water vending relies on mechanical coin slots that constantly jam, invite vandalism, and lack remote inventory auditing.',
    solution: 'Developed an automated IoT kiosk with solenoid relay valves, pulse flow measurement, and dynamic QR webhook verification.',
    architectureHighlights: [
      'Microcontroller GPIO Relay Control',
      'Calibrated Pulse Flow Meter Counter',
      'Dynamic GCash Webhook Transaction Verification',
      'Hardware Auto-Cutoff Safety Relay & Fuses',
    ],
    metrics: [
      { label: 'Accuracy', value: '± 2.5ml' },
      { label: 'QR Scan Time', value: '< 1.8s' },
      { label: 'Controller', value: 'ESP32 / Pi' },
    ],
    tags: ['Raspberry Pi', 'ESP32', 'Arduino', 'Python', 'Sensors', 'Relays', 'GCash API'],
    mockup: <SmartWaterMockup />,
  },
  {
    id: 'mytaskadventures',
    name: 'MyTaskAdventures',
    category: 'Full-Stack Web',
    categoryLabel: 'Gamified Productivity Platform',
    desc: 'RPG-infused task management application where completing real-world tasks grants character experience, streak buffs, and unlocks rare badge collectibles.',
    problem: 'Standard productivity taskboards feel like chores, leading to poor daily adherence and user abandonment within 2 weeks.',
    solution: 'Bridged habit tracking with RPG mechanics—dynamic XP leveling, quest difficulties, streak multipliers, and unlockable achievement ranks.',
    architectureHighlights: [
      'Dynamic XP Curve & Level Progression Algorithm',
      'Streak Tracking with Grace Period Buffers',
      'Badge & Achievement Unlock Engine',
      'Stateful Local-Storage & Cloud Backup',
    ],
    metrics: [
      { label: 'Retention Boost', value: '+42%' },
      { label: 'Gamification', value: 'RPG Engine' },
      { label: 'State Sync', value: 'Instant' },
    ],
    tags: ['React', 'TypeScript', 'Tailwind', 'Gamification Engine', 'Supabase'],
    mockup: <MyTaskAdventuresMockup />,
  },
  {
    id: 'student-registration',
    name: 'Student Registration & Monitoring',
    category: 'Full-Stack Web',
    categoryLabel: 'Institutional Admin Platform',
    desc: 'High-throughput institutional student registration, credential evaluation, and real-time status tracking pipeline for academic registrars.',
    problem: 'Manual paper registration leads to massive registrar queues, lost documents, and delayed student enrollment validation.',
    solution: 'Built a multi-step digital enrollment workflow with role-based permissions (RBAC), automated document status gates, and real-time audit logs.',
    architectureHighlights: [
      'Role-Based Access Control (Admin / Evaluator / Student)',
      'Multi-Stage Application Status Pipeline',
      'Real-Time Registrar Audit Log & Export',
      'Relational Database Indexing for Fast Querying',
    ],
    metrics: [
      { label: 'Records', value: '2,500+' },
      { label: 'Processing', value: '4x Faster' },
      { label: 'Security', value: 'Strict RBAC' },
    ],
    tags: ['TypeScript', 'Node.js', 'MySQL', 'DBeaver', 'Docker', 'Postman'],
    mockup: <StudentRegistrationMockup />,
  },
]

interface ProjectsProps {
  externalSelectedProjectId?: string | null
  onClearExternalSelectedProject?: () => void
}

export default function Projects({
  externalSelectedProjectId,
  onClearExternalSelectedProject,
}: ProjectsProps = {}) {
  const { ref, isVisible } = useInView()
  const [selectedCategory, setSelectedCategory] = useState<Category>('All')
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null)

  useEffect(() => {
    if (externalSelectedProjectId) {
      const found = projectsData.find(p => p.id === externalSelectedProjectId)
      if (found) {
        setActiveModalProject(found)
      }
    }
  }, [externalSelectedProjectId])

  const handleCloseModal = () => {
    setActiveModalProject(null)
    onClearExternalSelectedProject?.()
  }

  const categories: Category[] = ['All', 'Full-Stack Web', 'Mobile', 'IoT & Hardware']

  const filteredProjects = selectedCategory === 'All'
    ? projectsData
    : projectsData.filter(p => p.category === selectedCategory)

  return (
    <section id="projects" className="py-4 sm:py-8 relative">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div ref={ref} className={`mb-8 sm:mb-12 anim-fade-up ${isVisible ? 'anim-visible' : ''}`}>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6 mb-4">
            <div>
              <span className="font-heading text-sm font-semibold text-gray-400 tracking-[2px] block mb-3">01</span>
              <h2 className="font-heading text-[clamp(2rem,4vw,3rem)] font-bold text-black -tracking-tight leading-[1.1]">
                Featured Projects
              </h2>
            </div>
            <span className="font-mono text-xs text-gray-400 uppercase tracking-widest">
              [ 5 DEPLOYED SYSTEMS ]
            </span>
          </div>
          <div className="w-[60px] h-[3px] bg-black rounded-sm" />
        </div>

        {/* Category Filter Pills */}
        <div className={`flex flex-wrap items-center gap-2 mb-8 sm:mb-12 anim-fade-up ${isVisible ? 'anim-visible' : ''}`}>
          {categories.map(cat => {
            const count = cat === 'All' 
              ? projectsData.length 
              : projectsData.filter(p => p.category === cat).length

            const isActive = selectedCategory === cat

            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-mono tracking-wide transition-all flex items-center gap-2 border ${
                  isActive
                    ? 'bg-black text-white border-black shadow-md'
                    : 'bg-white text-dark-gray border-black/[0.08] hover:border-black/30 hover:text-black'
                }`}
              >
                <span>{cat}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isActive ? 'bg-white/20 text-white' : 'bg-black/[0.05] text-gray-400'}`}>
                  {count}
                </span>
              </button>
            )
          })}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8">
          {filteredProjects.map((p, i) => (
            <div
              key={p.id}
              className={`rounded-2xl overflow-hidden bg-white border border-black/[0.08] hover:-translate-y-1.5 hover:shadow-2xl transition-all duration-400 group flex flex-col ${
                p.featured && selectedCategory === 'All' ? 'md:col-span-2' : ''
              }`}
            >
              {/* Project Mockup Container */}
              <div 
                className={`relative overflow-hidden cursor-pointer border-b border-black/[0.06] ${
                  p.featured && selectedCategory === 'All' ? 'h-[280px] sm:h-[360px] md:h-[400px]' : 'h-[250px] sm:h-[280px]'
                }`}
                onClick={() => setActiveModalProject(p)}
              >
                {p.mockup}
                
                {/* Hover Inspection Overlay */}
                <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex items-center gap-2 bg-white text-black px-5 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs font-mono font-semibold tracking-wider shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
                    <span>VIEW ARCHITECTURE SPECS</span>
                    <span>→</span>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 sm:p-7 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-mono text-[10px] uppercase tracking-[1.5px] text-gray-400 font-semibold">
                      {p.categoryLabel}
                    </span>
                    {p.featured && (
                      <span className="text-[10px] font-mono font-semibold text-black bg-black/[0.06] px-2.5 py-0.5 rounded-full">
                        FLAGSHIP
                      </span>
                    )}
                  </div>

                  <h3 className="font-heading text-2xl font-bold text-black mb-2.5 -tracking-tight">
                    {p.name}
                  </h3>

                  <p className="text-sm text-dark-gray leading-relaxed mb-4">
                    {p.desc}
                  </p>

                  {/* Architecture Highlight Chips */}
                  <div className="space-y-1.5 mb-5 p-3 rounded-xl bg-off-white border border-black/[0.04]">
                    <div className="text-[10px] font-mono uppercase text-gray-400 tracking-wider">
                      KEY ENGINEERING HIGHLIGHTS:
                    </div>
                    {p.architectureHighlights.slice(0, 2).map((high, hIdx) => (
                      <div key={hIdx} className="text-xs text-charcoal flex items-start gap-1.5 font-sans">
                        <span className="text-black font-bold font-mono">⚡</span>
                        <span>{high}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Tags & Action Row */}
                <div>
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {p.tags.map(t => (
                      <span 
                        key={t} 
                        className="text-[11px] font-mono font-medium px-2.5 py-1 bg-off-white border border-black/[0.06] rounded-md text-charcoal"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-black/[0.06]">
                    <button
                      onClick={() => setActiveModalProject(p)}
                      className="text-xs font-mono font-semibold text-black hover:text-gray-500 flex items-center gap-1.5 transition-colors"
                    >
                      <span>Deep Dive Case Study</span>
                      <span>↗</span>
                    </button>
                    <span className="text-[10px] font-mono text-gray-400">
                      SYS.VERIFIED
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Deep Dive Case Study Modal */}
      {activeModalProject && (
        <div 
          className="fixed inset-0 z-[9999] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 select-none"
          onClick={handleCloseModal}
        >
          <div 
            className="w-full max-w-2xl bg-white border border-black/20 rounded-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 border-b border-black/[0.08] bg-off-white">
              <div>
                <span className="font-mono text-[10px] uppercase text-gray-400 tracking-wider block">
                  {activeModalProject.categoryLabel}
                </span>
                <h3 className="font-heading text-xl font-bold text-black mt-0.5">
                  {activeModalProject.name} — Architecture Specs
                </h3>
              </div>
              <button 
                onClick={handleCloseModal}
                className="w-8 h-8 rounded-full border border-black/15 flex items-center justify-center text-sm font-mono text-gray-400 hover:text-black hover:border-black transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 max-h-[75vh] overflow-y-auto space-y-6">
              {/* Problem & Solution */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-black/[0.02] border border-black/[0.06]">
                  <h4 className="text-xs font-mono uppercase tracking-wider font-bold text-red-600 mb-1.5 flex items-center gap-1.5">
                    <span>⚠️</span> The Problem
                  </h4>
                  <p className="text-xs text-dark-gray leading-relaxed font-sans">
                    {activeModalProject.problem}
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-emerald-500/[0.04] border border-emerald-500/20">
                  <h4 className="text-xs font-mono uppercase tracking-wider font-bold text-emerald-700 mb-1.5 flex items-center gap-1.5">
                    <span>✓</span> The Engineering Solution
                  </h4>
                  <p className="text-xs text-dark-gray leading-relaxed font-sans">
                    {activeModalProject.solution}
                  </p>
                </div>
              </div>

              {/* Metrics Strip */}
              {activeModalProject.metrics && (
                <div className="grid grid-cols-3 gap-3 p-3 bg-black/[0.02] border border-black/[0.06] rounded-xl text-center font-mono">
                  {activeModalProject.metrics.map((m, idx) => (
                    <div key={idx}>
                      <div className="text-[10px] text-gray-400 uppercase">{m.label}</div>
                      <div className="text-sm font-bold text-black mt-0.5">{m.value}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* Full Architecture Highlights */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider font-bold text-black mb-3">
                  Technical Architecture & Components
                </h4>
                <div className="space-y-2">
                  {activeModalProject.architectureHighlights.map((high, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-charcoal bg-off-white p-2.5 rounded-lg border border-black/[0.04]">
                      <span className="text-green-600 font-mono font-bold">✓</span>
                      <span>{high}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack Pills */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider font-bold text-black mb-2">
                  Technologies Utilized
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {activeModalProject.tags.map(t => (
                    <span key={t} className="text-xs font-mono px-3 py-1 bg-black text-white rounded-md">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-black/[0.08] bg-off-white flex justify-between items-center text-xs font-mono">
              <span className="text-gray-400">STATUS: PRODUCTION_READY</span>
              <button
                onClick={handleCloseModal}
                className="px-5 py-2 rounded-full bg-black text-white hover:bg-charcoal transition-colors font-medium"
              >
                Close Specs
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
