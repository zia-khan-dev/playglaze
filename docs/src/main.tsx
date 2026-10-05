import { createRoot } from 'react-dom/client';
import App from './App';
import { FigmaExport } from './FigmaSheet';

// ?figma=1&skin=NAME renders the Figma export sheet instead of the docs.
const q = new URLSearchParams(location.search);
createRoot(document.getElementById('root')!).render(q.get('figma') ? <FigmaExport skin={q.get('skin') ?? 'glossy'} /> : <App />);
