import { lazy, Suspense, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import TopBar from './components/ui/TopBar';
import useZakatStore from './store/zakatStore';

const LandingScreen = lazy(() => import('./components/wizard/LandingScreen'));
const WizardScreen = lazy(() => import('./components/wizard/WizardScreen'));
const ResultsScreen = lazy(() => import('./components/results/ResultsScreen'));
const GlossaryScreen = lazy(() => import('./components/guide/GlossaryScreen'));
const HowToCalculateScreen = lazy(() => import('./components/guide/HowToCalculateScreen'));

function LoadingFallback() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin" />
        <p className="text-gray-500 dark:text-gray-400 text-sm">Loading...</p>
      </div>
    </div>
  );
}

export default function App() {
  const darkMode = useZakatStore((s) => s.darkMode);

  // Restore dark mode from persisted state on mount
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-surface-light dark:bg-surface-dark transition-colors duration-300">
      <TopBar />
      <main className="pb-20">
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<LandingScreen />} />
            <Route path="/calculator" element={<WizardScreen />} />
            <Route path="/results" element={<ResultsScreen />} />
            <Route path="/glossary" element={<GlossaryScreen />} />
            <Route path="/how-to-calculate" element={<HowToCalculateScreen />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
}
