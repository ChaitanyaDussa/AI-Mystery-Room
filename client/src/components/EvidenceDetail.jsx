import { Clock3, Link2, LockKeyhole } from 'lucide-react';
import Badge from './Badge.jsx';

function Content({ item }) {
  const value = item.content;
  if (typeof value === 'string') return <p className="evidence-text">{value}</p>;
  if (Array.isArray(value)) return <div className="message-list">{value.map((entry, i) => <div className={`message ${i % 2 ? 'right' : ''}`} key={i}><small>{entry.sender || entry.name || 'Unknown'} · {entry.time || ''}</small><p>{entry.text || entry.message || JSON.stringify(entry)}</p></div>)}</div>;
  if (value && typeof value === 'object') return <div className="evidence-data">{Object.entries(value).map(([key, val]) => <div key={key}><small>{key.replaceAll('_',' ')}</small><p>{typeof val === 'string' ? val : JSON.stringify(val)}</p></div>)}</div>;
  return <p className="evidence-text">No additional record was attached. The description is the available case record.</p>;
}
export default function EvidenceDetail({ item }) {
  if (!item) return <div className="empty-detail"><LockKeyhole size={24}/><p>Select a record from the case file to examine it.</p></div>;
  return <article className="detail-panel"><div className="detail-top"><Badge>{item.type.replaceAll('_',' ')}</Badge><span className="case-stamp">FICTIONAL RECORD</span></div><h2>{item.title}</h2><p className="detail-description">{item.description}</p>{item.createdAtInStory && <div className="record-meta"><Clock3 size={14}/>{item.createdAtInStory}</div>}<div className="paper"><Content item={item}/></div>{item.suspectIds?.length > 0 && <div className="linked-info"><span><Link2 size={14}/> RELATED PERSONS</span><div className="tag-row">{item.suspectIds.map(id=><Badge key={id}>{id.replace('suspect_','Person ')}</Badge>)}</div></div>}</article>;
}
