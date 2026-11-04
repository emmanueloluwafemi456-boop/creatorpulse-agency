import React, { useState } from "react";
import { Pause, Play } from "lucide-react";
import { channelServices } from "./data";
export default function ServicesTicker() {
  const [paused, setPaused] = useState(false);
  return (
    <div
      className={`services-ticker ${paused ? "ticker-paused" : ""}`}
      aria-label="Twitch services"
    >
      <div className="ticker-viewport">
        <div className="ticker-track">
          {[0, 1].map((copy) => (
            <div
              className="ticker-group"
              role="list"
              aria-hidden={copy === 1 ? true : undefined}
              key={copy}
            >
              {channelServices.map((service) => (
                <span
                  role="listitem"
                  className="ticker-service"
                  key={service.id}
                >
                  {service.title}
                  <i aria-hidden="true" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
      <button
        type="button"
        className="ticker-toggle"
        onClick={() => setPaused(!paused)}
        aria-label={
          paused ? "Resume service scrolling" : "Pause service scrolling"
        }
        aria-pressed={paused}
      >
        {paused ? <Play size={15} /> : <Pause size={15} />}
      </button>
    </div>
  );
}
