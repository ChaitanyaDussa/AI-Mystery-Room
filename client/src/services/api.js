const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

export async function request(path, options = {}) {
  let response;
  try {
    response = await fetch(`${API}${path}`, { ...options, credentials: 'include', headers: { 'Content-Type': 'application/json', ...options.headers } });
  } catch { throw new Error('Cannot reach the case server. Check that the backend is running.'); }
  const payload = await response.json().catch(() => ({}));
  if (!response.ok || !payload.success) throw new Error(payload.error?.message || 'Something went wrong. Please try again.');
  return payload.data;
}
export const createMystery = data => request('/mysteries', { method: 'POST', body: JSON.stringify(data) });
export const getMystery = caseId => request(`/mysteries/${caseId}`);
export const getEvidence = caseId => request(`/mysteries/${caseId}/evidence?limit=50`);
export const startInvestigation = caseId => request(`/mysteries/${caseId}/investigations`, { method: 'POST' });
export const viewEvidence = (investigationId, evidenceId) => request(`/investigations/${investigationId}/evidence/${evidenceId}/view`, { method: 'POST' });
export const accuse = (investigationId, suspectId) => request(`/investigations/${investigationId}/accusation`, { method: 'POST', body: JSON.stringify({ suspectId }) });
export const getResults = investigationId => request(`/investigations/${investigationId}/results`);
