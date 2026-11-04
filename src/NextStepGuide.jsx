import React, { useState } from "react";
import { Compass, ArrowUpRight, ArrowRight } from "lucide-react";
import { channelServices } from "./data";
const priorities = [
  {
    id: "audit",
    label: "Find my starting point",
    text: "A channel review can help you identify the priorities before deciding what to work on.",
  },
  {
    id: "survey",
    label: "Understand my audience",
    text: "Explore a focused survey when you have viewers or community members who can give useful feedback.",
  },
  {
    id: "landing",
    label: "Bring my links together",
    text: "Give viewers one clear destination for your stream, schedule, community links, and creator information.",
  },
  {
    id: "club",
    label: "Creator Club preparation",
    text: "Discuss application preparation if Twitch’s current Creator Clubs guidance fits your situation.",
  },
  {
    id: "management",
    label: "Organize ongoing channel work",
    text: "Agree the recurring tasks, calendar, and responsibilities you would like help coordinating.",
  },
  {
    id: "ads",
    label: "Consider paid promotion",
    text: "Discuss whether an advertising test fits your content, destination, objective, and available budget.",
  },
];
export default function NextStepGuide({ onExplore, onInquire }) {
  const [priority, setPriority] = useState("audit");
  const selected = priorities.find((p) => p.id === priority);
  const service = channelServices.find((s) => s.id === priority);
  return (
    <aside className="next-step-guide" aria-labelledby="next-step-title">
      <div className="next-step-heading">
        <span className="next-step-symbol">
          <Compass size={21} />
        </span>
        <div>
          <span className="next-step-kicker">A USEFUL PLACE TO START</span>
          <h3 id="next-step-title">Find your next step.</h3>
        </div>
      </div>
      <label className="next-step-label" htmlFor="channel-priority">
        What would you like help with?
      </label>
      <select
        id="channel-priority"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        {priorities.map((p) => (
          <option key={p.id} value={p.id}>
            {p.label}
          </option>
        ))}
      </select>
      <div
        className="next-step-recommendation"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        <span>A SERVICE TO EXPLORE</span>
        <h4>{service.title}</h4>
        <p>{selected.text}</p>
      </div>
      <div className="next-step-actions">
        <button
          type="button"
          className="next-step-explore"
          onClick={() => onExplore(service)}
        >
          See what’s included <ArrowUpRight size={16} />
        </button>
        <a href="#project-brief" onClick={() => onInquire(service.title)}>
          Discuss this option <ArrowRight size={15} />
        </a>
      </div>
      <p className="next-step-note">
        A starting suggestion. We’ll confirm the right fit together.
      </p>
    </aside>
  );
}
