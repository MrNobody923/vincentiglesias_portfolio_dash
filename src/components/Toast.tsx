import React, { useEffect } from 'react'

interface ToastProps {
  message: string | null
  onClose: () => void
  duration?: number
}

export default function Toast({ message, onClose, duration = 3000 }: ToastProps) {
  useEffect(() => {
    if (!message) return
    const timer = setTimeout(onClose, duration)
    return () => clearTimeout(timer)
  }, [message, onClose, duration])

  if (!message) return null

  return (
    <div className="fixed bottom-6 right-6 z-[99999] max-w-md select-none animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className="bg-black text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-white/20 flex items-center gap-3.5 backdrop-blur-xl relative overflow-hidden">
        {/* Glowing Status Icon */}
        <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold shrink-0 border border-emerald-500/40">
          ✓
        </div>

        {/* Message */}
        <div className="flex-1 font-mono text-xs">
          <div className="text-gray-400 text-[10px] uppercase tracking-wider">SYSTEM CLIPBOARD</div>
          <div className="text-white font-medium truncate">{message}</div>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white text-xs font-mono px-1.5 py-0.5 rounded transition-colors"
        >
          ✕
        </button>

        {/* Shrinking Bottom Progress Line */}
        <div 
          className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-emerald-400 to-teal-300 w-full animate-[shrink_3s_linear_forwards]"
          style={{
            animationDuration: `${duration}ms`,
          }}
        />
      </div>
    </div>
  )
}
