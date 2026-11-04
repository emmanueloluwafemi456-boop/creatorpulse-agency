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
import ServicesTicker from "./ServicesTicker";
import NextStepGuide from "./NextStepGuide";
import InquiryStarter from "./InquiryStarter";
import PlatformStrip from "./PlatformStrip";
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
        Emmanuel
        <small>
          TWITCH CHANNEL <span>GROWTH EXPERT</span>
        </small>
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
                  <span /> TWITCH GROWTH STRATEGY. HANDS-ON DELIVERY.
                </div>
                <p className="hello">
                  Hey, I’m Emmanuel <ArrowUpRight size={17} />
                </p>
                <h1>
                  I help Twitch creators
                  <br />
                  <span className="gradient-text">grow their presence.</span>
                  <br />
                  From plan to action.
                </h1>
                <p className="hero-description">
                  I combine channel growth strategy, audience research, creator
                  pages, paid promotion, and ongoing management to help you
                  build a stronger Twitch presence. We turn your goals into work
                  that gets planned, created, launched, and refined.
                </p>
                <div className="hero-actions">
                  <a href="#contact" className="button primary">
                    Plan my channel growth <ArrowUpRight size={17} />
                  </a>
                  <a href="#services" className="button secondary">
                    Explore growth services <ArrowRight size={16} />
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
                    alt="Emmanuel, Twitch channel growth expert"
                    width="896"
                    height="1346"
                    fetchPriority="high"
                  />
                </div>
                <div className="portrait-name">
                  <span className="signature">Emmanuel</span>
                  <small>STRATEGY · PROMOTION · DELIVERY</small>
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
                  "Growth strategy",
                  "A clear direction for your channel and audience.",
                ],
                [
                  Monitor,
                  "Audience understanding",
                  "Research to guide stronger content and promotion decisions.",
                ],
                [
                  Search,
                  "Promotion & presence",
                  "Creator pages and campaigns built around your content.",
                ],
                [
                  MessageCircle,
                  "Hands-on execution",
                  "Your agreed plan put into practice, with me doing the work.",
                ],
              ].map(([Icon, title, text]) => (
                <div key={title}>
                  <Icon size={19} />
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              ))}
            </Reveal>
            <ServicesTicker />
          </div>
        </section>
        <PlatformStrip />
        <section id="about" className="section container">
          <Reveal className="about-grid">
            <div className="about-photo">
              <img
                src="./emmanuel-portrait.webp"
                alt="Emmanuel, your Twitch channel growth expert and service provider"
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
                  Your growth strategy.
                  <br />
                  My hands-on execution.
                </span>
              </h2>
              <p>
                I’m a Twitch channel growth expert offering the strategy and
                practical services creators need to develop their channel. I
                work across audience understanding, creator presence, promotion,
                and ongoing channel management.
              </p>
              <p>
                Depending on the project, I build creator pages, prepare
                audience surveys, develop and manage campaigns, coordinate
                channel activity, and turn findings into work you can put to
                use. You work directly with me from the initial growth direction
                through delivery and review.
              </p>
              <div className="about-features">
                {[
                  [
                    MousePointer2,
                    "Strategy with execution",
                    "A clear plan, followed by the agreed work to bring it into practice.",
                  ],
                  [
                    Palette,
                    "Growth shaped around your channel",
                    "Your content, audience, resources, and goals shape the direction.",
                  ],
                  [
                    FileCheck2,
                    "One point of contact",
                    "You work directly with me through planning, delivery, and review.",
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
                  "Channel growth strategy",
                  "Hands-on project delivery",
                  "Promotion and management",
                  "Clear scope and communication",
                ].map((x) => (
                  <li key={x}>
                    <Check size={13} />
                    {x}
                  </li>
                ))}
              </ul>
              <a href="#contact" className="button primary">
                Discuss my growth goals <ArrowUpRight size={16} />
              </a>
            </div>
            <NextStepGuide onExplore={setModal} onInquire={inquire} />
          </Reveal>
        </section>
        <section id="fit" className="fit-section section">
          <div className="container">
            <Reveal className="center-heading">
              <Eyebrow>IS THIS A GOOD FIT?</Eyebrow>
              <h2>
                For creators ready to build
                <br className="mobile-break" /> their next stage.
              </h2>
              <p>
                Starting out, repositioning, or building on what you already
                have — let’s choose the work that makes sense for your next
                stage.
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
                    "You want to build a stronger channel presence.",
                    "You want strategy, promotion, or management matched to your goals.",
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
        <section id="process" className="section engagement-section">
          <div className="container engagement-layout">
            <Reveal className="engagement-intro">
              <Eyebrow>WHAT WORKING TOGETHER LOOKS LIKE</Eyebrow>
              <h2>
                A growth direction.
                <br />
                <span className="muted">A plan put into action.</span>
              </h2>
              <p>
                Channel growth needs both a direction and the work to carry it
                forward. Here’s how I connect your goals to the agreed research,
                build, campaign, or management tasks — with clear review points
                along the way.
              </p>
              <div className="engagement-principles">
                <h3>Growth work, clearly scoped</h3>
                <ul>
                  <li>
                    <Check size={16} />
                    An agreed scope and responsibilities
                  </li>
                  <li>
                    <Check size={16} />A realistic schedule and feedback plan
                  </li>
                  <li>
                    <Check size={16} />
                    Direct communication with me
                  </li>
                </ul>
              </div>
              <a className="button secondary" href="#contact">
                Discuss your channel growth <ArrowUpRight size={17} />
              </a>
            </Reveal>
            <ol className="engagement-steps">
              {process.map(([title, text, output], i) => (
                <li className="engagement-step" key={title}>
                  <span className="engagement-number">0{i + 1}</span>
                  <div>
                    <h3>{title}</h3>
                    <p>{text}</p>
                    <div className="engagement-output">
                      <span>WHAT YOU LEAVE WITH</span>
                      <strong>{output}</strong>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
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
              <InquiryStarter />
            </Reveal>
            <div className="faq-list">
              {faqs.map(([q, a]) => (
                <details key={q}>
                  <summary>
                    {q}
                    <Plus className="faq-plus" size={17} />
                    <Minus className="faq-minus" size={17} />
                  </summary>
                  <div className="faq-answer">
                    {(Array.isArray(a) ? a : [a]).map((paragraph, i) => (
                      <p key={i}>{paragraph}</p>
                    ))}
                  </div>
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
            <span className="footer-specialty">
              TWITCH CHANNEL GROWTH EXPERT
            </span>
            <p>
              Channel growth strategy and hands-on services.
              <br />
              From planning to promotion and ongoing management.
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
