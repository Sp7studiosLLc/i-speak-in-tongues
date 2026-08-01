// Showpiece scroll scenes + content sections: Babel→Pentecost, horizontal
// timeline, the 1 Cor 14 checklist, the twelve claims accordion, flip cards.
import React, { useRef, useState, useLayoutEffect } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'

const clamp01 = v => Math.min(1, Math.max(0, v))
const easeOut = t => 1 - Math.pow(1 - t, 3)
const rnd = (i, salt) => { const s = Math.sin(i * 127.1 + salt * 311.7) * 43758.5453; return s - Math.floor(s) }

/* =============== Babel → Pentecost pinned scene =============== */
const VERSE = 'וַיִּמָּלְאוּ כוּלָּם רוּחַ הַקֹּדֶשׁ וַיָּחֵלּוּ לְדַבֵּר בִּלְשֹׁנוֹת אֲחֵרוֹת'.split(' ')

function ScatterWord({ p, i, word }) {
  const rx = (rnd(i, 1) - 0.5) * 88
  const ry = (rnd(i, 2) - 0.5) * 64
  const rr = (rnd(i, 3) - 0.5) * 150
  const prog = pv => easeOut(clamp01((pv - 0.14) / 0.44))
  const x = useTransform(p, pv => `${rx * (1 - prog(pv))}vw`)
  const y = useTransform(p, pv => `${ry * (1 - prog(pv))}vh`)
  const rotate = useTransform(p, pv => rr * (1 - prog(pv)))
  const opacity = useTransform(p, pv => 0.25 + 0.75 * prog(pv))
  const color = useTransform(p, pv => (prog(pv) > 0.96 ? '#c9a055' : '#8a6d3b'))
  return <motion.span className="bp-word" style={{ x, y, rotate, opacity, color }}>{word}</motion.span>
}

export function BabelScene() {
  const ref = useRef(null)
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const babelOp = useTransform(p, [0.03, 0.1, 0.3, 0.42], [0, 1, 1, 0])
  const pentOp = useTransform(p, [0.52, 0.62, 0.88, 0.98], [0, 1, 1, 0.9])
  const capOp = useTransform(p, [0.66, 0.78], [0, 1])
  const capY = useTransform(p, [0.66, 0.78], [18, 0])
  return (
    <section className="bp-outer" ref={ref} aria-label="Babel to Pentecost">
      <div className="bp-sticky">
        <div className="bp-labels">
          <motion.div className="bp-label" style={{ opacity: babelOp }}>
            <div className="kicker">Genesis 11</div>
            <div className="display bp-name">BABEL</div>
            <div className="bp-sub serif">One language became many — and the nations scattered.</div>
          </motion.div>
          <motion.div className="bp-label" style={{ opacity: pentOp }}>
            <div className="kicker">Acts 2</div>
            <div className="display bp-name gold">PENTECOST</div>
            <div className="bp-sub serif">Many languages carried one message — and the nations understood.</div>
          </motion.div>
        </div>
        <div className="bp-verse hebrew" dir="rtl">
          {VERSE.map((w, i) => <ScatterWord key={i} p={p} i={i} word={w} />)}
        </div>
        <motion.div className="bp-caption serif" style={{ opacity: capOp, y: capY }}>
          “…and they were all filled with the Holy Spirit and began to speak with other tongues.” — Acts 2:4
        </motion.div>
      </div>
    </section>
  )
}

