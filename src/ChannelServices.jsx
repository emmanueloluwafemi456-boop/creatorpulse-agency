import React from "react";
import {
  ArrowUpRight,
  ArrowRight,
  Check,
  ScanLine,
  ClipboardList,
  PanelTop,
  FileCheck2,
  CalendarDays,
  MousePointer2,
} from "lucide-react";
import { channelServices } from "./data";
const icons = {
  ScanLine,
  ClipboardList,
  PanelTop,
  FileCheck2,
  CalendarDays,
  MousePointer2,
};
const presentation = {
  audit: {
    title: "Twitch Channel Audit",
    label: "Channel analysis & audit",
    bullets: [
      "Profile & positioning review",
      "Content & discovery observations",
      "Prioritized action plan",
    ],
  },
  survey: {
    title: "Creator Survey",
    label: "Audience & creator research",
    bullets: [
      "Audience & content questions",
      "Survey distribution plan",
      "Summary of available responses",
    ],
  },
  landing: {
    title: "Creator Landing Page",
    label: "Creator presence & landing",
    bullets: [
      "Responsive creator-page design",
      "Schedule & community links",
      "Agreed sections & handover",
    ],
  },
  club: {
    title: "Creator Club Application",
    label: "Official program preparation",
    bullets: [
      "Current program guidance check",
      "Channel links & supporting work",
      "Creator statement preparation",
    ],
  },
  management: {
    title: "Twitch Channel Management",
    label: "Channel operations & consistency",
    bullets: [
      "Content calendar & channel updates",
      "Agreed task coordination",
      "Progress notes & review priorities",
    ],
  },
  ads: {
    title: "Google Ads (Channel Promotion)",
    label: "Paid promotion & discovery",
    bullets: [
      "Audience & creative planning",
      "Agreed setup or management",
      "Spend & performance reporting",
    ],
  },
};
export function ServicePreview({ service }) {
  const index = channelServices.findIndex((item) => item.id === service.id);
  return (
    <div
      className="service-scene"
      role="img"
      aria-label={`Illustrative laptop preview for ${service.title}; all displayed scores and metrics are sample data, not client results`}
    >
      <img
        src="./services/service-scenes-detailed.webp"
        alt=""
        aria-hidden="true"
        width="1882"
        height="836"
        loading="lazy"
        decoding="async"
        style={{
          left: `${-(index % 3) * 100}%`,
          transform: `translateY(-${index < 3 ? 25 : 75}%)`,
        }}
      />
      <span className="scene-sample-label">
        {service.id === "audit"
          ? "Sample audit score · not an official Twitch rating"
          : service.id === "management" || service.id === "ads"
            ? "Illustrative preview · sample metrics, not client results"
            : "Illustrative service preview"}
      </span>
    </div>
  );
}
export function ChannelServices({ onSelect }) {
  return (
    <section id="services" className="section work-section channel-services">
      <span id="work" className="anchor-alias" aria-hidden="true" />
      <div className="container">
        <div className="channel-section-heading">
          <div>
            <div className="eyebrow">TWITCH CHANNEL GROWTH SERVICES</div>
            <h2>
              Start where you are.
              <br />
              <span className="muted">Build toward what’s next.</span>
            </h2>
          </div>
          <p>
            Six services that connect strategy with delivery: audience research,
            creator presence, campaign execution, and ongoing channel
            management.
          </p>
        </div>
        <div className="channel-start-note">
          <ScanLine size={18} />
          <p>
            <strong>
              Not sure where to begin? Start with a Channel Audit.
            </strong>{" "}
            Then we can move into the research, build, promotion, or management
            your channel needs. Choose individual services or an agreed
            combination.
          </p>
        </div>
        <div className="channel-services-grid">
          {channelServices.map((service, index) => {
            const Icon = icons[service.icon];
            return (
              <article
                className="channel-service-card image-led-service"
                key={service.id}
              >
                <ServicePreview service={service} />
                <div className="channel-card-copy">
                  <div className="channel-card-step">
                    <Icon size={19} />
                    <span>
                      0{index + 1} {presentation[service.id].label}
                    </span>
                  </div>
                  <h3>{presentation[service.id].title}</h3>
                  <p>{service.summary}</p>
                  <ul className="service-card-deliverables">
                    {presentation[service.id].bullets.map((item) => (
                      <li key={item}>
                        <Check size={18} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    className="channel-service-open channel-card-action"
                    onClick={() => onSelect(service)}
                    aria-label={`Explore ${service.title}`}
                  >
                    See scope &amp; deliverables <ArrowUpRight size={18} />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
        <div className="channel-services-footnote">
          <p>
            The previews illustrate service deliverables; they are not client
            results, official platform forms, or live campaign data. Creator
            Club applications and Google Ads depend on suitability and current
            program or platform requirements.
          </p>
          <p>
            <strong>Working toward monetization?</strong> I can help with growth
            strategy, creator presence, promotion, and channel operations.
            Approval and earnings still depend on platform requirements and
            audience response; they cannot be guaranteed.
          </p>
        </div>
        <div className="channel-section-cta">
          <div>
            <h3>Let’s plan your next stage of growth.</h3>
            <p>
              Share your channel and goals. We’ll define the strategy and
              hands-on services that move the work forward.
            </p>
          </div>
          <a className="button primary" href="#contact">
            Discuss my growth goals <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
export function ChannelServiceDetails({ service, onInquire }) {
  return (
    <>
      <div className="eyebrow">{service.step}</div>
      <p>{service.description}</p>
      <h3>Who this can help</h3>
      <p>{service.forWho}</p>
      <h3>What we can agree to deliver</h3>
      <ul className="modal-deliverables">
        {service.deliverables.map((x) => (
          <li key={x}>
            <Check size={16} />
            {x}
          </li>
        ))}
      </ul>
      <h3>Where this fits in your growth plan</h3>
      <p>{service.journey}</p>
      <h3>What I’d need from you</h3>
      <p>{service.input}</p>
      <p className="scope-note">{service.boundary}</p>
      <a href="#contact" className="button primary" onClick={onInquire}>
        {service.inquiry}
        <ArrowUpRight size={16} />
      </a>
    </>
  );
}
