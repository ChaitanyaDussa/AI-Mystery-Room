import { ArrowUpRight, Camera, FileText, MessageSquare, ScanLine, UserRound, Video } from 'lucide-react';
const icons = { message: MessageSquare, image: Camera, cctv: Video, witness_statement: UserRound, interview: MessageSquare, physical_clue: ScanLine, document: FileText };
const labels = { message:'Messages', image:'Photograph', cctv:'Surveillance', witness_statement:'Witness statement', interview:'Interview', physical_clue:'Physical clue', document:'Document' };
export default function EvidenceCard({ item, onClick, active }) {
  const Icon = icons[item.type] || FileText;
  return <button className={`evidence-card ${active ? 'selected' : ''}`} onClick={onClick}><span className="ev-icon"><Icon size={17}/></span><span className="ev-copy"><small>{labels[item.type] || item.type}</small><strong>{item.title}</strong><span>{item.description}</span></span><ArrowUpRight className="ev-arrow" size={15}/></button>;
}
