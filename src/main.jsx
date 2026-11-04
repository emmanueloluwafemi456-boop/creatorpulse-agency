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
  Search,
  MessageCircle,
  MousePointer2,
  FileCheck2,
  Twitch,
  Sparkles,
  CircleCheck,
  Monitor,
} from "lucide-react";
import { channelServices, process, faqs } from "./data";
import { ChannelServices, ChannelServiceDetails } from "./ChannelServices";
import { siteConfig } from "./config";
import Contact, { ContactOptions } from "./Contact";
import "@fontsource/inter/latin-400.css";
import "@fontsource/inter/latin-500.css";
import "@fontsource/inter/latin-600.css";
import "@fontsource/inter/latin-700.css";
import "@fontsource/space-grotesk/latin-500.css";
import "@fontsource/space-grotesk/latin-600.css";
import "@fontsource/space-grotesk/latin-700.css";
import "./styles.css";
const navigation = [
  ["Start here", "home"],
  ["About me", "about"],
  ["Services", "services"],
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
        Emmanuel<small>TWITCH CHANNEL SUPPORT</small>
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
function App() {
  const [menu, setMenu] = useState(false),
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
                  <span className="gradient-text">find their direction.</span>
                  <br />
                  And build from there.
                </h1>
                <p className="hero-description">
                  Channel reviews, audience insight, creator pages, and
                  practical promotion support. I work directly with you to
                  choose useful next steps for your Twitch channel — at the
                  stage you’re at now.
                </p>
                <div className="hero-actions">
                  <a href="#contact" className="button primary">
                    Let’s talk about your channel <ArrowUpRight size={17} />
                  </a>
                  <a href="#services" className="button secondary">
                    Explore channel services <ArrowRight size={16} />
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
                    alt="Emmanuel, Twitch channel support specialist"
                    width="896"
                    height="1346"
                    fetchPriority="high"
                  />
                </div>
                <div className="portrait-name">
                  <span className="signature">Emmanuel</span>
                  <small>YOUR CHANNEL SUPPORT PARTNER</small>
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
                  "A useful starting point",
                  "Channel reviews with practical priorities.",
                ],
                [
                  Monitor,
                  "An audience perspective",
                  "Feedback that can inform your next move.",
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
              <span>CHANNEL AUDITS</span>
              <i />
              <span>AUDIENCE FEEDBACK</span>
              <i />
              <span>CREATOR PAGES</span>
              <i />
              <span>PROMOTION STRATEGY</span>
              <i />
              <span>CHANNEL MANAGEMENT</span>
            </div>
          </div>
        </section>
        <section id="about" className="section container">
          <Reveal className="about-grid">
            <div className="about-photo">
              <img
                src="./emmanuel-portrait.webp"
                alt="Emmanuel, your personal Twitch channel support partner"
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
                I help Twitch creators choose practical next steps through
                channel reviews, audience feedback, creator pages, and relevant
                promotion support.
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
                    "Hands-on channel support",
                    "You work directly with me, from the first idea to the final details.",
                  ],
                  [
                    Palette,
                    "Your goals come first",
                    "The work starts with your content, your audience, and your goals.",
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
                  "Support matched to your stage",
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
                    "You want useful support for the stage your channel is at.",
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
                    "You need account shortcuts instead of thoughtful channel work.",
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
        <ChannelServices onSelect={setModal} />
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
              <div className="faq-contact-choices">
                <span>Ask me directly</span>
                <ContactOptions compact location="faq" />
              </div>
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
      <footer className="professional-footer">
        <div className="container footer-columns">
          <div className="footer-identity">
            <a className="footer-wordmark" href="#home">
              Emmanuel<span>.</span>
            </a>
            <span className="footer-specialty">TWITCH CHANNEL SUPPORT</span>
            <p>
              Clear priorities and practical support
              <br />
              for your next stage as a creator.
            </p>
          </div>
          <nav className="footer-navigation" aria-label="Footer navigation">
            <h2>EXPLORE</h2>
            {navigation.slice(1).map(([name, id]) => (
              <a href={"#" + id} key={id}>
                {name}
              </a>
            ))}
          </nav>
          <div className="footer-connect">
            <h2>START A CONVERSATION</h2>
            <ContactOptions compact location="footer" />
            <span className="footer-email-address">{siteConfig.email}</span>
          </div>
        </div>
        <div className="container footer-legal">
          <span>
            © {new Date().getFullYear()} Emmanuel. All rights reserved.
          </span>
          <span>
            Independent service provider. Not affiliated with Twitch or Google.
          </span>
          <a href="#home" className="back-top">
            Back to top <ArrowUp size={14} />
          </a>
        </div>
      </footer>
      {modal && (
        <Modal title={modal.title} onClose={() => setModal(null)}>
          <ChannelServiceDetails
            service={modal}
            onInquire={() => inquire(modal.title)}
          />
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
