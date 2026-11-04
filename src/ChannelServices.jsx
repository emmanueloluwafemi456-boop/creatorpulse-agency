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
export function ServicePreview({ service }) {
  const label =
    service.id === "audit"
      ? "Example channel-audit deliverable"
      : service.id === "survey"
        ? "Example audience-survey questions"
        : service.id === "landing"
          ? "Example creator landing-page structure"
          : service.id === "club"
            ? "Example application preparation checklist"
            : service.id === "management"
              ? "Example channel management calendar"
              : "Example Google Ads planning brief";
  return (
    <div
      className={`service-preview preview-${service.id}`}
      role="img"
      aria-label={label}
    >
      <div className="deliverable-sheet">
        <div className="preview-document-top">
          <span>
            {service.id === "ads"
              ? "CAMPAIGN PLANNING"
              : service.id === "landing"
                ? "CREATOR PAGE STRUCTURE"
                : service.id === "management"
                  ? "CHANNEL WORKFLOW"
                  : "CREATOR SUPPORT"}
          </span>
          <span>EMMANUEL</span>
        </div>
        {service.id === "audit" && (
          <>
            <div className="preview-doc-title">
              <ScanLine size={20} />
              <strong>Channel review.</strong>
            </div>
            <span className="preview-doc-caption">
              A clearer picture. Practical priorities.
            </span>
            <div className="audit-rows">
              <div>
                <span>Profile & channel story</span>
                <b>Clarify</b>
              </div>
              <div>
                <span>Content & discoverability</span>
                <b>Review</b>
              </div>
              <div>
                <span>Schedule & next steps</span>
                <b>Prioritize</b>
              </div>
            </div>
            <div className="preview-note">
              <Check size={11} /> A prioritized action list
            </div>
          </>
        )}
        {service.id === "survey" && (
          <>
            <div className="preview-doc-title">
              <ClipboardList size={20} />
              <strong>Listen first.</strong>
            </div>
            <span className="preview-doc-caption">
              What brings you back to a stream?
            </span>
            <div className="survey-choices">
              {[
                "The content",
                "The conversation",
                "Learning something new",
              ].map((x) => (
                <span key={x}>
                  <i />
                  {x}
                </span>
              ))}
            </div>
            <div className="preview-note">
              Questions built around your decisions.
            </div>
          </>
        )}
        {service.id === "landing" && (
          <>
            <div className="landing-demo-top">
              <span>YOUR CHANNEL</span>
              <span>ABOUT · SCHEDULE · CONTACT</span>
            </div>
            <div className="landing-demo-hero">
              <span>YOUR CONTENT. ONE CLEAR DESTINATION.</span>
              <strong>
                A place to find
                <br />
                your next stream.
              </strong>
              <span className="landing-demo-cta">
                Stream schedule <ArrowRight size={9} />
              </span>
            </div>
            <div className="landing-demo-panels">
              <span>MEET THE CREATOR</span>
              <span>JOIN THE COMMUNITY</span>
            </div>
          </>
        )}
        {service.id === "club" && (
          <>
            <div className="preview-doc-title">
              <FileCheck2 size={20} />
              <strong>Ready to apply?</strong>
            </div>
            <span className="preview-doc-caption">
              Preparation before submission.
            </span>
            <div className="application-rows">
              {[
                "Check current program guidance",
                "Organize channel & work links",
                "Draft your creator statement",
                "Review the application materials",
              ].map((x) => (
                <span key={x}>
                  <Check size={10} />
                  {x}
                </span>
              ))}
            </div>
            <div className="preview-note">
              Eligibility and acceptance are program decisions.
            </div>
          </>
        )}
        {service.id === "management" && (
          <>
            <div className="preview-doc-title">
              <CalendarDays size={20} />
              <strong>A clearer week.</strong>
            </div>
            <span className="preview-doc-caption">
              An example of an agreed workflow.
            </span>
            <div className="management-week">
              {[
                ["MON", "Plan content"],
                ["TUE", "Stream prep"],
                ["WED", "Community"],
                ["THU", "Clip review"],
                ["FRI", "Next steps"],
              ].map(([day, task]) => (
                <div key={day}>
                  <span>{day}</span>
                  <i />
                  <strong>{task}</strong>
                </div>
              ))}
            </div>
            <div className="preview-note">
              <Check size={11} /> Clear tasks. Agreed responsibilities.
            </div>
          </>
        )}
        {service.id === "ads" && (
          <>
            <div className="preview-doc-title">
              <MousePointer2 size={20} />
              <strong>Google Ads.</strong>
            </div>
            <span className="preview-doc-caption">
              A focused test, with an agreed objective.
            </span>
            <div className="ad-plan">
              <div>
                <span>OBJECTIVE</span>
                <strong>Relevant visits</strong>
              </div>
              <div>
                <span>DESTINATION</span>
                <strong>Approved content or page</strong>
              </div>
              <div>
                <span>BUDGET</span>
                <strong>Agreed before launch</strong>
              </div>
            </div>
            <div className="preview-note">
              Media spend is separate. Results vary.
            </div>
          </>
        )}
      </div>
      <span className="deliverable-disclosure">
        EXAMPLE DELIVERABLE · NOT LIVE ACCOUNT DATA
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
            <div className="eyebrow">YOUR CHANNEL. THE RIGHT NEXT STEP.</div>
            <h2>
              Start where you are.
              <br />
              <span className="muted">Build toward what’s next.</span>
            </h2>
          </div>
          <p>
            Six ways I can support your channel, from understanding its current
            stage to building a more consistent presence and considering
            relevant promotion.
          </p>
        </div>
        <div className="channel-start-note">
          <ScanLine size={18} />
          <p>
            <strong>
              Not sure where to begin? Start with a Channel Audit.
            </strong>{" "}
            Then we can choose the work that fits your audience, goals, and
            resources. You don’t need every service.
          </p>
        </div>
        <div className="channel-services-grid">
          {channelServices.map((service, index) => {
            const Icon = icons[service.icon];
            return (
              <article className="channel-service-card" key={service.id}>
                <button
                  className="channel-service-open"
                  onClick={() => onSelect(service)}
                  aria-label={`Explore ${service.title}`}
                >
                  <ServicePreview service={service} />
                  <div className="channel-card-copy">
                    <div className="channel-card-step">
                      <span>
                        0{index + 1} / {service.step}
                      </span>
                      <Icon size={16} />
                    </div>
                    <h3>{service.title}</h3>
                    <p>{service.summary}</p>
                    <span className="channel-card-action">
                      See scope & deliverables <ArrowUpRight size={16} />
                    </span>
                  </div>
                </button>
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
            <strong>Working toward monetization?</strong> I can help with
            relevant preparation and agreed channel work. Program approval and
            earnings depend on factors beyond these services and cannot be
            guaranteed.
          </p>
        </div>
        <div className="channel-section-cta">
          <div>
            <h3>Let’s choose a useful starting point.</h3>
            <p>
              Tell me your channel, your current stage, and the goal you’re
              working toward.
            </p>
          </div>
          <a className="button primary" href="#contact">
            Discuss my channel <ArrowUpRight size={16} />
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
      <h3>How it supports your next stage</h3>
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
