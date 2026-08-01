import React, { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'

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

function Reveal({ children, className, style, delay = 0, as = 'div' }) {
  const Tag = motion[as] || motion.div
  return (
    <Tag className={className} style={style} variants={fadeUp} custom={delay}
      initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }}>
      {children}
    </Tag>
  )
}

/* ---------------- hero ---------------- */
function Strike() {
  return (
    <svg className="strike-svg" viewBox="0 0 1240 260" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <filter id="rough" x="-20%" y="-60%" width="140%" height="220%">
          <feTurbulence type="fractalNoise" baseFrequency="0.032 0.13" numOctaves="4" seed="11" />
          <feDisplacementMap in="SourceGraphic" scale="34" />
        </filter>
        <filter id="rough2" x="-20%" y="-60%" width="140%" height="220%">
          <feTurbulence type="fractalNoise" baseFrequency="0.05 0.2" numOctaves="3" seed="47" />
          <feDisplacementMap in="SourceGraphic" scale="46" />
        </filter>
      </defs>
      <g filter="url(#rough)" transform="rotate(-4 620 130)">
        <motion.path d="M 18,160 C 240,138 560,142 880,128 C 1030,121 1150,114 1222,108"
          fill="none" stroke="#9f1a10" strokeWidth="64" strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.93 }}
          transition={{ duration: 0.9, delay: 1.15, ease: 'easeInOut' }} />
      </g>
      <g filter="url(#rough2)" transform="rotate(-4 620 130)">
        <motion.path d="M 40,176 C 300,152 700,150 1210,118"
          fill="none" stroke="#b7271a" strokeWidth="30" strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.85 }}
          transition={{ duration: 0.8, delay: 1.35, ease: 'easeInOut' }} />
      </g>
    </svg>
  )
}

function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const yHeb = useTransform(scrollYProgress, [0, 1], [0, -140])
  const yTitle = useTransform(scrollYProgress, [0, 1], [0, 90])
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <header className="hero" ref={ref} id="top">
      <motion.div className="heb-col heb-left hebrew" style={{ y: yHeb }}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2, delay: 0.4 }}>
        {HEB_LEFT.map((l, i) => <div key={i}>{l}</div>)}
      </motion.div>
      <motion.div className="heb-col heb-right hebrew" style={{ y: yHeb }}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2, delay: 0.7 }}>
        {HEB_RIGHT.map((l, i) => <div key={i}>{l}</div>)}
      </motion.div>

      <motion.div style={{ y: yTitle, opacity: fade }}>
        <motion.h1 className="display title"
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}>
          I SPEAK<br />
          <span style={{ whiteSpace: 'nowrap' }}>IN <span className="line2">TONGUES<Strike /></span></span>
        </motion.h1>

        <motion.div className="divider" initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }} transition={{ duration: 0.8, delay: 1.7 }}>
          <div className="ln" /><div className="di">◆</div><div className="ln" />
        </motion.div>

        <motion.p className="serif subtitle" initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.9 }}>
          The Lie That Changed<br />Modern Christianity
        </motion.p>

        <motion.p className="tagline" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.3 }}>
          A Biblical and Historical Investigation
        </motion.p>

        <motion.div className="ctas" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 2.55 }}>
          <a className="btn primary" href={PDF} download>Download the Book — Free</a>
          <a className="btn ghost" href="#evidence">Explore the Evidence</a>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 2.9 }}>
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
  { t: 'The Rules of Order', p: 'Two or three at most. One at a time. Always interpreted. Silent without an interpreter. Under the speaker’s full control. Paul’s regulations read like a checklist the modern practice fails.', vf: '1 Corinthians 14:27–33, 40' },
  { t: 'A Sign for Unbelievers', p: 'Paul defines the purpose from Isaiah: tongues are a sign aimed at unbelievers — exactly as at Pentecost. A private devotional practice structurally cannot do the one thing the gift is for.', vf: 'Isaiah 28:11 · 1 Corinthians 14:21–22' },
  { t: 'Born in 1901', p: 'The modern practice has a birthday and an address: January 1, 1901, Topeka, Kansas. Claimed as missionary languages, it failed on the mission field — and was redefined as a “heavenly language.”', vf: 'Documented in chapters 11–12' },
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
        <Reveal as="h2" className="display h2" delay={1}>SIX PILLARS OF <span className="accent">THE BIBLICAL GIFT</span></Reveal>
        <Reveal className="lede" delay={2}>
          Walked in order — Babel, Pentecost, Caesarea, Ephesus, Corinth — the evidence yields one
          consistent portrait, and it looks nothing like the modern phenomenon that borrowed its name.
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
      </div>
    </section>
  )
}

