import { Clock3 } from 'lucide-react';
export default function Timeline({ items = [] }) {
  return <div className="timeline">{items.map(event => <div className="timeline-row" key={event.id}><span className="timeline-marker"><Clock3 size={13}/></span><div><time>{new Date(event.timestamp).toLocaleString([], { dateStyle:'medium', timeStyle:'short' })}</time><p>{event.description}</p></div></div>)}</div>;
}