/* =============== horizontal pinned timeline (desktop) =============== */
export function HTimeline({ items, kicker, title, accent, lede }) {
  const wrapRef = useRef(null)
  const trackRef = useRef(null)
  const [shift, setShift] = useState(0)
  useLayoutEffect(() => {
    const measure = () => {
      if (trackRef.current) setShift(Math.max(0, trackRef.current.scrollWidth - window.innerWidth + 120))
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])
  const { scrollYProgress: p } = useScroll({ target: wrapRef, offset: ['start start', 'end end'] })
  const x = useTransform(p, [0.04, 0.96], [0, -shift])
  return (
    <section className="ht-outer" id="history" ref={wrapRef}>
      <div className="ht-sticky">
        <div className="ht-head">
          <div className="kicker">{kicker}</div>
          <h2 className="display h2">{title} <span className="accent">{accent}</span></h2>
          <p className="lede">{lede}</p>
        </div>
        <motion.div className="ht-track" ref={trackRef} style={{ x }}>
          {items.map((t, i) => (
            <div className={'ht-card' + (t.crisis ? ' crisis' : '')} key={i}>
              <div className="ht-dot" />
              <div className="when display">{t.when}</div>
              <p>{t.what}</p>
            </div>
          ))}
          <div className="ht-endcap serif">…all tracing back to Topeka, 1901.</div>
        </motion.div>
        <div className="ht-rail"><motion.div className="ht-rail-fill" style={{ scaleX: p }} /></div>
        <div className="ht-hint">Keep scrolling ↓</div>
      </div>
    </section>
  )
}

/* =============== the 1 Corinthians 14 checklist =============== */
const RULES = [
  { rule: 'Two or three speakers — at the most', ref: '1 Cor 14:27' },
  { rule: 'Each in turn — never all at once', ref: '1 Cor 14:27' },
  { rule: 'Let one interpret — every time', ref: '1 Cor 14:27' },
  { rule: 'No interpreter? Keep silent in church', ref: '1 Cor 14:28' },
  { rule: 'The speaker remains in full control', ref: '1 Cor 14:32' },
  { rule: 'All things done decently and in order', ref: '1 Cor 14:40' },
]

export function Checklist() {
  return (
    <section className="check-sec" id="checklist">
      <div className="wrap">
        <motion.div className="kicker" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>Paul’s Regulations</motion.div>
        <motion.h2 className="display h2" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.7 }}>
          THE MODERN PRACTICE, <span className="accent">TESTED</span>
        </motion.h2>
        <motion.p className="lede" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          transition={{ delay: 0.15 }}>
          Six specific rules close 1 Corinthians 14. Set today’s common practice beside them, one at a
          time, and see how much lines up.
        </motion.p>
        <div className="check-list">
          {RULES.map((r, i) => (
            <motion.div className="check-row" key={i}
              initial={{ opacity: 0, x: -26 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, delay: (i % 6) * 0.08, ease: [0.22, 1, 0.36, 1] }}>
              <div className="check-txt">
                <div className="rule">{r.rule}</div>
                <div className="ref">{r.ref}</div>
              </div>
              <motion.div className="stamp display"
                initial={{ opacity: 0, scale: 2.6, rotate: 6 }}
                whileInView={{ opacity: 1, scale: 1, rotate: -8 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ type: 'spring', stiffness: 320, damping: 17, delay: 0.35 + (i % 6) * 0.12 }}>
                NOT MET
              </motion.div>
            </motion.div>
          ))}
        </div>
        <motion.p className="check-verdict serif" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ delay: 0.4, duration: 0.9 }}>
          “God is not the author of confusion but of peace.” — 1 Corinthians 14:33
        </motion.p>
      </div>
    </section>
  )
}

