import React, { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import { useLenis, Preloader, Cursor, Magnetic, Grain, ScrollProgress, SplitH2, CountUp, Strike, fine } from './fx.jsx'
import { BabelScene, HTimeline, Checklist, Claims, FlipCards, Experience, Resources } from './scenes.jsx'

const PDF = '/downloads/I_Speak_In_Tongues.pdf'

// Authentic Delitzsch Hebrew NT, Acts 2 (pointed) — verified text
const HEB_LEFT = [
  'וַיִּמָּלְאוּ כוּלָּם רוּחַ הַקֹּדֶשׁ',
  'וַיָּחֵלּוּ לְדַבֵּר בִּלְשֹׁנוֹת',
  'אֲחֵרוֹת כַּאֲשֶׁר נְתָנָם',
  'הָרוּחַ לְסַפֵּר',
  '(מעשי השליחים ב׳:ד׳)',
]
const HEB_RIGHT = [
  'פַּרְתִּיִּים וּמָדִים וְעֵילָמִים',
  'וְישְׁבֵי אֲרַם נַהֲרָיִם',
  'יְהוּדָה וְקַפּוֹדְקִיָּה',
  'פָּנְטוֹס וְאַסְיָא',
  'מִצְרַיִם וְחֶבֶל לוּב',
  'כְּרֵתִים וְעַרְבִים',
]

const fadeUp = {
  hidden: { opacity: 0, y: 34 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.7, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] } }),
}

function Reveal({ children, className, style, delay = 0 }) {
  return (
    <motion.div className={className} style={style} variants={fadeUp} custom={delay}
      initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }}>
      {children}
    </motion.div>
  )
}

const seq = (delay, y = 24) => ({
  hidden: { opacity: 0, y },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] } },
})

function useMedia(query) {
  const [m, setM] = useState(() => typeof window !== 'undefined' && window.matchMedia(query).matches)
  useEffect(() => {
    const mq = window.matchMedia(query)
    const fn = e => setM(e.matches)
    mq.addEventListener('change', fn)
    return () => mq.removeEventListener('change', fn)
  }, [query])
  return m
}

/* ---------------- hero ---------------- */
function Hero({ ready }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const yHeb = useTransform(scrollYProgress, [0, 1], [0, -140])
  const yTitle = useTransform(scrollYProgress, [0, 1], [0, 90])
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <header className="hero" ref={ref} id="top">
      <motion.div className="heb-col heb-left hebrew" style={{ y: yHeb }}
        initial={{ opacity: 0 }} animate={ready ? { opacity: 1 } : {}} transition={{ duration: 2, delay: 0.3 }}>
        {HEB_LEFT.map((l, i) => <div key={i}>{l}</div>)}
      </motion.div>
      <motion.div className="heb-col heb-right hebrew" style={{ y: yHeb }}
        initial={{ opacity: 0 }} animate={ready ? { opacity: 1 } : {}} transition={{ duration: 2, delay: 0.55 }}>
        {HEB_RIGHT.map((l, i) => <div key={i}>{l}</div>)}
      </motion.div>

      <motion.div style={{ y: yTitle, opacity: fade }} initial="hidden" animate={ready ? 'show' : 'hidden'}>
        <motion.h1 className="display title" variants={seq(0.05, 40)}>
          I SPEAK<br />
          <span style={{ whiteSpace: 'nowrap' }}>IN <span className="line2">TONGUES<Strike uid="hero" delay={0.95} /></span></span>
        </motion.h1>

        <motion.div className="divider" variants={{ hidden: { opacity: 0, scaleX: 0 }, show: { opacity: 1, scaleX: 1, transition: { duration: 0.8, delay: 1.5 } } }}>
          <div className="ln" /><div className="di">◆</div><div className="ln" />
        </motion.div>

        <motion.p className="serif subtitle" variants={seq(1.65)}>
          The Lie That Changed<br />Modern Christianity
        </motion.p>

        <motion.p className="tagline" variants={seq(2.0, 0)}>
          A Biblical and Historical Investigation
        </motion.p>

        <motion.div className="ctas" variants={seq(2.2, 20)}>
          <Magnetic><a className="btn primary" href={PDF} download>Download the Book — Free</a></Magnetic>
          <Magnetic><a className="btn ghost" href="#babel">Explore the Evidence</a></Magnetic>
        </motion.div>

        <motion.div variants={seq(2.5, 0)}>
          <p className="byline">Shadai Perez</p>
          <p className="pub">Published by SP7 Studios</p>
        </motion.div>
      </motion.div>

      <motion.div className="scroll-cue" animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}>↓</motion.div>
    </header>
  )
}

