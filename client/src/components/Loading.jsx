export default function Loading({ label = 'Opening the case file…' }) { return <div className="loading"><span className="spinner"/><p>{label}</p></div>; }
