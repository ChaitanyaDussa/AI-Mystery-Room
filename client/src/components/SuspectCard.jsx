import { UserRound, ChevronRight } from 'lucide-react';
export default function SuspectCard({ suspect, onSelect, selected = false }) {
  return <button className={`suspect-card ${selected ? 'selected' : ''}`} onClick={onSelect}><span className="suspect-avatar"><UserRound size={19}/></span><span className="suspect-copy"><strong>{suspect.name}</strong><small>{suspect.role}</small></span><ChevronRight size={16}/></button>;
}