const TIMELINE = [
  { when: 'c. AD 31', what: 'Pentecost. The gift is given as real languages, publicly verified by pilgrims from fifteen regions.', crisis: false },
  { when: '2nd century', what: 'Montanism’s ecstatic prophecy is rejected by the church — in part because its frenzy contradicted 1 Corinthians 14.', crisis: false },
  { when: '4th–5th centuries', what: 'Chrysostom and Augustine testify plainly that the gift had ceased in their era.', crisis: false },
  { when: '1801', what: 'Cane Ridge, Kentucky: mass falling, jerking, barking — revival phenomena with no biblical precedent.', crisis: true },
  { when: '1880s', what: 'Maria Woodworth-Etter makes trance and falling a platform practice. The lineage runs straight to modern television healers.', crisis: true },
  { when: 'Jan 1, 1901', what: 'Topeka, Kansas. Agnes Ozman speaks in “tongues” at Parham’s Bethel Bible School. The modern movement is born — as claimed missionary languages.', crisis: true },
  { when: '1901–1910', what: 'Missionaries reach India, China, and Japan — and no one understands a word. Tongues is quietly redefined as a “heavenly language.”', crisis: true },
  { when: '1906', what: 'Azusa Street, Los Angeles. Global Pentecostalism launches.', crisis: true },
  { when: '1960–1980s', what: 'The Charismatic renewal and “Third Wave” carry the practice into nearly every denomination.', crisis: true },
  { when: '1994–2008', what: 'Toronto. Brownsville. Lakeland. Manifestation-driven revivalism peaks — and collapses under its own fruit.', crisis: true },
]

function Timeline() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.8', 'end 0.6'] })
  return (
    <section className="timeline-sec" id="history">
      <div className="wrap">
        <Reveal className="kicker">Twenty Centuries</Reveal>
        <Reveal as="h2" className="display h2" delay={1}>FROM PENTECOST <span className="accent">TO TOPEKA</span></Reveal>
        <Reveal className="lede" delay={2}>
          If ecstatic tongues had always been normal Christian devotion, history would show it.
          Instead, the record shows eighteen silent centuries — and then a re-invention.
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
        <Reveal as="h2" className="display h2" delay={1}>NINETEEN CHAPTERS. <span className="accent">EVERY ARGUMENT ANSWERED.</span></Reveal>
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

function Download() {
  return (
    <section className="download-sec" id="download">
      <div className="wrap download-inner">
        <motion.div className="cover-wrap"
          initial={{ opacity: 0, y: 50, rotateY: -14 }}
          whileInView={{ opacity: 1, y: 0, rotateY: -8 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ rotateY: 0, scale: 1.03 }}>
          <img className="cover-img" src="/cover.jpg" alt="I Speak in Tongues — book cover" />
        </motion.div>
        <div className="dl-copy">
          <Reveal className="kicker" style={{ textAlign: 'inherit' }}>Read It Free</Reveal>
          <Reveal as="h2" className="display h2" delay={1}>GET THE <span className="accent">BOOK</span></Reveal>
          <Reveal className="lede" delay={2}>
            The complete investigation — free to download, free to share. Bring every experience,
            however powerful, to the bar of Scripture.
          </Reveal>
          <Reveal className="stats" delay={3}>
            <div className="stat"><div className="n">19</div><div className="l">Chapters</div></div>
            <div className="stat"><div className="n">77</div><div className="l">Pages</div></div>
            <div className="stat"><div className="n">200+</div><div className="l">Scriptures</div></div>
            <div className="stat"><div className="n">$0</div><div className="l">Forever</div></div>
          </Reveal>
          <Reveal delay={4}>
            <a className="btn primary" href={PDF} download>Download Free PDF</a>
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
        <Reveal as="p" delay={3}>
          Shadai Perez is a filmmaker and writer at SP7 Studios, an award-winning production studio.
          This investigation grew out of years of study and firsthand experience with the questions it
          examines — and out of the conviction that sincerity deserves the truth: test all things,
          and hold fast what is good.
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
  return (
    <>
      <motion.nav className="nav" initial={{ y: -70 }} animate={{ y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
        <a className="mark display" href="#top">I SPEAK IN <s>TONGUES</s></a>
        <div className="links">
          <a href="#evidence">The Evidence</a>
          <a href="#history">History</a>
          <a href="#inside">Inside</a>
          <a href="#author">Author</a>
          <a className="dl" href={PDF} download>Free PDF</a>
        </div>
      </motion.nav>
      <Hero />
      <Question />
      <Evidence />
      <Timeline />
      <Chapters />
      <Download />
      <Author />
      <Footer />
    </>
  )
}
