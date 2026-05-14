import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Landing } from './ui/pages/Landing';
import { Loading } from './ui/pages/Loading';
import { Dashboard } from './ui/pages/Dashboard';
import { HowToExport } from './ui/pages/HowToExport';
import { Privacy } from './ui/pages/Privacy';

export function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/loading" element={<Loading />} />
        <Route path="/stats" element={<Dashboard />} />
        <Route path="/how-to-export" element={<HowToExport />} />
        <Route path="/privacy" element={<Privacy />} />
      </Routes>
    </BrowserRouter>
  );
}
