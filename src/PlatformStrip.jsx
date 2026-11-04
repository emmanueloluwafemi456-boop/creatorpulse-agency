import React from "react";
const platforms = [
  ["twitch", "Twitch", "Channel & community"],
  ["googleads", "Google Ads", "Paid promotion"],
  ["googleanalytics", "Google Analytics", "Website measurement"],
  ["youtube", "YouTube", "Video discovery"],
];
export default function PlatformStrip() {
  return (
    <section className="platform-strip" aria-labelledby="platform-strip-title">
      <div className="container">
        <div className="platform-strip-heading">
          <div>
            <span>TOOLS & PLATFORM CONTEXT</span>
            <h2 id="platform-strip-title">
              Growth across the right platforms.
            </h2>
          </div>
          <p>
            Channel presence, paid promotion, video discovery, and measurement —
            connected where the project calls for them.
          </p>
        </div>
        <ul className="platform-badges">
          {platforms.map(([slug, title, description]) => (
            <li key={slug}>
              <img
                src={`./platforms/${slug}.svg`}
                alt=""
                aria-hidden="true"
                width="30"
                height="30"
                loading="lazy"
              />
              <div>
                <strong>{title}</strong>
                <span>{description}</span>
              </div>
            </li>
          ))}
        </ul>
        <p className="platform-independence">
          Independent services. These platform marks identify relevant tools;
          they do not indicate certification, partnership, or endorsement.
        </p>
      </div>
    </section>
  );
}
