import React, { useState } from 'react'
import { useInView } from '../hooks'

interface TimelineItem {
  year: string
  period: string
  title: string
  institution: string
  location?: string
  status?: string
  description?: string
  tags: string[]
  achievements?: string[]
}

const educationData: TimelineItem[] = [
  {
    year: '2025',
    period: '2021 – 2025',
    title: 'Bachelor of Science in Information Technology',
    institution: 'Lyceum-Northwestern University',
    location: 'Dagupan City, Pangasinan',
    status: 'GRADUATED',
    description: 'Transferred and completed degree with academic honors. Specialized in full-stack web platforms, embedded IoT, and defensive cybersecurity.',
    tags: ['BSIT', "Dean's List", 'Cybersecurity Officer', 'Thesis: VenTubig'],
    achievements: [
      "Dean's List Awardee (2022–2023, 2023–2024)",
      'Public Relations Officer — Cyber Security Club (2024–2025)',
      'Technical Officer — Cyber Security Club (2023–2024)',
      '2nd Runner-Up — Capture The Flag (CTF) Cyber Security Challenge (2023)',
      '9th Place Overall — Hack4Gov 3: Region 1 Cybersecurity Competition (2023)',
    ],
  },
  {
    year: '2016',
    period: '2014 – 2016',
    title: 'Undergraduate Studies (Transferred)',
    institution: 'Saint Louis University',
    location: 'Baguio City',
    status: 'TRANSFERRED',
    description: 'Core collegiate foundational coursework in computing and technology before transferring to complete degree at Lyceum-Northwestern University.',
    tags: ['Foundational Computing', 'Mathematics', 'SLU Baguio'],
  },
  {
    year: '2014',
    period: '2010 – 2014',
    title: 'High School Diploma',
    institution: "Saint Columban's College",
    location: 'Lingayen, Pangasinan',
    status: 'COMPLETED',
    description: 'Secondary education with focus on science, mathematics, and early computer literacy.',
    tags: ['High School Diploma', 'SCC Lingayen'],
  },
  {
    year: '2010',
    period: '2002 – 2010',
    title: 'Elementary Education',
    institution: 'Happy Times Christian School Inc.',
    location: 'Lingayen, Pangasinan',
    status: 'COMPLETED',
    description: 'Primary academic education establishing core problem-solving and English language foundations.',
    tags: ['Elementary Education', 'HTCS'],
  },
]

const experienceData: TimelineItem[] = [
  {
    year: '2026',
    period: 'Jan 2026 – Present',
    title: 'IT Support Specialist',
    institution: 'Vertex Technologies Corporation',
    status: 'CURRENT ROLE',
    description: 'Provide end-to-end technical support for network and server infrastructure. Collaborate with senior engineering teams on enterprise hardware deployments and high-uptime system operations.',
    tags: ['Network Systems', 'Server Reliability', 'Hardware Infrastructure', 'Disaster Recovery'],
    achievements: [
      'Engineered network infrastructure optimizations ensuring 99.9% office server uptime',
      'Spearheaded audio-visual and conference display network configurations for executive rooms',
      'Troubleshot complex hardware and system configurations across multi-department teams',
    ],
  },
  {
    year: '2025',
    period: 'Feb 2025 – May 2025',
    title: 'IT Intern (OJT)',
    institution: 'Department of Information and Communications Technology (DICT)',
    status: 'COMPLETED',
    description: 'Supported regional government IT initiatives, daily infrastructure maintenance, network analysis, and entry-level security evaluations under regional DICT directors.',
    tags: ['DICT', 'Government IT', 'Security Analysis', 'Network Maintenance'],
    achievements: [
      'Performed hands-on diagnostics and repair for government server workstations',
      'Assisted regional network maintenance and basic traffic security analysis',
    ],
  },
  {
    year: '2023',
    period: '2023',
    title: 'Cybersecurity Competitor — Hack4Gov 3',
    institution: 'DICT Region 1 / Team Cipher Ops',
    status: '9th PLACE REGIONAL',
    description: 'Competed against top collegiate cyber teams in high-intensity Capture The Flag (CTF) challenges including web exploitation, cryptography, network packet inspection, and reverse engineering.',
    tags: ['CTF', 'Web Exploitation', 'Cryptography', 'Reverse Engineering', 'Wireshark'],
  },
]

