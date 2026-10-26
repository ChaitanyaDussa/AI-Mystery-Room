export function scoreAccusation(selectedSuspectId, culpritId) {
  const isCorrect = selectedSuspectId === culpritId;
  return { isCorrect, score: isCorrect ? 100 : 0 };
}
