import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
export default function NotFoundPage(){return <><Navbar/><main className="not-found"><span className="eyebrow">404 · CLOSED FILE</span><h1>This page is off the record.</h1><p>The case file you’re looking for isn’t here.</p><Link to="/" className="button button-primary">Return to the desk</Link></main></>}
