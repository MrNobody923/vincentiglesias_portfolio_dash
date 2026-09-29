import React from 'react'

// 1. Hotelier Dashboard Mockup
export function HotelierMockup() {
  return (
    <div className="w-full h-full bg-[#0d0f12] text-white p-4 flex flex-col font-mono text-[11px] select-none">
      {/* Browser Bar */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
          <span className="ml-2 text-white/40 text-[10px]">https://hotelier.suite/mgmt</span>
        </div>
        <span className="text-[10px] text-green-400 font-semibold flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          SYS_LIVE
        </span>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-3 gap-2 mb-3">
        <div className="bg-white/[0.04] border border-white/10 rounded p-2">
          <div className="text-white/40 text-[9px] uppercase">Occupancy</div>
          <div className="text-sm font-bold text-white mt-0.5">94.8%</div>
          <div className="text-[9px] text-green-400 mt-0.5">↑ +6.2% wk</div>
        </div>
        <div className="bg-white/[0.04] border border-white/10 rounded p-2">
          <div className="text-white/40 text-[9px] uppercase">Active Rooms</div>
          <div className="text-sm font-bold text-white mt-0.5">48 / 52</div>
          <div className="text-[9px] text-white/50 mt-0.5">4 In-Turnaround</div>
        </div>
        <div className="bg-white/[0.04] border border-white/10 rounded p-2">
          <div className="text-white/40 text-[9px] uppercase">Rev Today</div>
          <div className="text-sm font-bold text-white mt-0.5">₱142,800</div>
          <div className="text-[9px] text-green-400 mt-0.5">GCash & Cards</div>
        </div>
      </div>

      {/* Live Stream / Table */}
      <div className="flex-1 bg-white/[0.02] border border-white/5 rounded p-2 flex flex-col justify-between">
        <div className="text-[10px] text-white/60 font-semibold mb-1.5 flex justify-between">
          <span>REAL-TIME BOOKING INGESTION</span>
          <span className="text-white/30 text-[9px]">CONCURRENCY LOCK ACTIVE</span>
        </div>
        <div className="space-y-1.5">
          <div className="flex items-center justify-between bg-white/[0.03] p-1.5 rounded text-[10px]">
            <span className="text-white/80 font-medium">Deluxe Suite #408</span>
            <span className="text-white/40">3 Nights</span>
            <span className="px-1.5 py-0.5 bg-green-500/20 text-green-300 rounded text-[9px]">PAID // GCASH</span>
          </div>
          <div className="flex items-center justify-between bg-white/[0.03] p-1.5 rounded text-[10px]">
            <span className="text-white/80 font-medium">Exec Penthouse #12</span>
            <span className="text-white/40">5 Nights</span>
            <span className="px-1.5 py-0.5 bg-blue-500/20 text-blue-300 rounded text-[9px]">CONFIRMED</span>
          </div>
          <div className="flex items-center justify-between bg-white/[0.03] p-1.5 rounded text-[10px] hidden sm:flex">
            <span className="text-white/80 font-medium">Standard King #204</span>
            <span className="text-white/40">1 Night</span>
            <span className="px-1.5 py-0.5 bg-amber-500/20 text-amber-300 rounded text-[9px]">CHECK-IN TODAY</span>
          </div>
        </div>
        <div className="pt-2 text-[9px] text-white/40 flex justify-between items-center border-t border-white/5 mt-1">
          <span>SYNC: 240ms POLLING</span>
          <span className="text-green-400">● 100% UPTIME</span>
        </div>
      </div>
    </div>
  )
}

// 2. GoSave Mobile Phone Mockup
export function GoSaveMockup() {
  return (
    <div className="w-full h-full bg-[#111317] flex items-center justify-center p-3 select-none">
      {/* Phone Shell */}
      <div className="w-[200px] sm:w-[220px] bg-[#090a0c] border-2 border-white/20 rounded-[32px] p-2.5 shadow-2xl relative">
        {/* Dynamic Island / Speaker */}
        <div className="w-16 h-3 bg-black rounded-full mx-auto mb-2.5 flex items-center justify-end px-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500/60" />
        </div>

        {/* Inner Screen */}
        <div className="bg-[#16181d] rounded-[24px] p-3 text-white font-sans text-xs">
          <div className="flex justify-between items-center text-[10px] text-white/50 mb-1">
            <span>Total Savings</span>
            <span className="text-green-400 text-[10px] font-mono">+18.4%</span>
          </div>
          <div className="text-lg font-bold tracking-tight text-white mb-2">₱68,450.00</div>

          {/* Progress Bar */}
          <div className="w-full bg-white/10 h-1.5 rounded-full mb-1 overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-400 to-teal-300 h-full rounded-full w-[76%]" />
          </div>
          <div className="flex justify-between text-[8px] text-white/40 mb-3 font-mono">
            <span>TARGET: ₱90K</span>
            <span className="text-white/80 font-bold">76% HIT</span>
          </div>

          {/* Micro Category Pills */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between p-1.5 rounded bg-white/[0.04] text-[10px]">
              <span className="flex items-center gap-1 text-white/80">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Emergency Fund
              </span>
              <span className="font-mono text-white/90">₱35,000</span>
            </div>
            <div className="flex items-center justify-between p-1.5 rounded bg-white/[0.04] text-[10px]">
              <span className="flex items-center gap-1 text-white/80">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400" /> Tech Setup
              </span>
              <span className="font-mono text-white/90">₱18,200</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// 3. Smart Water Refilling IoT Hardware Telemetry Mockup
export function SmartWaterMockup() {
  return (
    <div className="w-full h-full bg-[#080b0f] text-emerald-400 font-mono p-4 flex flex-col justify-between text-[11px] select-none border border-emerald-500/20">
      {/* Hardware Header */}
      <div className="flex items-center justify-between border-b border-emerald-500/20 pb-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="font-bold tracking-wider text-white">IOT_VEND // NODE_01</span>
        </div>
        <span className="text-[9px] bg-emerald-500/10 px-2 py-0.5 border border-emerald-500/30 rounded text-emerald-300">
          MCU: ESP32 + RPI
        </span>
      </div>

      {/* Real-time Telemetry Grid */}
      <div className="grid grid-cols-2 gap-2 my-2">
        <div className="border border-emerald-500/20 bg-emerald-950/20 p-2 rounded">
          <span className="text-[9px] text-white/50 block">SOLENOID VALVE</span>
          <span className="text-white text-xs font-bold">STATE: DISPENSING</span>
          <span className="text-[9px] text-emerald-400 block mt-0.5">RELAY #01: HIGH</span>
        </div>
        <div className="border border-emerald-500/20 bg-emerald-950/20 p-2 rounded">
          <span className="text-[9px] text-white/50 block">PULSE SENSOR</span>
          <span className="text-white text-xs font-bold">1.25 L / MIN</span>
          <span className="text-[9px] text-emerald-400 block mt-0.5">TDS: 014 PPM [PURE]</span>
        </div>
      </div>

      {/* Payment & Dispense Bar */}
      <div className="bg-black/60 border border-emerald-500/30 rounded p-2">
        <div className="flex justify-between items-center text-[10px] mb-1">
          <span className="text-white">GCASH_WEBHOOK: <span className="text-emerald-300">200_OK</span></span>
          <span className="text-white font-bold">₱10.00 [1000ml]</span>
        </div>
        <div className="w-full bg-emerald-950 h-2 rounded overflow-hidden">
          <div className="bg-emerald-400 h-full w-[65%] animate-pulse" />
        </div>
        <div className="flex justify-between text-[9px] text-white/40 mt-1">
          <span>PROGRESS: 650ml / 1000ml</span>
          <span>SAFETY FUSE: OK</span>
        </div>
      </div>
    </div>
  )
}

// 4. MyTaskAdventures Gamified Quest Widget Mockup
export function MyTaskAdventuresMockup() {
  return (
    <div className="w-full h-full bg-[#120f17] text-white font-sans p-4 flex flex-col justify-between text-[11px] select-none border border-purple-500/20">
      {/* Player Bar */}
      <div className="flex items-center justify-between border-b border-purple-500/20 pb-2">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center font-bold text-xs shadow-md">
            ⚔
          </div>
          <div>
            <div className="font-bold text-xs text-white">LEVEL 24 ADVENTURER</div>
            <div className="text-[9px] text-purple-300 font-mono">RANK: CODE KNIGHT</div>
          </div>
        </div>
        <div className="text-right">
          <span className="text-[10px] bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded font-mono font-bold border border-amber-400/30">
            🔥 18 DAY STREAK
          </span>
        </div>
      </div>

      {/* XP Bar */}
      <div className="my-2 bg-purple-950/40 p-2 rounded border border-purple-500/20">
        <div className="flex justify-between text-[9px] text-purple-200 mb-1 font-mono">
          <span>EXPERIENCE</span>
          <span>3,420 / 4,000 XP</span>
        </div>
        <div className="w-full bg-purple-950 h-2 rounded-full overflow-hidden">
          <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-amber-400 h-full w-[85%]" />
        </div>
      </div>

      {/* Active Quests */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between bg-white/[0.04] p-1.5 rounded border border-white/5">
          <span className="flex items-center gap-1.5 text-white/90 text-[10px]">
            <span className="w-3.5 h-3.5 rounded bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[9px]">✓</span>
            Refactor Payment Webhooks
          </span>
          <span className="font-mono text-[9px] text-amber-400">+250 XP</span>
        </div>
        <div className="flex items-center justify-between bg-white/[0.04] p-1.5 rounded border border-white/5">
          <span className="flex items-center gap-1.5 text-white/90 text-[10px]">
            <span className="w-3.5 h-3.5 rounded bg-purple-500/20 text-purple-300 flex items-center justify-center text-[9px]">●</span>
            Finish IoT Circuit Prototyping
          </span>
          <span className="font-mono text-[9px] text-purple-300">+400 XP</span>
        </div>
      </div>
    </div>
  )
}

// 5. Student Registration Monitoring System Mockup
export function StudentRegistrationMockup() {
  return (
    <div className="w-full h-full bg-[#0e1117] text-white font-mono p-4 flex flex-col justify-between text-[11px] select-none border border-sky-500/20">
      {/* Portal Header */}
      <div className="flex items-center justify-between border-b border-sky-500/20 pb-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-sky-400" />
          <span className="font-bold tracking-wide text-white text-[11px]">STUDENT_PORTAL // REG_SYS</span>
        </div>
        <span className="text-[9px] bg-sky-500/10 text-sky-300 px-2 py-0.5 rounded border border-sky-500/30">
          AY 2025-2026 // SEM_1
        </span>
      </div>

      {/* Summary KPI Strip */}
      <div className="grid grid-cols-3 gap-2 my-2 text-center">
        <div className="bg-white/[0.03] p-1.5 rounded border border-white/10">
          <div className="text-[8px] text-white/40">REGISTERED</div>
          <div className="text-xs font-bold text-white">2,840</div>
        </div>
        <div className="bg-white/[0.03] p-1.5 rounded border border-white/10">
          <div className="text-[8px] text-white/40">EVALUATED</div>
          <div className="text-xs font-bold text-emerald-400">2,610</div>
        </div>
        <div className="bg-white/[0.03] p-1.5 rounded border border-white/10">
          <div className="text-[8px] text-white/40">PENDING</div>
          <div className="text-xs font-bold text-amber-400">230</div>
        </div>
      </div>

      {/* Roster Table */}
      <div className="space-y-1 bg-black/40 p-2 rounded border border-white/5">
        <div className="flex justify-between text-[9px] text-white/40 pb-1 border-b border-white/10">
          <span>STUDENT ID</span>
          <span>PROGRAM</span>
          <span>STATUS</span>
        </div>
        <div className="flex justify-between text-[9px] text-white/90">
          <span>#2024-0891</span>
          <span>BS Computer Science</span>
          <span className="text-emerald-400 font-bold">[OFFICIALLY ENROLLED]</span>
        </div>
        <div className="flex justify-between text-[9px] text-white/90">
          <span>#2024-1044</span>
          <span>BS Information Tech</span>
          <span className="text-sky-400 font-bold">[DOCUMENTS VERIFIED]</span>
        </div>
      </div>
    </div>
  )
}
