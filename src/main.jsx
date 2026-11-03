import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  ArrowRight,
  ArrowUp,
  Menu,
  X,
  Plus,
  Minus,
  Check,
  Palette,
  Image,
  Layers,
  LayoutGrid,
  Search,
  Megaphone,
  Clapperboard,
  ScanLine,
  MessageCircle,
  MousePointer2,
  FileCheck2,
  Twitch,
  Sparkles,
  Copy,
  Send,
  CircleCheck,
  Eye,
  Monitor,
  Play,
  Radio,
} from "lucide-react";
import { services, projects, process, faqs } from "./data";
import { siteConfig } from "./config";
import "@fontsource/inter/latin-400.css";
import "@fontsource/inter/latin-500.css";
import "@fontsource/inter/latin-600.css";
import "@fontsource/inter/latin-700.css";
import "@fontsource/space-grotesk/latin-500.css";
import "@fontsource/space-grotesk/latin-600.css";
import "@fontsource/space-grotesk/latin-700.css";
import "./styles.css";
const iconMap = {
  Palette,
  Image,
  Layers,
  LayoutGrid,
  Search,
  Megaphone,
  Clapperboard,
  ScanLine,
};
const navigation = [
  ["Start here", "home"],
  ["About me", "about"],
  ["Services", "services"],
  ["My work", "work"],
  ["How I work", "process"],
  ["Contact", "contact"],
];
function Logo() {
  return (
    <a className="logo" href="#home" aria-label="Emmanuel home">
      <span className="monogram">
        e<span>.</span>
      </span>
      <span>
        Emmanuel<small>TWITCH CREATIVE SPECIALIST</small>
      </span>
    </a>
  );
}
function Reveal({ children, className = "" }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.07 }}
      transition={{ duration: 0.45 }}
    >
      {children}
    </motion.div>
  );
}
function Eyebrow({ children }) {
  return <div className="eyebrow">{children}</div>;
}
function Modal({ title, children, onClose }) {
  const ref = useRef();
  useEffect(() => {
    const prev = document.activeElement,
      overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    ref.current.focus();
    function key(e) {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab") {
        const nodes = ref.current.querySelectorAll(
          "button,a[href],input,select,textarea",
        );
        const first = nodes[0],
          last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
    document.addEventListener("keydown", key);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", key);
      prev?.focus();
    };
  }, [onClose]);
  return (
    <div
      className="modal-backdrop"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <section
        ref={ref}
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        tabIndex={-1}
      >
        <button
          className="icon-button modal-close"
          aria-label="Close details"
          onClick={onClose}
        >
          <X size={20} />
        </button>
        <h2 id="modal-title">{title}</h2>
        {children}
      </section>
    </div>
  );
}
function WorkVisual({ project, large = false }) {
  return (
    <div
      className={`work-visual ${project.theme} ${large ? "large" : ""}`}
      role="img"
      aria-label={`${project.name}: original ${project.category.toLowerCase()} concept`}
    >
      <div className="visual-grain" />
      <div className="visual-orbit one" />
      <div className="visual-orbit two" />
      <div className="visual-top">
        <span>
          <Twitch size={11} />{" "}
          {project.theme === "discovery" ? "CHANNEL NOTES" : "STREAM IDENTITY"}
        </span>
        <span>PERSONAL PROJECT / 0{projects.indexOf(project) + 1}</span>
      </div>
      {project.theme === "volt" ? (
        <div className="overlay-demo">
          <div className="overlay-landscape">
            <span className="mountain mountain-one" />
            <span className="mountain mountain-two" />
            <div className="overlay-title">
              <span>LIVE YOUR WAY</span>
              <strong>
                VOLT
                <ArrowUpRight size={24} />
              </strong>
            </div>
            <div className="camera-box">
              <Eye size={20} />
              <span>YOUR CAMERA</span>
            </div>
          </div>
          <div className="chat-demo">
            <span>STREAM CHAT</span>
            <i />
            <i />
            <i />
            <i />
            <div>
              <MessageCircle size={12} /> YOUR COMMUNITY
            </div>
          </div>
        </div>
      ) : project.theme === "discovery" ? (
        <div className="channel-demo">
          <div className="channel-demo-heading">
            <span>e.</span>
            <div>
              <strong>YOUR CHANNEL</strong>
              <small>A clear introduction starts here.</small>
            </div>
          </div>
          <div className="channel-panels">
            <span>
              ABOUT ME <ArrowUpRight size={12} />
            </span>
            <span>
              THE SCHEDULE <ArrowUpRight size={12} />
            </span>
            <span>
              OUR COMMUNITY <ArrowUpRight size={12} />
            </span>
          </div>
          <div className="channel-line" />
          <div className="channel-line short" />
        </div>
      ) : (
        <div className="visual-title">
          <span>
            {project.theme === "signal"
              ? "TAKE A BREATH. STAY A WHILE."
              : "A CHANNEL WITH ITS OWN CHARACTER"}
          </span>
          <strong>
            {project.mark}
            {project.theme === "nova" && <Sparkles />}
          </strong>
          <p>{project.tag}</p>
          {project.theme === "signal" && (
            <div className="loading-track">
              <i />
            </div>
          )}
        </div>
      )}
      <div className="visual-bottom">
        <span>DESIGNED BY EMMANUEL</span>
        <span>
          {project.theme === "signal"
            ? "STREAM WILL RETURN"
            : "CONCEPT / NOT CLIENT WORK"}
        </span>
      </div>
    </div>
  );
}
function Contact({ interest, setInterest }) {
  const [draft, setDraft] = useState(""),
    [copied, setCopied] = useState(false);
  function submit(e) {
    e.preventDefault();
    const f = Object.fromEntries(new FormData(e.currentTarget));
    const body = `Hi Emmanuel,\n\nMy name is ${f.name}.\nEmail: ${f.email}\nTwitch channel: ${f.channel || "Not supplied"}\nI'm interested in: ${f.service}\n\n${f.message}`;
    setDraft(body);
    setCopied(false);
  }
  return (
    <div className="contact-grid">
      <div>
        <Eyebrow>LET’S TALK ABOUT YOUR CHANNEL</Eyebrow>
        <h2>
          Have a stream.
          <br />
          Have a vision.
          <br />
          <span className="gradient-text">Let’s connect.</span>
        </h2>
        <p>
          Whether you need one banner, a full channel identity, or a clearer
          direction — tell me what you’re thinking.
        </p>
        <div className="contact-person">
          <img
            src="./emmanuel-portrait.webp"
            alt=""
            width="48"
            height="48"
            loading="lazy"
          />
          <div>
            <strong>You’ll be talking to me.</strong>
            <span>Emmanuel · Twitch creative specialist</span>
          </div>
          <MessageCircle size={20} />
        </div>
        {siteConfig.email ? (
          <a className="email-link" href={`mailto:${siteConfig.email}`}>
            {siteConfig.email}
            <ArrowUpRight size={18} />
          </a>
        ) : (
          <p className="contact-status">
            My direct contact details haven’t been added here yet. You can
            prepare and copy your project brief using this form; nothing is
            sent.
          </p>
        )}
        {siteConfig.fiverr && (
          <a
            className="text-link"
            href={siteConfig.fiverr}
            target="_blank"
            rel="noreferrer"
          >
            Work with me on Fiverr <ArrowUpRight size={15} />
          </a>
        )}
      </div>
      <form className="contact-form" onSubmit={submit}>
        <h3>What would you like to create?</h3>
        <div className="form-grid">
          <label>
            Your name
            <input
              name="name"
              autoComplete="name"
              required
              placeholder="Your name"
              maxLength={100}
            />
          </label>
          <label>
            Email address
            <input
              name="email"
              autoComplete="email"
              type="email"
              required
              placeholder="you@example.com"
            />
          </label>
          <label className="wide">
            Twitch channel <span>(optional)</span>
            <input
              name="channel"
              type="url"
              placeholder="https://twitch.tv/yourchannel"
            />
          </label>
          <label className="wide">
            What can I help you with?
            <select
              name="service"
              value={interest}
              onChange={(e) => setInterest(e.target.value)}
              required
            >
              <option disabled value="">
                Choose a service
              </option>
              {services.map((s) => (
                <option key={s[1]}>{s[1]}</option>
              ))}
              <option>Let’s figure it out together</option>
            </select>
          </label>
          <label className="wide">
            A little about your project
            <textarea
              name="message"
              required
              minLength={10}
              maxLength={5000}
              rows={4}
              placeholder="Your goals, the style you like, and what you need help with…"
            />
          </label>
        </div>
        <button className="button primary full" type="submit">
          {siteConfig.email
            ? "Prepare my email inquiry"
            : "Prepare my project brief"}
          <ArrowUpRight size={16} />
        </button>
        <small>
          {siteConfig.email
            ? "Prepare a draft, then open your email app to review and send."
            : "Draft only — no message is submitted or stored."}
        </small>
        {draft && (
          <div className="draft-result" role="status">
            <strong>Your project brief is ready.</strong>
            {siteConfig.email && (
              <a
                className="button primary email-draft"
                href={`mailto:${siteConfig.email}?subject=${encodeURIComponent("Twitch project inquiry")}&body=${encodeURIComponent(draft)}`}
                target="_blank"
                rel="noreferrer"
              >
                Open my email app <ArrowUpRight size={15} />
              </a>
            )}
            <p>No message has been submitted through this website.</p>
            <textarea
              aria-label="Your prepared project brief"
              readOnly
              rows={7}
              value={draft}
            />
            <button
              type="button"
              className="button secondary"
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(draft);
                  setCopied(true);
                } catch {
                  setCopied(false);
                }
              }}
            >
              <Copy size={15} />
              {copied ? "Copied" : "Copy my brief"}
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
function App() {
  const [menu, setMenu] = useState(false),
    [filter, setFilter] = useState("All work"),
    [modal, setModal] = useState(null),
    [interest, setInterest] = useState("");
  function inquire(service = "") {
    setInterest(service);
    setModal(null);
  }
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <header>
        <div className="nav-wrap">
          <Logo />
          <nav aria-label="Main navigation">
            {navigation.map(([name, id], i) => (
              <a className={i === 0 ? "nav-home" : ""} href={"#" + id} key={id}>
                {name}
              </a>
            ))}
          </nav>
          <a className="button primary nav-contact" href="#contact">
            Let’s talk <ArrowUpRight size={14} />
          </a>
          <button
            className="icon-button menu-toggle"
            aria-expanded={menu}
            aria-controls="mobile-menu"
            aria-label={menu ? "Close menu" : "Open menu"}
            onClick={() => setMenu(!menu)}
          >
            {menu ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
        {menu && (
          <nav
            id="mobile-menu"
            className="mobile-menu"
            aria-label="Mobile navigation"
          >
            {navigation.map(([name, id]) => (
              <a href={"#" + id} key={id} onClick={() => setMenu(false)}>
                {name}
              </a>
            ))}
          </nav>
        )}
      </header>
      <main id="main">
        <section id="home" className="hero">
          <div className="hero-wash" />
          <div className="container">
            <div className="hero-grid">
              <Reveal className="hero-copy">
                <div className="intro-label">
                  <span /> YOUR CHANNEL. YOUR PERSONALITY. YOUR NEXT CHAPTER.
                </div>
                <p className="hello">
                  Hey, I’m Emmanuel <ArrowUpRight size={17} />
                </p>
                <h1>
                  I help Twitch creators
                  <br />
                  <span className="gradient-text">look the part.</span>
                  <br />
                  And stand out.
                </h1>
                <p className="hero-description">
                  Channel branding, stream graphics, and thoughtful promotion
                  support. I work directly with you to build a Twitch presence
                  that feels like you — and gives people a reason to remember.
                </p>
                <div className="hero-actions">
                  <a href="#contact" className="button primary">
                    Let’s talk about your channel <ArrowUpRight size={17} />
                  </a>
                  <a href="#work" className="button secondary">
                    Explore my work <ArrowRight size={16} />
                  </a>
                </div>
                <div className="hero-personal-note">
                  <MessageCircle size={14} />
                  <span>
                    One creator. One conversation. Work made around you.
                  </span>
                </div>
              </Reveal>
              <Reveal className="hero-portrait">
                <div className="portrait-orbit orbit-a" />
                <div className="portrait-orbit orbit-b" />
                <span className="portrait-star star-one">
                  <Sparkles size={24} />
                </span>
                <div className="portrait-circle">
                  <img
                    src="./emmanuel-portrait.webp"
                    alt="Emmanuel, Twitch branding and channel services specialist"
                    width="896"
                    height="1346"
                    fetchPriority="high"
                  />
                </div>
                <div className="portrait-name">
                  <span className="signature">Emmanuel</span>
                  <small>YOUR CREATIVE PARTNER</small>
                </div>
                <div className="portrait-tag">
                  <Twitch size={17} />
                  <span>
                    Built around
                    <br />
                    <strong>your stream.</strong>
                  </span>
                </div>
                <span className="portrait-scribble">
                  a real person,
                  <br />
                  in your corner <ArrowUpRight size={23} />
                </span>
              </Reveal>
            </div>
            <Reveal className="capabilities">
              {[
                [
                  Palette,
                  "An identity that fits",
                  "Branding with your personality in it.",
                ],
                [
                  Monitor,
                  "A stream that feels connected",
                  "Graphics that work together on screen.",
                ],
                [
                  Search,
                  "A clearer channel presence",
                  "Thoughtful presentation & discovery.",
                ],
                [
                  MessageCircle,
                  "A direct collaboration",
                  "You and me, from brief to delivery.",
                ],
              ].map(([Icon, title, text]) => (
                <div key={title}>
                  <Icon size={19} />
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              ))}
            </Reveal>
            <div className="expertise-line">
              <span>TWITCH BRANDING</span>
              <i />
              <span>OVERLAYS & ALERTS</span>
              <i />
              <span>CHANNEL OPTIMIZATION</span>
              <i />
              <span>PROMOTION STRATEGY</span>
              <i />
              <span>CREATOR-FIRST DESIGN</span>
            </div>
          </div>
        </section>
        <section id="about" className="section container">
          <Reveal className="about-grid">
            <div className="about-photo">
              <img
                src="./emmanuel-portrait.webp"
                alt="Emmanuel, your personal Twitch creative partner"
                width="896"
                height="1346"
                loading="lazy"
              />
              <div className="photo-caption">
                <span>
                  <strong>Personal</strong>One-to-one collaboration
                </span>
                <span>
                  <strong>Intentional</strong>Every detail has a purpose
                </span>
                <span>
                  <strong>Yours</strong>Made for your channel
                </span>
              </div>
              <span className="photo-index">
                01 / THE PERSON BEHIND THE WORK
              </span>
            </div>
            <div className="about-copy">
              <Eyebrow>A FACE BEHIND THE WORK</Eyebrow>
              <h2>
                I’m Emmanuel.
                <br />
                <span className="muted">
                  Your channel deserves
                  <br />a personal approach.
                </span>
              </h2>
              <p>
                I help Twitch creators bring their ideas into focus — through
                distinctive channel graphics, a more consistent identity, and
                practical direction for how they show up.
              </p>
              <p>
                Tell me what you stream, what you care about, and where you want
                to go. I’ll work with you on the details that make your channel
                feel more like your own.
              </p>
              <div className="about-features">
                {[
                  [
                    MousePointer2,
                    "Hands-on creative work",
                    "You work directly with me, from the first idea to the final details.",
                  ],
                  [
                    Palette,
                    "Your personality comes first",
                    "The visual direction starts with your content, taste, and community.",
                  ],
                  [
                    FileCheck2,
                    "Clear from the beginning",
                    "We agree the deliverables, feedback process, and schedule before starting.",
                  ],
                ].map(([Icon, title, text]) => (
                  <div key={title}>
                    <span>
                      <Icon size={18} />
                    </span>
                    <div>
                      <h3>{title}</h3>
                      <p>{text}</p>
                    </div>
                  </div>
                ))}
              </div>
              <ul className="about-checks">
                {[
                  "Direct communication",
                  "Tailored visual direction",
                  "Clear project scope",
                  "Practical channel guidance",
                ].map((x) => (
                  <li key={x}>
                    <Check size={13} />
                    {x}
                  </li>
                ))}
              </ul>
              <a href="#contact" className="button primary">
                Tell me about your channel <ArrowUpRight size={16} />
              </a>
            </div>
          </Reveal>
        </section>
        <section id="fit" className="fit-section section">
          <div className="container">
            <Reveal className="center-heading">
              <Eyebrow>IS THIS A GOOD FIT?</Eyebrow>
              <h2>
                For creators who care
                <br className="mobile-break" /> about their channel.
              </h2>
              <p>
                You don’t need a huge audience. A clear intention is a good
                place to start.
              </p>
            </Reveal>
            <div className="fit-grid">
              <Reveal className="fit-card positive">
                <div className="fit-title">
                  <CircleCheck size={19} />
                  <h3>We’ll work well together if…</h3>
                </div>
                <ul>
                  {[
                    "You want your channel to feel more like you.",
                    "You need branding, graphics, or a clearer channel direction.",
                    "You care about real viewers and a genuine community.",
                    "You’re open to ideas and ready to share useful feedback.",
                    "You want to work directly with the person doing the work.",
                  ].map((x) => (
                    <li key={x}>
                      <Check size={15} />
                      {x}
                    </li>
                  ))}
                </ul>
                <a href="#contact" className="text-link">
                  Sounds like you? Let’s talk <ArrowUpRight size={15} />
                </a>
              </Reveal>
              <Reveal className="fit-card">
                <div className="fit-title">
                  <X size={19} />
                  <h3>I’m probably not the right fit if…</h3>
                </div>
                <ul>
                  {[
                    "You’re looking to buy followers, viewers, or engagement.",
                    "You expect guaranteed growth or instant monetization.",
                    "You want to copy another creator’s identity or artwork.",
                    "You need account shortcuts instead of thoughtful creative work.",
                  ].map((x) => (
                    <li key={x}>
                      <X size={14} />
                      {x}
                    </li>
                  ))}
                </ul>
                <p className="fit-bottom-note">
                  Good work starts with honest expectations — on both sides.
                </p>
              </Reveal>
            </div>
          </div>
        </section>
        <section id="services" className="section container">
          <Reveal className="center-heading">
            <Eyebrow>TWITCH SERVICES, WITH A PERSONAL TOUCH</Eyebrow>
            <h2>How I can help you.</h2>
            <p>
              A single asset or a more connected channel presence. Let’s start
              with what you need.
            </p>
          </Reveal>
          <Reveal className="services-intro">
            <Sparkles size={18} />
            <div>
              <span>WHAT CAN WE WORK ON TOGETHER?</span>
              <p>
                I offer Twitch branding, banners, overlays, alerts, panels,
                channel optimization, and promotion guidance. Every project
                starts with your channel and an agreed scope — no fixed bundles
                to squeeze into.
              </p>
            </div>
          </Reveal>
          <div className="services-grid">
            {services.map((s, i) => {
              const Icon = iconMap[s[0]];
              return (
                <Reveal key={s[1]} className="service-card">
                  <button
                    aria-label={"Explore " + s[1]}
                    onClick={() => setModal({ type: "service", item: s })}
                  >
                    <span className="service-icon">
                      <Icon size={19} />
                    </span>
                    <ArrowUpRight className="service-arrow" size={16} />
                    <h3>{s[1]}</h3>
                    <p>{s[2]}</p>
                    <span className="service-more">
                      Explore the service <ArrowRight size={12} />
                    </span>
                  </button>
                </Reveal>
              );
            })}
            <Reveal className="service-card service-question">
              <span className="question-mark">?</span>
              <h3>Not sure what you need?</h3>
              <p>
                Send me your channel. We can talk through a useful starting
                point.
              </p>
              <a
                href="#contact"
                onClick={() => setInterest("Let’s figure it out together")}
                className="text-link"
              >
                Let’s figure it out <ArrowUpRight size={14} />
              </a>
            </Reveal>
          </div>
        </section>
        <section id="work" className="section work-section">
          <div className="container">
            <Reveal className="work-heading">
              <div>
                <Eyebrow>A FEEL FOR MY CREATIVE DIRECTION</Eyebrow>
                <h2>
                  Different personalities.
                  <br />
                  <span className="muted">Different possibilities.</span>
                </h2>
              </div>
              <div>
                <p>
                  Original Twitch concepts that show how I think about identity,
                  layout, and the details on screen.
                </p>
                <span className="concept-disclosure">
                  PERSONAL CONCEPTS · NOT CLIENT PROJECTS
                </span>
              </div>
            </Reveal>
            <div className="filters" role="group" aria-label="Filter my work">
              {[
                "All work",
                "Channel Branding",
                "Banner Designs",
                "Stream Overlays",
                "Channel Concepts",
              ].map((x) => (
                <button
                  key={x}
                  aria-pressed={filter === x}
                  onClick={() => setFilter(x)}
                  className={filter === x ? "active" : ""}
                >
                  {x}
                </button>
              ))}
            </div>
            <div className="work-grid" aria-live="polite">
              {projects
                .filter((p) => filter === "All work" || filter === p.category)
                .map((p, i) => (
                  <button
                    className="project-card"
                    key={p.name}
                    onClick={() => setModal({ type: "project", item: p })}
                  >
                    <div className="project-image">
                      <WorkVisual project={p} />
                      <span className="project-view">
                        Explore concept <ArrowUpRight size={16} />
                      </span>
                    </div>
                    <div className="project-caption">
                      <div>
                        <span>
                          {p.category} <i /> Concept project
                        </span>
                        <h3>
                          {p.name} <span>— {p.subtitle}</span>
                        </h3>
                      </div>
                      <ArrowUpRight size={22} />
                    </div>
                  </button>
                ))}
            </div>
            <div className="work-bottom">
              <span>Have a different style in mind? I’d love to hear it.</span>
              <a href="#contact" className="text-link">
                Let’s create something yours <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        </section>
        <section id="process" className="section container">
          <Reveal className="process-heading">
            <div>
              <Eyebrow>NO COMPLICATED PLAYBOOK</Eyebrow>
              <h2>
                A conversation.
                <br />
                Then a clear way forward.
              </h2>
            </div>
            <p>
              Here’s what working with me looks like. Simple steps, shared
              expectations, room for your ideas.
            </p>
          </Reveal>
          <div className="process-grid">
            {process.map(([title, text], i) => (
              <Reveal key={title} className="process-card">
                <span className="process-number">0{i + 1}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </Reveal>
            ))}
          </div>
        </section>
        <section className="section faq-section">
          <div className="container faq-grid">
            <Reveal>
              <Eyebrow>A FEW THINGS YOU MIGHT BE WONDERING</Eyebrow>
              <h2>
                Before we
                <br />
                <span className="muted">get started.</span>
              </h2>
              <p>
                Have another question?
                <br />
                There’s a real person on the other side.
              </p>
              <a href="#contact" className="text-link">
                Ask me directly <ArrowUpRight size={16} />
              </a>
            </Reveal>
            <div className="faq-list">
              {faqs.map(([q, a]) => (
                <details key={q}>
                  <summary>
                    {q}
                    <Plus className="faq-plus" size={17} />
                    <Minus className="faq-minus" size={17} />
                  </summary>
                  <p>{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
        <section id="contact" className="section container">
          <Reveal>
            <Contact interest={interest} setInterest={setInterest} />
          </Reveal>
        </section>
      </main>
      <footer>
        <div className="container footer-top">
          <Logo />
          <span>Good design. Clear direction. Your kind of channel.</span>
          <a href="#home" className="back-top">
            Back to top <ArrowUp size={14} />
          </a>
        </div>
        <div className="container footer-bottom">
          <span>
            © {new Date().getFullYear()} Emmanuel. Personal portfolio.
          </span>
          <div>
            {navigation.slice(1).map(([name, id]) => (
              <a href={"#" + id} key={id}>
                {name}
              </a>
            ))}
          </div>
          <span>Independent. Not affiliated with Twitch.</span>
        </div>
        {Object.values(siteConfig.socials).some(Boolean) && (
          <div className="container social-links">
            {Object.entries(siteConfig.socials)
              .filter(([, url]) => url)
              .map(([name, url]) => (
                <a key={name} href={url} target="_blank" rel="noreferrer">
                  {name}
                  <ArrowUpRight size={14} />
                </a>
              ))}
          </div>
        )}
      </footer>
      {modal && (
        <Modal
          title={modal.type === "service" ? modal.item[1] : modal.item.name}
          onClose={() => setModal(null)}
        >
          {modal.type === "service" ? (
            <>
              <Eyebrow>HOW I CAN HELP YOUR CHANNEL</Eyebrow>
              <p>{modal.item[4]}</p>
              <h3>What we can work on</h3>
              <ul className="modal-deliverables">
                {modal.item[3].map((x) => (
                  <li key={x}>
                    <Check size={16} />
                    {x}
                  </li>
                ))}
              </ul>
              <p className="scope-note">
                We’ll agree the exact scope, file formats, revisions, and timing
                before work begins.
              </p>
              <a
                href="#contact"
                className="button primary"
                onClick={() => inquire(modal.item[1])}
              >
                Ask me about this service <ArrowUpRight size={16} />
              </a>
            </>
          ) : (
            <>
              <WorkVisual project={modal.item} large />
              <span className="concept-disclosure">
                PERSONAL CONCEPT · {modal.item.category}
              </span>
              <p>{modal.item.description}</p>
              <h3>The thinking behind it</h3>
              <p>{modal.item.approach}</p>
              <h3>Concept deliverables</h3>
              <ul className="modal-deliverables">
                {modal.item.deliverables.map((x) => (
                  <li key={x}>
                    <Check size={16} />
                    {x}
                  </li>
                ))}
              </ul>
              <p className="scope-note">
                An original fictional design exploration. This is not
                commissioned client work, a live account review, or evidence of
                campaign performance.
              </p>
              <a
                href="#contact"
                className="button primary"
                onClick={() => inquire()}
              >
                Have something like this in mind? <ArrowUpRight size={16} />
              </a>
            </>
          )}
        </Modal>
      )}
    </>
  );
}
createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
