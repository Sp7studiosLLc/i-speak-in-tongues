// Webflow-feel effects layer: Lenis, preloader, cursor, magnetic, grain,
// progress bar, split-word reveals, count-up, shared Strike SVG.
import React, { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useScroll, useTransform, useInView, animate, AnimatePresence } from 'framer-motion'
import Lenis from 'lenis'

export const fine = () => typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches
export const reducedMotion = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

/* ---------- Lenis smooth scrolling ---------- */
export function useLenis() {
  useEffect(() => {
    if (reducedMotion()) return
    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true })
    let raf
    const loop = t => { lenis.raf(t); raf = requestAnimationFrame(loop) }
    raf = requestAnimationFrame(loop)
    const onClick = e => {
      const a = e.target.closest('a[href^="#"]')
      if (!a) return
      const id = a.getAttribute('href')
      if (id.length > 1 && document.querySelector(id)) {
        e.preventDefault()
        lenis.scrollTo(id, { offset: -60, duration: 1.4 })
      }
    }
    document.addEventListener('click', onClick)
    return () => { cancelAnimationFrame(raf); document.removeEventListener('click', onClick); lenis.destroy() }
  }, [])
}

/* ---------- shared strike (unique filter ids per instance) ---------- */
export function Strike({ uid = 's', delay = 1.15, className = 'strike-svg' }) {
  return (
    <svg className={className} viewBox="0 0 1240 260" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <filter id={`rough-${uid}`} x="-20%" y="-60%" width="140%" height="220%">
          <feTurbulence type="fractalNoise" baseFrequency="0.032 0.13" numOctaves="4" seed="11" />
          <feDisplacementMap in="SourceGraphic" scale="34" />
        </filter>
        <filter id={`rough2-${uid}`} x="-20%" y="-60%" width="140%" height="220%">
          <feTurbulence type="fractalNoise" baseFrequency="0.05 0.2" numOctaves="3" seed="47" />
          <feDisplacementMap in="SourceGraphic" scale="46" />
        </filter>
      </defs>
      <g filter={`url(#rough-${uid})`} transform="rotate(-4 620 130)">
        <motion.path d="M 18,160 C 240,138 560,142 880,128 C 1030,121 1150,114 1222,108"
          fill="none" stroke="#9f1a10" strokeWidth="64" strokeLinecap="round"
          variants={{ hidden: { pathLength: 0, opacity: 0 }, show: { pathLength: 1, opacity: 0.93, transition: { duration: 0.9, delay, ease: 'easeInOut' } } }} />
      </g>
      <g filter={`url(#rough2-${uid})`} transform="rotate(-4 620 130)">
        <motion.path d="M 40,176 C 300,152 700,150 1210,118"
          fill="none" stroke="#b7271a" strokeWidth="30" strokeLinecap="round"
          variants={{ hidden: { pathLength: 0, opacity: 0 }, show: { pathLength: 1, opacity: 0.85, transition: { duration: 0.8, delay: delay + 0.2, ease: 'easeInOut' } } }} />
      </g>
    </svg>
  )
}

