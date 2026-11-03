import test from "node:test";
import assert from "node:assert/strict";
import { services, projects, process, faqs } from "../src/data.js";
import { siteConfig } from "../src/config.js";
test("each service has useful scope and a distinct inquiry option", () => {
  assert.equal(services.length, 8);
  assert.equal(new Set(services.map((s) => s[1])).size, 8);
  for (const service of services) {
    assert.equal(service[3].length, 3);
    assert.ok(service[4].length > 100);
  }
});
test("every concept includes the reasoning and deliverables a client needs to assess it", () => {
  assert.equal(projects.length, 6);
  assert.equal(new Set(projects.map((p) => p.category)).size, 4);
  for (const p of projects) {
    assert.ok(p.approach.length > 80);
    assert.ok(p.description.length > 80);
    assert.equal(p.deliverables.length, 3);
  }
});
test("personal project workflow and direct public contact are configured", () => {
  assert.equal(process.length, 4);
  assert.equal(faqs.length, 6);
  assert.equal(siteConfig.name, "Emmanuel");
  assert.match(siteConfig.email, /^[^@]+@[^@]+\.[^@]+$/);
});
