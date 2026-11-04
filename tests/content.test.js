import test from "node:test";
import assert from "node:assert/strict";
import { channelServices, process, faqs } from "../src/data.js";
import { siteConfig } from "../src/config.js";
test("six ordered services contain useful scope, deliverables and realistic boundaries", () => {
  assert.deepEqual(
    channelServices.map((s) => s.title),
    [
      "Channel Audit",
      "Survey",
      "Creator Landing Page",
      "Creator Club Application",
      "Channel Management",
      "Google Ads",
    ],
  );
  for (const s of channelServices) {
    assert.equal(s.deliverables.length, 3);
    assert.ok(s.description.length > 100);
    assert.ok(s.boundary.length > 50);
    assert.ok(s.input.length > 30);
  }
});
test("eligibility and paid promotion are not represented as guaranteed monetization", () => {
  assert.match(
    channelServices.find((s) => s.id === "club").description,
    /Twitch’s official Creator Clubs/,
  );
  assert.match(
    channelServices.find((s) => s.id === "club").boundary,
    /cannot guarantee acceptance/,
  );
  assert.match(
    channelServices.find((s) => s.id === "ads").boundary,
    /spend is separate/,
  );
  assert.match(
    channelServices.find((s) => s.id === "ads").boundary,
    /No viewers, Affiliate status, or income is guaranteed/,
  );
  assert.equal(process.length, 4);
  assert.equal(faqs.length, 6);
});
test("contact remains unconfigured until the owner adds details", () => {
  assert.equal(siteConfig.email, null);
  assert.ok(Object.values(siteConfig.socials).every((s) => s === null));
});
