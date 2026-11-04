import React, { useState } from "react";
import {
  ArrowUpRight,
  MessageCircle,
  CheckCircle2,
  LoaderCircle,
  AlertCircle,
  Send,
} from "lucide-react";
import { channelServices } from "./data";
import { siteConfig, gmailComposeUrl } from "./config";
export function WhatsAppLogo() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      aria-hidden="true"
      className="platform-logo"
    >
      <path
        fill="currentColor"
        d="M20.5 3.5A11.8 11.8 0 0 0 12.1 0C5.5 0 .1 5.4.1 12c0 2.1.6 4.2 1.6 6L0 24l6.2-1.6A12 12 0 0 0 12.1 24C18.7 24 24 18.6 24 12a11.9 11.9 0 0 0-3.5-8.5ZM12.1 22a10 10 0 0 1-5.1-1.4l-.4-.2-3.7 1 1-3.6-.3-.4A10 10 0 1 1 12.1 22Zm5.5-7.5c-.3-.2-1.8-.9-2-.9-.3-.1-.5-.2-.7.2l-.9 1.1c-.2.2-.4.2-.7.1a8.2 8.2 0 0 1-2.4-1.5 9 9 0 0 1-1.6-2c-.2-.3 0-.5.1-.6l.5-.6.3-.5c.1-.2 0-.4 0-.6l-1-2.2c-.2-.5-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.2.3-1 1-1 2.4s1 2.7 1.2 2.9c.1.2 2 3.1 4.9 4.4l1.6.6c.7.2 1.3.2 1.8.1.6-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4-.1-.2-.3-.2-.6-.4Z"
      />
    </svg>
  );
}
export function GmailLogo() {
  return (
    <svg
      viewBox="0 0 24 18"
      width="25"
      height="24"
      aria-hidden="true"
      className="platform-logo"
    >
      <path fill="#4285F4" d="M1.6 18h3.8V7.2L0 3v13.4C0 17.3.7 18 1.6 18Z" />
      <path
        fill="#34A853"
        d="M18.6 18h3.8c.9 0 1.6-.7 1.6-1.6V3l-5.4 4.2V18Z"
      />
      <path fill="#FBBC04" d="M18.6 7.2V1.1L24 3v.8l-5.4 3.4Z" />
      <path fill="#EA4335" d="M5.4 7.2 12 12.1l6.6-4.9V1.1L12 6 5.4 1.1v6.1Z" />
      <path fill="#C5221F" d="M0 3C0 .6 2.7-.8 4.6.7l.8.4v6.1L0 3Z" />
      <path fill="#FBBC04" d="M24 3C24 .6 21.3-.8 19.4.7l-.8.4v6.1L24 3Z" />
    </svg>
  );
}
export function ContactOptions({ compact = false, location = "contact" }) {
  return (
    <div
      className={`contact-options ${compact ? "contact-options-compact" : ""}`}
      aria-label="Choose how to contact Emmanuel"
    >
      <a
        className="platform-contact whatsapp-contact"
        href={siteConfig.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Contact Emmanuel on WhatsApp${location === "faq" ? " — ask me directly" : ""}`}
      >
        <span className="platform-mark">
          <WhatsAppLogo />
        </span>
        <span>
          <strong>WhatsApp</strong>
          {!compact && <small>Start a conversation</small>}
        </span>
        <ArrowUpRight size={16} />
      </a>
      <a
        className="platform-contact gmail-contact"
        href={gmailComposeUrl()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Contact Emmanuel on Gmail${location === "faq" ? " — ask me directly" : ""}`}
      >
        <span className="platform-mark">
          <GmailLogo />
        </span>
        <span>
          <strong>Gmail</strong>
          {!compact && <small>{siteConfig.email}</small>}
        </span>
        <ArrowUpRight size={16} />
      </a>
    </div>
  );
}
export default function Contact({ interest, setInterest }) {
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  async function submit(event) {
    event.preventDefault();
    if (status === "sending" || status === "success") return;
    const form = event.currentTarget;
    const f = Object.fromEntries(new FormData(form));
    const values = {
      name: f.name.trim(),
      email: f.email.trim(),
      channel: f.channel.trim(),
      service: f.service,
      message: f.message.trim(),
    };
    const issues = {};
    if (values.name.length < 2)
      issues.name = "Please enter your name (at least 2 characters).";
    if (values.message.length < 10)
      issues.message =
        "Please describe your project in at least 10 characters.";
    try {
      const url = new URL(values.channel);
      if (
        !["twitch.tv", "www.twitch.tv"].includes(url.hostname.toLowerCase()) ||
        !/^\/[a-zA-Z0-9_]+\/?$/.test(url.pathname) ||
        !["https:", "http:"].includes(url.protocol)
      )
        issues.channel =
          "Please enter your Twitch channel URL, for example https://twitch.tv/yourchannel.";
    } catch {
      issues.channel = "Please enter a valid Twitch channel URL.";
    }
    if (Object.keys(issues).length) {
      const field = Object.keys(issues)[0];
      form.elements.namedItem(field).setCustomValidity(issues[field]);
      form.reportValidity();
      return;
    }
    if (f.website) {
      setStatus("error");
      setError(
        "Your submission could not be confirmed. Please contact me using WhatsApp or Gmail.",
      );
      return;
    }
    setStatus("sending");
    setError("");
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 20000);
    try {
      const response = await fetch(siteConfig.formEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        signal: controller.signal,
        body: JSON.stringify({
          Name: values.name,
          Email: values.email,
          "Twitch channel": values.channel,
          "Service of interest": values.service,
          "Project description": values.message,
          _replyto: values.email,
          _subject: `Website project brief — ${values.service}`,
          _template: "table",
          _url: window.location.href,
        }),
      });
      const data = await response.json();
      if (
        /activat|confirm (your|the) email/i.test(String(data.message || ""))
      ) {
        setStatus("error");
        setError(
          "Email delivery is awaiting activation. Please use WhatsApp or Gmail to send your brief for now.",
        );
        return;
      }
      if (!response.ok || ![true, "true"].includes(data.success))
        throw new Error("Submission not accepted");
      setStatus("success");
    } catch {
      setStatus("error");
      setError(
        "Your submission could not be confirmed. Your details are still here. Please try again, or contact me using WhatsApp or Gmail.",
      );
    } finally {
      clearTimeout(timer);
    }
  }
  function edited(event) {
    event.target.setCustomValidity?.("");
    if (status === "success" || status === "error") {
      setStatus("idle");
      setError("");
    }
  }
  return (
    <div className="contact-grid">
      <div>
        <div className="eyebrow">LET’S TALK ABOUT YOUR CHANNEL</div>
        <h2>
          Have a stream.
          <br />
          Have a vision.
          <br />
          <span className="gradient-text">Let’s connect.</span>
        </h2>
        <p>
          Tell me where your channel is now and what you want help with. Choose
          the conversation that works best for you.
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
            <span>Emmanuel · Twitch channel support</span>
          </div>
          <MessageCircle size={20} />
        </div>
        <div className="contact-choice-heading">CONTACT ME DIRECTLY</div>
        <ContactOptions />
        <p className="contact-choice-note">
          WhatsApp opens a chat. Gmail opens a message addressed to me. You
          review and send it.
        </p>
      </div>
      <form
        id="project-brief"
        className="contact-form connected-contact-form"
        onSubmit={submit}
        onChange={edited}
      >
        <div className="form-introduction">
          <span>PROJECT INQUIRY</span>
          <h3>Tell me what you have in mind.</h3>
          <p>Every field is required so I have the details to help.</p>
        </div>
        <fieldset disabled={status === "sending"}>
          <legend className="sr-only">
            Your project brief — all fields required
          </legend>
          <div className="form-grid">
            <label>
              Your name <span className="required-mark">*</span>
              <input
                name="name"
                autoComplete="name"
                required
                minLength={2}
                maxLength={100}
                placeholder="Your name"
                onInput={edited}
              />
            </label>
            <label>
              Email address <span className="required-mark">*</span>
              <input
                name="email"
                type="email"
                autoComplete="email"
                required
                maxLength={254}
                placeholder="you@example.com"
                onInput={edited}
              />
            </label>
            <label className="wide">
              Twitch channel <span className="required-mark">*</span>
              <input
                name="channel"
                type="url"
                required
                placeholder="https://twitch.tv/yourchannel"
                maxLength={200}
                onInput={edited}
              />
            </label>
            <label className="wide">
              What can I help you with? <span className="required-mark">*</span>
              <select
                name="service"
                value={interest}
                onChange={(e) => {
                  setInterest(e.target.value);
                  edited(e);
                }}
                required
              >
                <option disabled value="">
                  Choose a service
                </option>
                {channelServices.map((s) => (
                  <option key={s.id}>{s.title}</option>
                ))}
                <option>Let’s figure it out together</option>
              </select>
            </label>
            <label className="wide">
              A little about your project{" "}
              <span className="required-mark">*</span>
              <textarea
                name="message"
                required
                minLength={10}
                maxLength={5000}
                rows={4}
                placeholder="Your goals, what feels stuck, and the help you’re looking for…"
                onInput={edited}
              />
            </label>
          </div>
          <label className="contact-honeypot" aria-hidden="true">
            Leave this empty
            <input name="website" tabIndex={-1} autoComplete="off" />
          </label>
        </fieldset>
        <button
          className="button primary full"
          type="submit"
          disabled={status === "sending" || status === "success"}
        >
          {status === "sending" ? (
            <>
              <LoaderCircle size={16} className="sending-spinner" />
              Submitting your brief…
            </>
          ) : status === "success" ? (
            <>
              <CheckCircle2 size={16} />
              Brief submitted
            </>
          ) : (
            <>
              Send my project brief
              <Send size={16} />
            </>
          )}
        </button>
        <p className="form-data-note">
          Your brief is shared with Emmanuel by email through FormSubmit. Please
          leave out passwords, payment details, or other sensitive information.
        </p>
        {status === "success" && (
          <div className="form-feedback success-feedback" role="status">
            <CheckCircle2 size={19} />
            <div>
              <strong>Your brief was submitted.</strong>
              <p>
                You’ve provided your details for Emmanuel to reply. You can also
                start a conversation using WhatsApp or Gmail.
              </p>
            </div>
          </div>
        )}
        {status === "error" && (
          <div className="form-feedback error-feedback" role="alert">
            <AlertCircle size={19} />
            <p>{error}</p>
          </div>
        )}
      </form>
    </div>
  );
}