/* =============== the twelve claims accordion =============== */
const CLAIMS = [
  { q: '“The word tongue just means language.”', a: 'Agreed — completely. And that agreement carries a great deal with it: a “prayer language” with no vocabulary, no grammar, and no meaning would not be a language by that same definition. The first sentence sets the terms for everything after it.' },
  { q: '“There are three types of tongues — proof, prophetic, and private.”', a: 'Scripture never divides the gift. “Proof tongues” is the biblical gift; “prophetic tongues” (message plus interpretation) is also the biblical gift. Only “private tongues” stands apart — it is the one category with no example, description, or instruction anywhere in Scripture.' },
  { q: '“1 Corinthians 14:14 proves it — my mind is unfruitful.”', a: 'Read one more verse. Verse 14 is Paul’s diagnosis of a problem; verse 15 is his stated resolution: “I will pray with the spirit, and I will also pray with the understanding.” The answer is already in the next verse.' },
  { q: '“Paul spoke in tongues more than anyone — so he did it in private.”', a: 'The prayer closet appears nowhere in the text; it is read into it. There is a far more natural place the church’s greatest cross-cultural missionary used real languages: the mission field.' },
  { q: '“14:2 says tongues is prayer and praise to God.”', a: 'Context: a man speaks a language no one in the assembly knows. “No one understands him” is Paul’s complaint, not the design — only God understands, because God understands every language. Paul’s remedy follows immediately: interpret, or keep silent.' },
  { q: '“Romans 8:26 — groanings too deep for words.”', a: 'Those groanings are the Spirit’s, not ours — and they are unutterable: not spoken at all, by anyone. A verse about silent intercession cannot describe audible human syllables.' },
  { q: '“1 Corinthians 13:1 — the tongues of angels.”', a: 'It is a stack of deliberate hyperboles — all mysteries, all knowledge, all faith, mountains moved — to say even the maximum without love is nothing. And every time angels speak in Scripture, they speak the ordinary language of their hearers.' },
  { q: '“A stranger said: you just spoke my tribe’s language.”', a: 'Taken at face value, the story testifies for the real-language definition — an audience, a language, a hearer — and against the private-language view. And “I couldn’t stop it” sits uneasily with the safeguard those same teachers cite: “the spirits of the prophets are subject to the prophets.”' },
  { q: '“Do not forbid speaking in tongues — it’s literally a verse.”', a: 'Amen — read whole: “do not forbid… let all things be done decently and in order.” Paul forbids forbidding the genuine gift as the chapter defines it: real language, two or three, in turn, interpreted, in order. Setting aside a practice that doesn’t meet those conditions isn’t disobeying the verse — it’s following it.' },
  { q: '“We’re charismatic with a seat belt — order in public, liberty in private.”', a: 'Look at what the seat belt does: it applies every test only where others could evaluate, and exempts the private version from testing altogether. A practice placed beyond testing isn’t safeguarded — it’s simply untested.' },
  { q: '“Cessationism is flimsy — and abuse doesn’t negate right use.”', a: 'The question is not when tongues ceased but what tongues is. Even a full continuationist should reject the modern practice, because it lines up with the biblical description at very few points: not identifiable language, rarely interpreted, often not orderly, and not aimed at unbelievers.' },
  { q: '“I begged God for months — then a dream gave me the syllables.”', a: 'In Acts the gift falls unsought, instantly, fully formed, as verified language. Months of seeking, a flight to a specialist, and a delayed onset through a dream looks much more like something learned over time than like the pattern in Acts.' },
]

export function Claims() {
  const [open, setOpen] = useState(-1)
  return (
    <section className="claims-sec" id="claims">
      <div className="wrap">
        <motion.div className="kicker" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>What People Say</motion.div>
        <motion.h2 className="display h2" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.7 }}>
          TWELVE CLAIMS. <span className="accent">TWELVE ANSWERS.</span>
        </motion.h2>
        <motion.p className="lede" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          The arguments as they actually circulate — each stated fairly, each answered from Scripture.
          The full versions fill chapter 16.
        </motion.p>
        <div className="claims">
          {CLAIMS.map((c, i) => (
            <motion.div className={'claim' + (open === i ? ' open' : '')} key={i}
              initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }} transition={{ duration: 0.5, delay: (i % 4) * 0.06 }}>
              <button className="claim-q" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
                <span className="cnum serif">{String(i + 1).padStart(2, '0')}</span>
                <span className="ctext">{c.q}</span>
                <motion.span className="cplus" animate={{ rotate: open === i ? 45 : 0 }} transition={{ duration: 0.25 }}>+</motion.span>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div className="claim-a-wrap" key="a"
                    initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}>
                    <p className="claim-a">{c.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* =============== Greek word flip-cards =============== */
const WORDS = [
  {
    gk: 'γλῶσσα', tr: 'glōssa', front: 'the word behind every “tongues”',
    back: 'The tongue in the mouth — or a language: a structured system of human speech. Its only two meanings in Greek. Used in Acts 2:4 and throughout 1 Corinthians 12–14.',
  },
  {
    gk: 'διάλεκτος', tr: 'dialektos', front: 'the word the crowd used',
    back: '“Dialect” — a native language. “How is it that we hear, each in our own dialektos in which we were born?” (Acts 2:8). Luke swaps it freely with glōssa: same event, same meaning.',
  },
]

export function FlipCards() {
  const [flipped, setFlipped] = useState([false, false])
  const toggle = i => setFlipped(f => f.map((v, j) => (j === i ? !v : v)))
  return (
    <div className="flips">
      {WORDS.map((w, i) => (
        <motion.div className={'flip' + (flipped[i] ? ' flipped' : '')} key={i} onClick={() => toggle(i)}
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.6, delay: i * 0.12 }}>
          <div className="flip-inner">
            <div className="flip-face flip-front">
              <div className="gk-big serif">{w.gk}</div>
              <div className="gk-tr">{w.tr}</div>
              <div className="gk-hint">{w.front} — flip me</div>
            </div>
            <div className="flip-face flip-back">
              <p>{w.back}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
