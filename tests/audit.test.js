import test from 'node:test';
import assert from 'node:assert/strict';
import {getRecommendations} from '../src/audit.js';
import {projects,services,stages} from '../src/data.js';
const baseline={branding:'Yes',frequency:'3–4 times a week',challenge:'Discoverability',category:'Art',goal:'A stronger identity'};
test('discovery advice uses the supplied category and goal',()=>{const r=getRecommendations(baseline);assert.equal(r.length,2);assert.match(r[0].text,/Art/);assert.match(r[1].title,/a stronger identity/)});
test('new creators receive branding and consistency priorities',()=>{const r=getRecommendations({...baseline,branding:'Not yet',frequency:'Occasionally'});assert.equal(r.length,4);assert.match(r[0].title,/first impression/);assert.match(r[1].title,/rhythm/)});
for(const challenge of ['Engagement','Content direction','Branding'])test(`${challenge} produces relevant distinct advice`,()=>{const r=getRecommendations({...baseline,challenge});assert.equal(r.length,2);assert.notEqual(r[0].title,getRecommendations(baseline)[0].title)});
test('all required portfolio categories and service records are present',()=>{assert.equal(projects.length,6);assert.equal(new Set(projects.map(p=>p.category)).size,4);assert.equal(services.length,8);assert.equal(stages.length,6);assert.ok(services.every(s=>s[3].length===3&&s[4].length>30))});
