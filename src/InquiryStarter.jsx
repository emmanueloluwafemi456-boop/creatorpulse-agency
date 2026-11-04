import React, { useState } from "react";
import { Copy, Check, Link, Target, Clock3 } from "lucide-react";
export const inquiryTemplate = `Hi Emmanuel, I’d like to discuss growth services for my Twitch channel.\n\nMy Twitch channel link: \nWhat I stream: \nWhat I’d like to improve: \nMy main goal: \nAny timing or budget to consider: `;
export default function InquiryStarter() {
  const [state, setState] = useState("idle");
  async function copy() {
    try {
      await navigator.clipboard.writeText(inquiryTemplate);
      setState("copied");
    } catch {
      setState("manual");
    }
  }
  return (
    <aside className="inquiry-starter" aria-labelledby="inquiry-starter-title">
      <span className="inquiry-starter-kicker">
        MAKE THE FIRST MESSAGE EASY
      </span>
      <h3 id="inquiry-starter-title">Not sure what to send?</h3>
      <p>
        Share your channel, your growth goal, and the work you want to move
        forward. A few details help us start a useful conversation.
      </p>
      <ul>
        {[
          [Link, "Your Twitch channel link"],
          [Target, "The change you want to make"],
          [Clock3, "Any timing or budget to consider"],
        ].map(([Icon, text]) => (
          <li key={text}>
            <Icon size={17} />
            <span>{text}</span>
          </li>
        ))}
      </ul>
      <button type="button" className="inquiry-copy" onClick={copy}>
        {state === "copied" ? <Check size={17} /> : <Copy size={17} />}{" "}
        {state === "copied"
          ? "Message template copied"
          : "Copy a message template"}
      </button>
      <span className="inquiry-copy-feedback" role="status">
        {state === "copied"
          ? "Paste it into WhatsApp, Gmail, or your project brief."
          : state === "manual"
            ? "Copy the template below to use it in your message."
            : "Edit the template to make it yours before sending."}
      </span>
      {state === "manual" && (
        <textarea
          aria-label="Message template to copy"
          rows={8}
          readOnly
          value={inquiryTemplate}
        />
      )}
    </aside>
  );
}
