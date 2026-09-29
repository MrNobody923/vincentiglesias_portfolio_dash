import React, { useState } from 'react'
import { useInView } from '../hooks'

interface ContactProps {
  onShowToast?: (msg: string) => void
}

export default function Contact({ onShowToast }: ContactProps) {
  const { ref, isVisible } = useInView()
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
    onShowToast?.('Message dispatched successfully!')
    setTimeout(() => setSent(false), 3000)
  }

  const copyInfo = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    onShowToast?.(`Copied ${label} to clipboard: ${text}`)
  }

  return (
    <section id="contact" className="py-4 sm:py-8">
      <div className="max-w-[1200px] mx-auto px-6">
        <div ref={ref} className={`mb-16 anim-fade-up ${isVisible ? 'anim-visible' : ''}`}>
          <span className="font-heading text-sm font-semibold text-gray-400 tracking-[2px] block mb-3">05</span>
          <h2 className="font-heading text-[clamp(2rem,4vw,3rem)] font-bold text-black -tracking-tight leading-[1.1]">Get in Touch</h2>
          <div className="w-[60px] h-[3px] bg-black mt-5 rounded-sm" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left info */}
          <div className={`anim-fade-right ${isVisible ? 'anim-visible' : ''}`}>
            <h3 className="font-heading text-[clamp(1.8rem,3vw,2.5rem)] font-bold leading-[1.3] text-black mb-5 -tracking-tight">
              Let's build<br />something <span className="relative inline-block">great<span className="absolute bottom-0.5 left-0 w-full h-2 bg-black/[0.08] rounded-sm -z-[1]" /></span> together.
            </h3>
            <p className="text-base text-dark-gray leading-[1.8] mb-8">
              Whether you have an enterprise web project, mobile app, embedded IoT solution, or security audit in mind—I'd love to connect and build something exceptional.
            </p>

            {/* Direct Contact Channels */}
            <div className="flex flex-col gap-3.5 mb-8">
              {/* Email */}
              <button
                onClick={() => copyInfo('iglesias.vincentivan.m@gmail.com', 'Email')}
                className="flex items-center justify-between p-3.5 rounded-xl hover:bg-off-white border border-transparent hover:border-black/10 transition-all text-left group"
                title="Click to copy email"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center bg-off-white border border-black/[0.06] rounded-xl shrink-0 group-hover:bg-black group-hover:text-white transition-all">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-gray-400 block">Email (Click to copy)</span>
                    <span className="text-xs sm:text-sm text-near-black font-medium truncate block">iglesias.vincentivan.m@gmail.com</span>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-gray-400 bg-black/[0.04] px-2 py-1 rounded group-hover:bg-black group-hover:text-white transition-colors shrink-0 ml-2">
                  COPY
                </span>
              </button>

              {/* Phone */}
              <button
                onClick={() => copyInfo('+639947398295', 'Phone')}
                className="flex items-center justify-between p-3.5 rounded-xl hover:bg-off-white border border-transparent hover:border-black/10 transition-all text-left group"
                title="Click to copy phone number"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center bg-off-white border border-black/[0.06] rounded-xl shrink-0 group-hover:bg-black group-hover:text-white transition-all">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-gray-400 block">Phone / Mobile</span>
                    <span className="text-xs sm:text-sm text-near-black font-medium truncate block">+63 (994) 7398-295</span>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-gray-400 bg-black/[0.04] px-2 py-1 rounded group-hover:bg-black group-hover:text-white transition-colors shrink-0 ml-2">
                  COPY
                </span>
              </button>

              {/* GitHub */}
              <a 
                href="https://github.com/MrNobody923" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center justify-between p-3.5 rounded-xl hover:bg-off-white border border-transparent hover:border-black/10 transition-all text-left group"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center bg-off-white border border-black/[0.06] rounded-xl shrink-0 group-hover:bg-black group-hover:text-white transition-all">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-gray-400 block">GitHub Profile</span>
                    <span className="text-xs sm:text-sm text-near-black font-medium truncate block">github.com/MrNobody923</span>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-gray-400 shrink-0 ml-2">OPEN ↗</span>
              </a>

              {/* Facebook */}
              <a 
                href="https://web.facebook.com/0xviiglesias" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center justify-between p-3.5 rounded-xl hover:bg-off-white border border-transparent hover:border-black/10 transition-all text-left group"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center bg-off-white border border-black/[0.06] rounded-xl shrink-0 group-hover:bg-black group-hover:text-white transition-all">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-gray-400 block">Facebook</span>
                    <span className="text-xs sm:text-sm text-near-black font-medium truncate block">@0xviiglesias</span>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-gray-400 shrink-0 ml-2">OPEN ↗</span>
              </a>
            </div>

            {/* Resume & CV Download Cards */}
            <div className="space-y-2.5">
              {/* CV Download Card */}
              <div className="p-3.5 rounded-xl bg-off-white border border-black/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                <div>
                  <span className="text-[10px] font-mono uppercase text-gray-400 block">CURRICULUM VITAE (2-PAGE DETAILED)</span>
                  <span className="text-xs font-bold text-black">Vincent_Ivan_Iglesias_CV.pdf</span>
                </div>
                <div className="flex items-center gap-1.5 self-start sm:self-auto">
                  <a
                    href="/cv.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1.5 rounded-lg border border-black/15 text-[11px] font-mono text-charcoal hover:border-black transition-all"
                  >
                    PREVIEW ↗
                  </a>
                  <a
                    href="/cv.pdf"
                    download="Vincent_Ivan_Iglesias_CV.pdf"
                    className="px-3 py-1.5 rounded-lg bg-black text-white text-[11px] font-mono font-semibold hover:bg-charcoal transition-all shadow-sm"
                  >
                    CV ↓
                  </a>
                </div>
              </div>

              {/* Resume Download Card */}
              <div className="p-3.5 rounded-xl bg-off-white border border-black/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                <div>
                  <span className="text-[10px] font-mono uppercase text-gray-400 block">RESUME (1-PAGE CONCISE)</span>
                  <span className="text-xs font-bold text-black">Vincent_Ivan_Iglesias_Resume.pdf</span>
                </div>
                <div className="flex items-center gap-1.5 self-start sm:self-auto">
                  <a
                    href="/resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1.5 rounded-lg border border-black/15 text-[11px] font-mono text-charcoal hover:border-black transition-all"
                  >
                    PREVIEW ↗
                  </a>
                  <a
                    href="/resume.pdf"
                    download="Vincent_Ivan_Iglesias_Resume.pdf"
                    className="px-3 py-1.5 rounded-lg bg-black text-white text-[11px] font-mono font-semibold hover:bg-charcoal transition-all shadow-sm"
                  >
                    RESUME ↓
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right form */}
          <div className={`anim-fade-left ${isVisible ? 'anim-visible' : ''}`}>
            <form onSubmit={handleSubmit} className="p-5 sm:p-8 md:p-10 bg-white/65 backdrop-blur-2xl border border-black/[0.06] rounded-2xl shadow-sm hover:shadow-lg hover:border-black/10 transition-all">
              {['Name', 'Email', 'Message'].map(field => (
                <div key={field} className="mb-6">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-2">{field}</label>
                  {field === 'Message' ? (
                    <textarea
                      name={field.toLowerCase()}
                      placeholder="Tell me about your project, system architecture, or inquiry..."
                      rows={5}
                      required
                      className="w-full px-4 py-3.5 font-body text-[0.95rem] text-near-black bg-off-white border-[1.5px] border-black/[0.06] rounded-xl outline-none focus:border-black focus:bg-white focus:ring-4 focus:ring-black/5 transition-all resize-y min-h-[120px] placeholder:text-gray-400"
                    />
                  ) : (
                    <input
                      type={field === 'Email' ? 'email' : 'text'}
                      name={field.toLowerCase()}
                      placeholder={field === 'Email' ? 'your@email.com' : 'Your name'}
                      required
                      className="w-full px-4 py-3.5 font-body text-[0.95rem] text-near-black bg-off-white border-[1.5px] border-black/[0.06] rounded-xl outline-none focus:border-black focus:bg-white focus:ring-4 focus:ring-black/5 transition-all placeholder:text-gray-400"
                    />
                  )}
                </div>
              ))}
              <button
                type="submit"
                disabled={sent}
                className={`w-full inline-flex items-center justify-center gap-2.5 font-body text-sm font-semibold px-8 py-3.5 rounded-full border-2 transition-all ${
                  sent
                    ? 'bg-green-500 border-green-500 text-white'
                    : 'bg-black border-black text-white hover:bg-charcoal hover:-translate-y-0.5 hover:shadow-lg'
                }`}
              >
                <span>{sent ? 'Sent! ✓' : 'Send Message'}</span>
                {!sent && (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
