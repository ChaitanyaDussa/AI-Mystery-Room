import test from 'node:test';
import assert from 'node:assert/strict';
import { scoreAccusation } from './scoring.service.js';

test('awards 100 points for the canonical culprit', () => assert.deepEqual(scoreAccusation('s1', 's1'), { isCorrect: true, score: 100 }));
test('awards zero points for a different suspect', () => assert.deepEqual(scoreAccusation('s2', 's1'), { isCorrect: false, score: 0 }));