/* ---------------- sections ---------------- */
function Question() {
  return (
    <section className="question">
      <div className="wrap">
        <Reveal className="kicker">The Question</Reveal>
        <Reveal className="bigquote serif" delay={1}>
          “Is the gift of tongues from God? <span className="gold">Is it what most people today
          understand it to be?</span> The Bible itself commands us to test every spirit — that is
          what this book does.”
        </Reveal>
        <Reveal className="attrib" delay={2}>From the Introduction</Reveal>
      </div>
    </section>
  )
}

const EVIDENCE = [
  { t: 'Babel, Reversed', p: 'At Babel one language became many and the nations scattered. At Pentecost many languages carried one message and the nations understood. The gift exists to cross the barrier God once imposed.', vf: 'Genesis 11 · Acts 2' },
  { t: 'Real Languages', p: 'The Greek glōssa means a language — and Luke swaps it freely with dialektos, “dialect.” Parthians, Medes, Elamites and a dozen nations heard unlearned Galileans speaking their birth languages.', vf: 'γλῶσσα · διάλεκτος — Acts 2:4–11', gk: true },
  { t: 'Publicly Verified', p: 'Pentecost was falsifiable: native speakers of at least a dozen languages confirmed in real time what was being said. Biblical tongues invited verification — and passed.', vf: '“We hear them… the wonderful works of God”' },
  { t: 'The Rules of Order', p: 'Two or three at most. One at a time. Always interpreted. Silent without an interpreter. Under the speaker’s full control. Paul’s regulations read like a checklist — and it is worth asking honestly how much of today’s practice fits it.', vf: '1 Corinthians 14:27–33, 40' },
  { t: 'A Sign for Unbelievers', p: 'Paul defines the purpose from Isaiah: tongues are a sign aimed at unbelievers — exactly as at Pentecost. A private devotional practice structurally cannot do the one thing the gift is for.', vf: 'Isaiah 28:11 · 1 Corinthians 14:21–22' },
  { t: 'Born in 1901', p: 'The modern practice has a birthday and an address: January 1, 1901, Topeka, Kansas. It was first taught as missionary languages; when that did not hold up on the mission field, it was re-described as a “heavenly language.”', vf: 'Documented in chapters 11–12' },
]

function Evidence() {
  return (
    <section id="evidence">
      <div className="section-hebrew-bg" aria-hidden="true">
        <span className="hebrew" style={{ top: '8%', left: '-3%' }}>וַיִּמָּלְאוּ כוּלָּם רוּחַ הַקֹּדֶשׁ</span>
        <span className="serif" style={{ bottom: '6%', right: '-2%' }}>ἤρξαντο λαλεῖν ἑτέραις γλώσσαις</span>
      </div>
      <div className="wrap">
        <Reveal className="kicker">What Scripture Describes</Reveal>
        <SplitH2 text="SIX PILLARS OF" accent="THE BIBLICAL GIFT" />
        <Reveal className="lede" delay={2}>
          Walked in order — Babel, Pentecost, Caesarea, Ephesus, Corinth — the evidence yields one
          consistent portrait, and it differs, point by point, from what most people today understand
          tongues to be.
        </Reveal>
        <div className="cards">
          {EVIDENCE.map((c, i) => (
            <motion.div className="card" key={c.t} variants={fadeUp} custom={i}
              initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}
              whileHover={{ y: -6, borderColor: 'rgba(201,160,85,0.55)' }}>
              <div className="num">{String(i + 1).padStart(2, '0')}</div>
              <h3>{c.t}</h3>
              <p>{c.p}</p>
              <div className={'vf' + (c.gk ? ' gk' : '')}>{c.vf}</div>
            </motion.div>
          ))}
        </div>
        <Reveal className="kicker flips-kicker" delay={1}>The Two Words — Flip Them</Reveal>
        <FlipCards />
      </div>
    </section>
  )
}

