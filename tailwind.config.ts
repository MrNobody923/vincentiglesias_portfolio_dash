export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        heading: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
      },
      colors: {
        'off-white': '#fafafa',
        'light-gray': '#f0f0f0',
        'mid-gray': '#e5e5e5',
        'dark-gray': '#666666',
        charcoal: '#333333',
        'near-black': '#1a1a1a',
      },
      boxShadow: {
        'card': '0 1px 2px rgba(0,0,0,0.03), 0 4px 12px rgba(0,0,0,0.04), 0 16px 40px rgba(0,0,0,0.03)',
        'card-hover': '0 4px 8px rgba(0,0,0,0.04), 0 12px 32px rgba(0,0,0,0.08), 0 24px 60px rgba(0,0,0,0.06)',
        'inner-glow': 'inset 0 1px 2px rgba(255,255,255,0.8), inset 0 -1px 1px rgba(0,0,0,0.02)',
      },
      animation: {
        'orbit': 'orbit 1.2s linear infinite',
        'orbit-reverse': 'orbit 1.8s linear infinite reverse',
        'orbit-slow': 'orbit 2.4s linear infinite',
        'float': 'float 20s ease-in-out infinite',
        'float-reverse': 'float 15s ease-in-out infinite reverse',
        'float-fast': 'float 10s ease-in-out infinite',
        'pulse-dot': 'pulseDot 2s ease-in-out infinite',
        'scroll-bounce': 'scrollBounce 2s ease-in-out infinite',
        'initials-pulse': 'initialsPulse 3s ease-in-out infinite',
        'deco-float': 'decoFloat 6s ease-in-out infinite',
        'rotate-border': 'rotateBorder 4s linear infinite',
        'particle-float': 'particleFloat var(--duration, 12s) ease-in-out infinite',
        'slide-up': 'slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'marquee': 'marquee 32s linear infinite',
      },
      keyframes: {
        orbit: {
          to: { transform: 'rotate(360deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)' },
          '25%': { transform: 'translate(10px, -20px) rotate(5deg)' },
          '50%': { transform: 'translate(-5px, 10px) rotate(-3deg)' },
          '75%': { transform: 'translate(15px, 5px) rotate(2deg)' },
        },
        pulseDot: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.5', transform: 'scale(1.3)' },
        },
        scrollBounce: {
          '0%, 100%': { transform: 'scaleY(1)', opacity: '1' },
          '50%': { transform: 'scaleY(0.5)', opacity: '0.3' },
        },
        initialsPulse: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.1', letterSpacing: '8px' },
          '50%': { transform: 'scale(1.05)', opacity: '0.15', letterSpacing: '12px' },
        },
        decoFloat: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '33%': { transform: 'translate(8px, -12px)' },
          '66%': { transform: 'translate(-4px, 6px)' },
        },
        rotateBorder: {
          '0%': { '--border-angle': '0deg' },
          '100%': { '--border-angle': '360deg' },
        },
        particleFloat: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)', opacity: '0' },
          '10%': { opacity: '1' },
          '50%': { transform: 'translate(var(--dx, 40px), var(--dy, -80px)) scale(1.2)', opacity: '0.8' },
          '90%': { opacity: '0' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}