/* ---------- preloader ---------- */
export function Preloader({ onDone }) {
  const [stage, setStage] = useState(0)
  const [gone, setGone] = useState(false)
  useEffect(() => {
    if (reducedMotion()) { onDone(); setGone(true); return }
    const t1 = setTimeout(() => setStage(1), 950)
    const t2 = setTimeout(() => { onDone() }, 2350)
    const t3 = setTimeout(() => setGone(true), 2400)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [])
  const words = 'וַיָּחֵלּוּ לְדַבֵּר בִּלְשֹׁנוֹת אֲחֵרוֹת'.split(' ')
  return (
    <AnimatePresence>
      {!gone && (
        <motion.div className="preloader" exit={{ y: '-100%', transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] } }}>
          {stage === 0 && (
            <div className="pre-heb hebrew">
              {words.map((w, i) => (
                <motion.span key={i} initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: [0, 1, 0.85], y: 0 }}
                  transition={{ duration: 0.55, delay: i * 0.14 }}>{w}&nbsp;</motion.span>
              ))}
            </div>
          )}
          {stage === 1 && (
            <motion.div className="pre-title display" initial="hidden" animate="show"
              variants={{ hidden: {}, show: {} }}>
              <motion.div variants={{ hidden: { opacity: 0, y: 26 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } }}>
                I SPEAK IN TONGUES
              </motion.div>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ---------- custom cursor ---------- */
export function Cursor() {
  const [mode, setMode] = useState('default')
  const [on, setOn] = useState(false)
  const x = useMotionValue(-200), y = useMotionValue(-200)
  const sx = useSpring(x, { stiffness: 500, damping: 40 })
  const sy = useSpring(y, { stiffness: 500, damping: 40 })
  useEffect(() => {
    if (!fine()) return
    setOn(true)
    document.documentElement.classList.add('has-cursor')
    const move = e => { x.set(e.clientX); y.set(e.clientY) }
    const over = e => {
      if (e.target.closest('[data-cursor="read"]')) setMode('read')
      else if (e.target.closest('a, button, .btn, .flip, .claim-q')) setMode('link')
      else setMode('default')
    }
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', over)
    return () => {
      document.documentElement.classList.remove('has-cursor')
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', over)
    }
  }, [])
  if (!on) return null
  return (
    <motion.div className={`cursor ${mode}`} style={{ x: sx, y: sy }}>
      <span className="cursor-label">READ&nbsp;→</span>
    </motion.div>
  )
}

/* ---------- magnetic wrapper ---------- */
export function Magnetic({ children, strength = 0.18, className = '' }) {
  const ref = useRef(null)
  const x = useMotionValue(0), y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 260, damping: 30 })
  const sy = useSpring(y, { stiffness: 260, damping: 30 })
  const onMove = e => {
    if (!fine() || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * strength)
    y.set((e.clientY - (r.top + r.height / 2)) * strength)
  }
  const onLeave = () => { x.set(0); y.set(0) }
  return (
    <motion.span ref={ref} className={`magnetic ${className}`} style={{ x: sx, y: sy }}
      onMouseMove={onMove} onMouseLeave={onLeave}>
      {children}
    </motion.span>
  )
}

/* ---------- grain + progress ---------- */
export function Grain() { return <div className="grain" aria-hidden="true" /> }

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  return <motion.div className="scroll-progress" style={{ scaleX: scrollYProgress }} />
}

/* ---------- split-word heading reveal ---------- */
export function SplitH2({ text, accent = '', className = '' }) {
  const words = [
    ...text.split(' ').filter(Boolean).map(w => ({ w, a: false })),
    ...accent.split(' ').filter(Boolean).map(w => ({ w, a: true })),
  ]
  return (
    <motion.h2 className={`display h2 split ${className}`} initial="hidden" whileInView="show"
      viewport={{ once: true, margin: '-90px' }}>
      {words.map((o, i) => (
        <span className="wmask" key={i}>
          <motion.span className={'wword' + (o.a ? ' accent' : '')}
            variants={{ hidden: { y: '115%' }, show: { y: '0%', transition: { duration: 0.65, delay: i * 0.055, ease: [0.22, 1, 0.36, 1] } } }}>
            {o.w}
          </motion.span>
        </span>
      ))}
    </motion.h2>
  )
}

/* ---------- count-up stat ---------- */
export function CountUp({ to, suffix = '', prefix = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const mv = useMotionValue(0)
  const txt = useTransform(mv, v => prefix + Math.round(v) + suffix)
  useEffect(() => {
    if (inView) { const c = animate(mv, to, { duration: 1.7, ease: [0.22, 1, 0.36, 1] }); return () => c.stop() }
  }, [inView])
  return <motion.span ref={ref}>{txt}</motion.span>
}
