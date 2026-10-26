import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import LandingPage from './pages/LandingPage.jsx';
import CreateMysteryPage from './pages/CreateMysteryPage.jsx';
import CaseOverviewPage from './pages/CaseOverviewPage.jsx';
import InvestigationPage from './pages/InvestigationPage.jsx';
import ResultsPage from './pages/ResultsPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
export default function App(){return <div className="app-shell"><Routes><Route path="/" element={<><Navbar/><LandingPage/></>}/><Route path="/create" element={<><Navbar/><CreateMysteryPage/></>}/><Route path="/case/:caseId" element={<CaseOverviewPage/>}/><Route path="/case/:caseId/investigate" element={<InvestigationPage/>}/><Route path="/case/:caseId/results" element={<ResultsPage/>}/><Route path="*" element={<NotFoundPage/>}/></Routes></div>}