const TIMELINE = [
  { when: 'c. AD 31', what: 'Pentecost. The gift is given as real languages, publicly verified by pilgrims from fifteen regions.', crisis: false },
  { when: '2nd century', what: 'Montanism’s ecstatic prophecy is rejected by the church — in part because its frenzy contradicted 1 Corinthians 14.', crisis: false },
  { when: '4th–5th centuries', what: 'Chrysostom and Augustine testify plainly that the gift had ceased in their era.', crisis: false },
  { when: '1801', what: 'Cane Ridge, Kentucky: mass falling, jerking, barking — revival phenomena with no clear biblical precedent.', crisis: true },
  { when: '1880s', what: 'Maria Woodworth-Etter makes trance and falling a platform practice. The same pattern carries forward into modern television healing ministry.', crisis: true },
  { when: 'Jan 1, 1901', what: 'Topeka, Kansas. Agnes Ozman speaks in “tongues” at Parham’s Bethel Bible School. The modern movement is born — as claimed missionary languages.', crisis: true },
  { when: '1901–1910', what: 'Missionaries reach India, China, and Japan — and are not understood. Over the following years tongues is re-described as a “heavenly language.”', crisis: true },
  { when: '1906', what: 'Azusa Street, Los Angeles. Global Pentecostalism launches.', crisis: true },
  { when: '1960–1980s', what: 'The Charismatic renewal and “Third Wave” carry the practice into nearly every denomination.', crisis: true },
  { when: '1994–2008', what: 'Toronto. Brownsville. Lakeland. Manifestation-driven revivalism peaks — and each movement ends in controversy and decline.', crisis: true },
]