export default function Timeline() {
  const { ref, isVisible } = useInView()
  const [activeTab, setActiveTab] = useState<'education' | 'experience'>('education')

  const items = activeTab === 'education' ? educationData : experienceData

  return (
    <section id="journey" className="py-4 sm:py-8 relative">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Section Header */}
        <div ref={ref} className={`mb-12 anim-fade-up ${isVisible ? 'anim-visible' : ''}`}>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-4">
            <div>
              <span className="font-heading text-sm font-semibold text-gray-400 tracking-[2px] block mb-3">03</span>
              <h2 className="font-heading text-[clamp(2rem,4vw,3rem)] font-bold text-black -tracking-tight leading-[1.1]">
                Journey & Milestones
              </h2>
            </div>
            
            {/* View Switcher Tabs */}
            <div className="flex items-center gap-1.5 p-1 bg-off-white border border-black/[0.08] rounded-full self-start sm:self-auto shadow-sm">
              <button
                onClick={() => setActiveTab('education')}
                className={`px-4 py-1.5 rounded-full text-xs font-mono tracking-wide transition-all ${
                  activeTab === 'education'
                    ? 'bg-black text-white shadow-md font-semibold'
                    : 'text-gray-500 hover:text-black'
                }`}
              >
                Education (2002–2025)
              </button>
              <button
                onClick={() => setActiveTab('experience')}
                className={`px-4 py-1.5 rounded-full text-xs font-mono tracking-wide transition-all ${
                  activeTab === 'experience'
                    ? 'bg-black text-white shadow-md font-semibold'
                    : 'text-gray-500 hover:text-black'
                }`}
              >
                Experience & CTFs
              </button>
            </div>
          </div>
          <div className="w-[60px] h-[3px] bg-black rounded-sm" />
        </div>

        {/* Timeline Flow */}
        <div className="relative border-l border-black/15 ml-3 sm:ml-8 pl-5 sm:pl-10 space-y-8 sm:space-y-10">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="relative group transition-all duration-400"
            >
              {/* Timeline Node Icon/Dot */}
              <div className="absolute -left-[27px] sm:-left-[47px] top-1.5 w-3.5 h-3.5 rounded-full bg-white border-2 border-black group-hover:scale-125 group-hover:bg-black transition-all shadow-sm" />

              {/* Card Body */}
              <div className="p-4 sm:p-7 rounded-2xl bg-white/70 backdrop-blur-md border border-black/[0.08] shadow-sm hover:shadow-lg hover:border-black/20 hover:-translate-y-0.5 transition-all">
                {/* Meta Strip */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-black bg-black/[0.06] px-2.5 py-0.5 rounded">
                      {item.period}
                    </span>
                    {item.location && (
                      <span className="font-mono text-[11px] text-gray-400 hidden sm:inline">
                        // {item.location}
                      </span>
                    )}
                  </div>
                  {item.status && (
                    <span className={`font-mono text-[10px] font-semibold px-2 py-0.5 rounded tracking-wider ${
                      item.status === 'GRADUATED' || item.status === 'CURRENT ROLE'
                        ? 'bg-emerald-500/10 text-emerald-700 border border-emerald-500/20'
                        : item.status.includes('PLACE')
                        ? 'bg-amber-500/10 text-amber-700 border border-amber-500/20'
                        : 'bg-black/[0.04] text-gray-500'
                    }`}>
                      {item.status}
                    </span>
                  )}
                </div>

                {/* Title & Institution */}
                <h3 className="font-heading text-xl sm:text-2xl font-bold text-black -tracking-tight mb-1">
                  {item.title}
                </h3>
                <div className="font-mono text-xs font-semibold text-gray-600 mb-4">
                  {item.institution}
                </div>

                {/* Description */}
                {item.description && (
                  <p className="text-sm text-dark-gray leading-relaxed mb-4 font-sans">
                    {item.description}
                  </p>
                )}

                {/* Achievements list if any */}
                {item.achievements && item.achievements.length > 0 && (
                  <div className="mb-4 space-y-1.5 p-3 rounded-xl bg-off-white border border-black/[0.04]">
                    <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block mb-1">
                      KEY HONORS & INVOLVEMENTS:
                    </span>
                    {item.achievements.map((ach, aIdx) => (
                      <div key={aIdx} className="text-xs text-charcoal flex items-start gap-2">
                        <span className="text-black font-bold font-mono">✓</span>
                        <span>{ach}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {item.tags.map(tag => (
                    <span
                      key={tag}
                      className="text-[11px] font-mono px-2.5 py-0.5 bg-off-white border border-black/[0.06] rounded-md text-charcoal"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
