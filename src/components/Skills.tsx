import { useInView } from '../hooks'

const skills = [
  {
    title: 'Web Development', size: 'large',
    icon: <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
    text: 'Full-stack web applications with modern frameworks, RESTful APIs, and responsive, accessible interfaces.',
    tags: ['HTML/CSS', 'JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js', 'Django', 'Vite', 'Tailwind', 'PHP', 'Laravel'],
  },
  {
    title: 'Mobile Development', size: 'medium',
    icon: <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>,
    text: 'Cross-platform mobile applications with smooth UX and native performance.',
    tags: ['Flutter', 'Dart', 'Android', 'Swift'],
  },
  {
    title: 'IoT Solutions', size: 'medium',
    icon: <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 1 0 10 10H12V2z"/><path d="M21.18 8.02c-1-2.3-2.85-4.17-5.18-5.18"/></svg>,
    text: 'Hardware-software integration with microcontrollers and embedded systems.',
    tags: ['Raspberry Pi', 'ESP32', 'Arduino', 'Python', 'Sensors', 'Fuses'],
  },
  {
    title: 'Cybersecurity', size: 'large',
    icon: <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
    text: 'Security-first software architecture, vulnerability auditing, network inspection, and defensive hardening.',
    tags: ['Network Security', 'OWASP Top 10', 'Wireshark', 'Nmap', 'Burp Suite', 'Linux Distros', 'Linux Hardening', 'API Security', 'Auth & RBAC'],
  },
  {
    title: 'Database', size: 'small',
    icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>,
    tags: ['Postgres', 'MySQL', 'Firebase', 'Supabase', 'DBeaver'],
  },
  {
    title: 'Tools & Productivity', size: 'small',
    icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
    tags: ['Git', 'GitHub', 'GitLab', 'Docker', 'Postman', 'VS Code', 'ClickUp', 'Trello', 'Google Workspace', 'Figma', 'Antigravity', 'GitHub Copilot'],
  },
  {
    title: 'Payment', size: 'small',
    icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>,
    tags: ['GCash API', 'PayMongo'],
  },
]

export default function Skills() {
  const { ref, isVisible } = useInView()

  return (
    <section id="services" className="py-4 sm:py-8 relative">
      <div id="skills" className="relative -top-24 pointer-events-none" />
      <div className="max-w-[1200px] mx-auto px-6">
        <div ref={ref} className={`mb-16 anim-fade-up ${isVisible ? 'anim-visible' : ''}`}>
          <span className="font-heading text-sm font-semibold text-gray-400 tracking-[2px] block mb-3">02</span>
          <h2 className="font-heading text-[clamp(2rem,4vw,3rem)] font-bold text-black -tracking-tight leading-[1.1]">Services & Technical Skills</h2>
          <div className="w-[60px] h-[3px] bg-black mt-5 rounded-sm" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {skills.map((s, i) => {
            const colSpan = s.size === 'large' ? 'lg:col-span-2' : ''
            return (
              <div
                key={i}
                className={`${colSpan} p-5 sm:p-7 md:p-8 bg-white/65 backdrop-blur-2xl border border-black/[0.06] rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-black/10 transition-all duration-400 relative overflow-hidden group anim-fade-up ${isVisible ? 'anim-visible' : ''}`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/[0.02] opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-[1]">
                  <div className="mb-5 text-black">{s.icon}</div>
                  <h3 className="font-heading text-xl font-semibold text-black mb-2">{s.title}</h3>
                  {s.text && <p className="text-sm text-dark-gray mb-4 leading-relaxed">{s.text}</p>}
                  <div className="flex flex-wrap gap-2">
                    {s.tags.map(t => (
                      <span key={t} className="text-xs font-medium px-3.5 py-1.5 bg-off-white border border-black/[0.06] rounded-full text-charcoal hover:bg-black hover:text-white hover:border-black transition-all cursor-default">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