function VTimeline() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.8', 'end 0.6'] })
  return (
    <section className="timeline-sec" id="history">
      <div className="wrap">
        <Reveal className="kicker">Twenty Centuries</Reveal>
        <SplitH2 text="FROM PENTECOST" accent="TO TOPEKA" />
        <Reveal className="lede" delay={2}>
          If ecstatic tongues had always been normal Christian devotion, history would show it.
          Instead, the record is largely silent for eighteen centuries — and then something new appears.
        </Reveal>
        <div className="timeline" ref={ref}>
          <motion.div className="tl-line" style={{ scaleY: scrollYProgress }} />
          {TIMELINE.map((t, i) => (
            <motion.div className={'tl-item' + (t.crisis ? ' crisis' : '')} key={i}
              variants={fadeUp} custom={i % 4} initial="hidden" whileInView="show"
              viewport={{ once: true, margin: '-40px' }}>
              <div className="dot" />
              <div className="when">{t.when}</div>
              <p>{t.what}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

const CHAPTERS = [
  'Introduction: The Question', 'Babel: Where Languages Began', 'Pentecost: The Gift Is Given (Acts 2)',
  'Excursus: What Does “Prophesy” Mean?', 'The Other Instances of Tongues in Acts',
  'Corinth: The City and the Problem Church', 'One Spirit, Many Gifts (1 Corinthians 12)',
  'Love Above Every Gift (1 Corinthians 13)', 'Intelligibility and Order (1 Corinthians 14)',
  'The Biblical Portrait: What the Evidence Yields', 'Tongues in Church History', 'What Linguistics Found',
  'Ecstatic Experience: Eastern Practice and Modern Revivalism', 'Other Commonly Cited Passages',
  'The Private Prayer Language Examined', 'Answering the Arguments: What People Say in Religious Circles',
  'The Strategy of the Counterfeit', 'Testing the Spirits: A Biblical Framework', 'Conclusion',
]

function Chapters() {
  return (
    <section id="inside">
      <div className="wrap">
        <Reveal className="kicker">Inside the Book</Reveal>
        <SplitH2 text="NINETEEN CHAPTERS." accent="EVERY ARGUMENT ANSWERED." />
        <Reveal className="lede" delay={2}>
          The strongest objections are raised first and answered at full strength — plus a Scripture
          reference index, a timeline of the modern movement, and every source cited for verification.
        </Reveal>
        <div className="chapters">
          {CHAPTERS.map((c, i) => (
            <motion.div className="chapter-row" key={i} variants={fadeUp} custom={(i % 5) * 0.6}
              initial="hidden" whileInView="show" viewport={{ once: true, margin: '-30px' }}>
              <span className="no">{i + 1}</span><span className="t">{c}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* mouse-follow 3D cover */
function TiltCover() {
  const rx = useSpring(useMotionValue(0), { stiffness: 160, damping: 18 })
  const ry = useSpring(useMotionValue(-8), { stiffness: 160, damping: 18 })
  const gx = useSpring(useMotionValue(30), { stiffness: 120, damping: 20 })
  const onMove = e => {
    if (!fine()) return
    const r = e.currentTarget.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    ry.set(px * 16); rx.set(-py * 12); gx.set(20 + px * 120)
  }
  const onLeave = () => { rx.set(0); ry.set(-8); gx.set(30) }
  const gloss = useTransform(gx, v => `linear-gradient(${105}deg, transparent ${v - 18}%, rgba(255,246,220,0.14) ${v}%, transparent ${v + 18}%)`)
  return (
    <motion.div className="cover-wrap" data-cursor="read"
      initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
      <motion.a href={PDF} download className="cover-3d" onPointerMove={onMove} onPointerLeave={onLeave}
        style={{ rotateX: rx, rotateY: ry, transformPerspective: 1100, display: 'block' }}>
        <img className="cover-img" src="/cover.jpg" alt="I Speak in Tongues — book cover" />
        <motion.div className="cover-gloss" style={{ backgroundImage: gloss }} />
      </motion.a>
    </motion.div>
  )
}

function Download() {
  return (
    <section className="download-sec" id="download">
      <div className="wrap download-inner">
        <TiltCover />
        <div className="dl-copy">
          <Reveal className="kicker" style={{ textAlign: 'inherit' }}>Read It Free</Reveal>
          <SplitH2 text="GET THE" accent="BOOK" className="left" />
          <Reveal className="lede" delay={2}>
            The complete investigation — free to download, free to share. Bring every experience,
            however powerful, to the bar of Scripture.
          </Reveal>
          <Reveal className="stats" delay={3}>
            <div className="stat"><div className="n"><CountUp to={19} /></div><div className="l">Chapters</div></div>
            <div className="stat"><div className="n"><CountUp to={75} /></div><div className="l">Pages</div></div>
            <div className="stat"><div className="n"><CountUp to={200} suffix="+" /></div><div className="l">Scriptures</div></div>
            <div className="stat"><div className="n">$0</div><div className="l">Forever</div></div>
          </Reveal>
          <Reveal delay={4}>
            <Magnetic><a className="btn primary" href={PDF} download>Download Free PDF</a></Magnetic>
            <p className="dl-note">PDF · 0.8 MB · formatted for reading and print · share it freely</p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function Author() {
  return (
    <section className="author-sec" id="author">
      <div className="wrap">
        <Reveal className="kicker">The Author</Reveal>
        <Reveal className="display author-name" delay={1}>SHADAI PEREZ</Reveal>
        <Reveal className="role" delay={2}>SP7 Studios</Reveal>
        <Reveal delay={3}>
          <p>
            Shadai Perez is a filmmaker and writer at SP7 Studios, an award-winning production studio.
            This investigation grew out of years of study and firsthand experience with the questions it
            examines — and out of the conviction that sincerity deserves the truth: test all things,
            and hold fast what is good.
          </p>
        </Reveal>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer>
      <Reveal className="verse">“Test all things; hold fast what is good.”</Reveal>
      <Reveal className="ref" delay={1}>1 Thessalonians 5:21</Reveal>
      <Reveal className="heb hebrew" delay={2}>וַיִּמָּלְאוּ כוּלָּם רוּחַ הַקֹּדֶשׁ וַיָּחֵלּוּ לְדַבֵּר בִּלְשֹׁנוֹת אֲחֵרוֹת</Reveal>
      <Reveal className="cr" delay={3}>© 2026 Shadai Perez · Published by SP7 Studios · All rights reserved</Reveal>
    </footer>
  )
}

export default function App() {
  useLenis()
  const [ready, setReady] = useState(false)
  const desktop = useMedia('(min-width: 900px)')
  return (
    <>
      <Preloader onDone={() => setReady(true)} />
      <Cursor />
      <Grain />
      <ScrollProgress />
      <motion.nav className="nav" initial={{ y: -70 }} animate={ready ? { y: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 }}>
        <a className="mark display" href="#top">I SPEAK IN <s>TONGUES</s></a>
        <div className="links">
          <a href="#evidence">The Evidence</a>
          <a href="#history">History</a>
          <a href="#claims">Claims</a>
          <a href="#inside">Inside</a>
          <a href="#author">Author</a>
          <Magnetic><a className="dl" href={PDF} download>Free PDF</a></Magnetic>
        </div>
      </motion.nav>
      <Hero ready={ready} />
      <Question />
      <div id="babel"><BabelScene /></div>
      <Evidence />
      {desktop
        ? <HTimeline items={TIMELINE} kicker="Twenty Centuries" title="FROM PENTECOST" accent="TO TOPEKA"
            lede="Eighteen largely silent centuries — then something new. Scroll on." />
        : <VTimeline />}
      <Checklist />
      <Experience />
      <Claims />
      <Chapters />
      <Download />
      <Resources />
      <Author />
      <Footer />
    </>
  )
}
