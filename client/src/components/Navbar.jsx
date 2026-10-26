import { Link } from 'react-router-dom';
import { Fingerprint } from 'lucide-react';
export default function Navbar() {
  return <header className="nav"><Link to="/" className="brand"><span className="brand-mark"><Fingerprint size={19}/></span><span>CASEFILE<span className="brand-dot">.</span></span></Link><nav><Link to="/create" className="nav-create">Open a case <span>↗</span></Link></nav></header>;
}
