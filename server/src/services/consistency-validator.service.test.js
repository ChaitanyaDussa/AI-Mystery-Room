import test from 'node:test';
import assert from 'node:assert/strict';
import { validateGeneratedCase } from './consistency-validator.service.js';

const input = { scenario: 'A prototype vanishes before a college festival presentation.', genre: 'theft', difficulty: 'easy', caseLength: 'short' };
function fixture() {
  const suspects = ['s1','s2','s3'].map((id, i) => ({ id, name: `Person ${i}`, role: 'Guest', biography: 'A short biography.', motive: 'A possible motive.', statement: 'A statement.', alibi: 'An alibi.' }));
  const evidence = Array.from({ length: 6 }, (_, i) => ({ id:`e${i}`, type:'document', title:`Record ${i}`, description:'A case record.', content:{ text:'Fictional record.' }, suspectIds:['s1'], timelineEventIds:['t1'], visibility:'public', media:[] }));
  return { title:'The Vanishing Prototype', genre:'theft', difficulty:'easy', synopsis:'A prototype disappears before the final showcase.', objectives:['Find who took it.'], suspects, witnesses:[], timeline:[{ id:'t1',timestamp:'2026-10-20T12:00:00Z',description:'The prototype is seen.',suspectIds:['s1'],evidenceIds:['e0'] },{ id:'t2',timestamp:'2026-10-20T12:10:00Z',description:'The room is checked.',suspectIds:[],evidenceIds:['e1'] },{ id:'t3',timestamp:'2026-10-20T12:20:00Z',description:'The case is reported.',suspectIds:[],evidenceIds:['e2'] }], evidence, solution:{ culpritId:'s1',motive:'A detailed motive.',method:'A detailed method.',deductionSteps:['Compare the statements.','Verify the record.'],keyEvidenceIds:['e0'],fullExplanation:'The timeline and physical record establish what happened.' } };
}
test('accepts a complete case whose IDs and references agree', () => {
  const result = validateGeneratedCase(fixture(), input);
  assert.equal(result.solution.culpritId, 's1');
  assert.equal(result.genre, 'theft');
});
test('rejects a solution that points to no suspect', () => {
  const data = fixture(); data.solution.culpritId = 'missing';
  assert.throws(() => validateGeneratedCase(data, input), { code: 'INVALID_AI_OUTPUT' });
});
test('rejects a non-chronological timeline', () => {
  const data = fixture(); data.timeline[2].timestamp = '2026-10-20T11:00:00Z';
  assert.throws(() => validateGeneratedCase(data, input), { code: 'INVALID_AI_OUTPUT' });
});
test('rejects evidence with unknown suspect references', () => {
  const data = fixture(); data.evidence[0].suspectIds = ['missing'];
  assert.throws(() => validateGeneratedCase(data, input), { code: 'INVALID_AI_OUTPUT' });
});
